// eslint-disable-next-line no-undef
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "dracula"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}