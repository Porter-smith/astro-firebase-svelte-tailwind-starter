/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				// Tooltip
				"slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
				"slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
			  },
			  keyframes: {
				// Tooltip
				"slide-up-fade": {
				  "0%": { opacity: 0, transform: "translateY(6px)" },
				  "100%": { opacity: 1, transform: "translateY(0)" },
				},
				"slide-down-fade": {
				  "0%": { opacity: 0, transform: "translateY(-6px)" },
				  "100%": { opacity: 1, transform: "translateY(0)" },
				},
			},
		},
	},
}
