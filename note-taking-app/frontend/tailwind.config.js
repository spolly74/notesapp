// filepath: frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'note-gray': {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
