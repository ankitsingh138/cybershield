/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pattern-fade': 'pattern-fade 8s ease-in-out infinite',
        'orb-1': 'orb-1 30s linear infinite',
        'orb-2': 'orb-2 40s linear infinite',
        'orb-3': 'orb-3 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 35px rgba(0, 255, 255, 0.9)',
            transform: 'scale(1.05)'
          },
        },
        'pattern-fade': {
          '0%, 100%': { 
            opacity: '0.20'
          },
          '50%': { 
            opacity: '0.35'
          },
        },
        'orb-1': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(100px, 50px) scale(1.1)' },
          '66%': { transform: 'translate(50px, 100px) scale(0.9)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        'orb-2': {
          '0%': { transform: 'translate(100%, 0) scale(0.8)' },
          '50%': { transform: 'translate(0, 100%) scale(1.2)' },
          '100%': { transform: 'translate(100%, 0) scale(0.8)' },
        },
        'orb-3': {
          '0%': { transform: 'translate(50%, 100%) scale(1.1)' },
          '33%': { transform: 'translate(0, 0) scale(0.9)' },
          '66%': { transform: 'translate(100%, 50%) scale(1.2)' },
          '100%': { transform: 'translate(50%, 100%) scale(1.1)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.6)',
        'neon-cyan-hover': '0 0 35px rgba(0, 255, 255, 0.9)',
        'neon-magenta': '0 0 20px rgba(255, 0, 255, 0.6)',
        'neon-magenta-hover': '0 0 35px rgba(255, 0, 255, 0.9)',
        'neon-lime': '0 0 20px rgba(0, 255, 0, 0.6)',
        'neon-lime-hover': '0 0 35px rgba(0, 255, 0, 0.9)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
} 