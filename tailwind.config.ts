export default {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
          interMedium: ['Inter', 'sans-serif'],
          manropeBold: ['Manrope', 'sans-serif'],
          manropeSemi: ['Manrope', 'sans-serif'],
          manropeExtra: ['Manrope', 'sans-serif'],
        },
        animation: {
          shimmer: 'shimmer 2s infinite',
        },
        keyframes: {
          shimmer: {
            '100%': { transform: 'translateX(200%)' },
          },
        },
      },
    },
  }