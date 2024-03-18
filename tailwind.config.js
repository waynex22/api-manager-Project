/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/**/*/main.hbs",
  "./node_modules/flowbite/**/*.js",
  "./node_modules/tw-elements/dist/js/**/*.js"
],
  theme: {
    extend: {colors: {
      primary: '#222222',
      secondary: '#F5E6E0',
      mint : '#82B3C2',
      mints: '#9ABFC7'
    }

    },
  },
  plugins: [require('tw-elements/dist/plugin.cjs'),
    require('flowbite/plugin')
],darkMode: "class"

}