/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pinterest: '#E60023',
        ink: '#111111',
      },
      boxShadow: {
        drawer: '10px 0 30px rgba(0, 0, 0, .16)',
      },
    },
  },
  plugins: [],
}
