/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#131B2E',
          light: '#1E2B47',
          dark: '#0F172A',
        },
        'gold': {
          DEFAULT: '#F5B642',
          light: '#F8C86A',
          dark: '#E9A424',
        },
        'sky': {
          DEFAULT: '#4C87F0',
          light: '#6E9FF2',
          dark: '#2A6DE5',
        },
        'accent': {
          success: '#38C172',
          warning: '#F59E0B',
          danger: '#E53E3E',
          info: '#60A5FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};