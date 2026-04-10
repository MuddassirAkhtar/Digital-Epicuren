/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fef3e5',
          100: '#fde7cc',
          200: '#fac899',
          300: '#f7a566',
          400: '#f08c3d',
          500: '#ea580c', // Primary
          600: '#d73f08',
          700: '#c73f06',
          800: '#a63a09',
          900: '#6e240c',
        },
      },
      spacing: {
        safe: 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      borderRadius: {
        sm: '0.25rem',
        base: '0.5rem',
        md: '0.75rem',
        lg: '0.875rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in-left': 'slideInLeft 0.3s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-in-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        // Portrait and landscape
        'portrait': { raw: '(orientation: portrait)' },
        'landscape': { raw: '(orientation: landscape)' },
        // Touch devices
        'touch': { raw: '(hover: none) and (pointer: coarse)' },
        'no-touch': { raw: '(hover: hover) and (pointer: fine)' },
      },
      minHeight: {
        'touch': '44px', // iOS minimum touch target
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    // Touch-friendly form inputs
    ({ addBase, theme }) => {
      addBase({
        '@media (hover: none) and (pointer: coarse)': {
          'input, select, textarea, button': {
            '@apply min-h-[44px]': {},
          },
        },
      })
    },
    // Safe area CSS custom properties
    ({ addUtilities }) => {
      addUtilities({
        '.safe-area-inset-top': {
          paddingTop: 'env(safe-area-inset-top, 0)',
        },
        '.safe-area-inset-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
        },
        '.safe-area-inset-left': {
          paddingLeft: 'env(safe-area-inset-left, 0)',
        },
        '.safe-area-inset-right': {
          paddingRight: 'env(safe-area-inset-right, 0)',
        },
        '.safe-area': {
          paddingTop: 'env(safe-area-inset-top, 0)',
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
          paddingLeft: 'env(safe-area-inset-left, 0)',
          paddingRight: 'env(safe-area-inset-right, 0)',
        },
      })
    },
  ],
}
