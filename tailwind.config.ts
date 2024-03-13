import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          light: {
            violet: '#5964E0',
            lightViolet: '#939BF4',
            lightGrey: '#F4F6F8',
          },
        },
        secondary: {
          dark: {
            darkBlue: '#19202D',
            midnight: '#121721',
            gray: '#9DAEC2',
            darkGray: '#6E8098',
          },
        },
      },
      backgroundImage: {
        'desktop-header-pattern': `url('../public/assets/desktop/bg-pattern-header.svg')`,
        'mobile-header-pattern': `url('../public/assets/mobile/bg-pattern-header.svg')`,
        'tablet-header-pattern': `url('../public/assets/tablet/bg-pattern-header.svg')`,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
