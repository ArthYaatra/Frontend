/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004d5b',
          mid: '#006778',
        },
        secondary: {
          DEFAULT: '#476366',
          container: '#cae8eb',
        },
        tertiary: {
          DEFAULT: '#86511d',
        },
        surface: {
          DEFAULT: '#f7fafc',
          low: '#f2f4f6',
          container: '#eceef0',
          high: '#e6e8ea',
          highest: '#e0e3e5',
        },
        'on-surface': {
          DEFAULT: '#191c1e',
          variant: '#3f484b',
        },
        outline: {
          DEFAULT: '#6f797c',
          variant: '#bec8cb',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
      },
      boxShadow: {
        card:      '0 1px 3px rgba(25,28,30,.06), 0 2px 8px rgba(25,28,30,.06)',
        'card-lg': '0 4px 16px rgba(25,28,30,.10)',
        primary:   '0 8px 28px rgba(0,77,91,.30)',
        nav:       '0 1px 3px rgba(25,28,30,.05)',
      },
    },
  },
  plugins: [],
}
