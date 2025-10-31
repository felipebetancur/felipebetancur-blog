import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				xl: '1024px'
			}
		},
		extend: {
			colors: {
				// Define aquí tus colores personalizados.
				// Estos serán los colores para el tema claro por defecto.
				'theme-bg': '#e0e7e7', // Fondo principal
				'theme-text': '#0d0d0d', // Texto principal
				'theme-primary': '#3f5957', // Color de acento (ej. enlaces)
				'theme-secondary': '#49a69c', // Color secundario (ej. subtítulos)
				'dark-bg': '#111212'
			}
		}
	},
	plugins: [typography]
};