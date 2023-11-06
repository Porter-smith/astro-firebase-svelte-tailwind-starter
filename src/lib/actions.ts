import type { ActionReturn } from "svelte/action";
// https://github.com/WailAbou/shadcn-svelte-nodep/blob/72b96d937afd3b79ae04f883e71e6b42daddb5d7/src/lib/helpers/actions.ts#L5
// Popover
/**
 * `clickOutside` is an action that enhances UI interaction for popovers and modals. It monitors for clicks outside of the
 * target element and then executes a callback, typically used to close the UI element.
 * Arguments:
 * - `node`: The HTMLElement to which clickOutside is applied.
 * - `callback`: The function to call when a click outside is detected.
 * - `except`: An optional HTMLElement to ignore in the outside click detection, useful for elements like popover triggers.
 */

export function clickOutside(
  node: Node,
  [callback, except]: [VoidFunction, HTMLElement?]
): ActionReturn<[VoidFunction, HTMLElement?]> {
  const onClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!node.contains(target) && (!except || !except.contains(target))) {
      callback();
    }
  };

  document.body.addEventListener("click", onClick);

  return {
    update([newCallback, newExcept]: [VoidFunction, HTMLElement?]) {
      callback = newCallback;
      except = newExcept;
    },
    destroy() {
      document.body.removeEventListener("click", onClick);
    },
  };
}

// https://github.com/WailAbou/shadcn-svelte-nodep/blob/72b96d937afd3b79ae04f883e71e6b42daddb5d7/src/lib/helpers/actions.ts#L26
// Popover
/**
 * `keyDown` action enhances keyboard navigation within popovers/modals by listening for specific key events, such as pressing the 'ESC' key.
 * When activated, it invokes a callback, often used to close the popover, ensuring a keyboard-friendly interface, per WCAG 2.1 accessibility standards.
 * Arguments:
 * - `condition`: Boolean to enable or disable the keydown listener.
 * - `callback`: Function to execute when the specified keys are pressed.
 * - `codes`: Array of key codes to listen for, e.g., ['Escape'] for the 'ESC' key.
 * - `shiftKey`: KeyCombination to consider the state of the 'Shift' key, with possible values 'ignore', 'always', 'never'.
 */
type KeyCombination = "always" | "never" | "ignore";
export function keyDown(
  node: Node,
  [condition, callback, codes, shiftKey = "ignore"]: [
    boolean,
    VoidFunction,
    string[],
    KeyCombination?
  ]
): ActionReturn {
  const onKeyDown: EventListener = (event: Event) => {
    const e = event as KeyboardEvent;

    const shiftCondition =
      shiftKey === "ignore" ||
      (shiftKey === "never" && !e.shiftKey) ||
      (shiftKey === "always" && e.shiftKey);

    if (condition && codes.includes(e.code) && shiftCondition) {
      e.preventDefault();
      callback();
    }
  };

  node.addEventListener("keydown", onKeyDown);

  return {
    destroy() {
      node.removeEventListener("keydown", onKeyDown);
    },
  };
}
// Source: https://github.com/WailAbou/shadcn-svelte-nodep/blob/72b96d937afd3b79ae04f883e71e6b42daddb5d7/src/lib/helpers/actions.ts#L76
// Popover
/**
 * `focusTrap` is an action designed to maintain accessibility within a modal or popover by trapping keyboard focus.
 * It prevents focus from leaving the modal, allowing users to cycle through focusable elements using Tab for forward
 * and Shift+Tab for reverse navigation. This functionality is essential for users with assistive technologies, complying with WCAG guidelines.
 *
 * Arguments:
 * - `node`: The HTMLElement to which the focus trap is applied.
 * - `enabled`: Boolean that enables or disables the focus trap.
 */
export function focusTrap(node: HTMLElement, enabled: boolean = true) {
  const elemWhitelist: string[] = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden])",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"])',
  ];
  let elemFirst: HTMLElement;
  let elemLast: HTMLElement;

  function onFirstElemKeydown(e: KeyboardEvent): void {
    if (e.shiftKey && e.code === "Tab") {
      e.preventDefault();
      elemLast.focus();
    }
  }
  function onLastElemKeydown(e: KeyboardEvent): void {
    if (!e.shiftKey && e.code === "Tab") {
      e.preventDefault();
      elemFirst.focus();
    }
  }

  const onScanElements = (fromObserver: boolean) => {
    if (enabled === false) return;

    const focusableElems: HTMLElement[] = Array.from(
      node.querySelectorAll(elemWhitelist.join(", "))
    );
    if (focusableElems.length) {
      elemFirst = focusableElems[0];
      elemLast = focusableElems[focusableElems.length - 1];

      if (!fromObserver) elemFirst.focus();

      elemFirst.addEventListener("keydown", onFirstElemKeydown);
      elemLast.addEventListener("keydown", onLastElemKeydown);
    }
  };
  onScanElements(false);

  function onCleanUp(): void {
    if (elemFirst) elemFirst.removeEventListener("keydown", onFirstElemKeydown);
    if (elemLast) elemLast.removeEventListener("keydown", onLastElemKeydown);
  }

  const onObservationChange = (
    mutationRecords: MutationRecord[],
    observer: MutationObserver
  ) => {
    if (mutationRecords.length) {
      onCleanUp();
      onScanElements(true);
    }
    return observer;
  };
  const observer = new MutationObserver(onObservationChange);
  observer.observe(node, { childList: true, subtree: true });

  return {
    update(newArgs: boolean) {
      enabled = newArgs;
      newArgs ? onScanElements(false) : onCleanUp();
    },
    destroy() {
      onCleanUp();
      observer.disconnect();
    },
  };
}
