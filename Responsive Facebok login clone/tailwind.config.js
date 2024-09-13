/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./example/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateRows: {
        'rowtheme': '100vh 25vh',
  },
  },
  plugins: [],
}

}