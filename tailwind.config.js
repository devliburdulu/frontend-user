/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        s: '320px',
        xxs: '360px',
        xs: '400px',
      },
    },
    colors: {
      liburdulu: {
        blue: '#1D9CAB',
        orange: '#F99932',
        white: '#FFFFFF',
        gray: '#EBEBEB',
        darkGray: '#818181',
        black: '#2C3A49',
        red: '#FF0000',
      },
      gray: '#EBEBEB',
      // 'color' : colors,
    },
  },
  plugins: [],
};
