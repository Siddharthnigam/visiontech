/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B192C',
        brand: '#0066FF',
        ice: '#E0F2FE',
        white: '#FFFFFF',
        offwhite: '#FAFBFC',
        danger: '#DC2626',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px',
        },
        maxWidth: '80rem',
      },
      boxShadow: {
        soft: '0 2px 10px 0 rgba(11, 25, 44, 0.08)',
        elevated: '0 16px 40px 0 rgba(11, 25, 44, 0.16)',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
