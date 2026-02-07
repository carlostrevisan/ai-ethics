/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deductive: {
          light: '#e0f2fe',
          DEFAULT: '#0284c7',
          dark: '#075985',
        },
        inductive: {
          light: '#fce7f3',
          DEFAULT: '#db2777',
          dark: '#9f1239',
        },
        abductive: {
          light: '#f0fdf4',
          DEFAULT: '#16a34a',
          dark: '#166534',
        },
      },
    },
  },
  plugins: [],
}
