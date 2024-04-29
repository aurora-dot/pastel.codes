module.exports = {
  mode: 'jit',
  purge: ['views/*.pug'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        extra: ['"Titling Gothic FB"'],
        sans: ['Gilroy'],
        mono: ['"Apercu Mono"'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: {
          DEFAULT: '#002234',
        },
        pink: {
          DEFAULT: '#CC7A98',
        },
        green: {
          DEFAULT: '#CDE7B0',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-hamburgers')],
};
