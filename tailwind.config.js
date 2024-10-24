
// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  darkMode: 'class', // 'class' mode for manually toggling
  colors: {
    customDark: 'rgb(12, 12, 12)',
    buttonLight : 'rgba(146, 190, 172)'
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-light': 'radial-gradient(ellipse at bottom, rgba(135, 206, 250, 0.2) 0%, rgba(255, 255, 255, 0.5) 100%)',
      },
    },
  },
  plugins: [flowbite.plugin()],
}