/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Natural earth tones
        earth: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#e8ddd0',
          300: '#d9c9b5',
          400: '#c8b299',
          500: '#b89b7e',
          600: '#a0855f',
          700: '#7d6548',
          800: '#5a4a36',
          900: '#3d3225',
        },
        // Forest green
        forest: {
          50: '#f0f7f0',
          100: '#e1efe1',
          200: '#c3dfc3',
          300: '#9cc99c',
          400: '#6fad6f',
          500: '#4a8f4a',
          600: '#3a723a',
          700: '#2f5a2f',
          800: '#264526',
          900: '#1e351e',
        },
        // Sage green
        sage: {
          50: '#f5f7f5',
          100: '#e8ede8',
          200: '#d1dcd1',
          300: '#afc4af',
          400: '#87a587',
          500: '#658865',
          600: '#4f6d4f',
          700: '#405640',
          800: '#344534',
          900: '#2a372a',
        },
        // Warm terracotta
        terracotta: {
          50: '#fdf6f3',
          100: '#fbeee7',
          200: '#f5d8c9',
          300: '#edbea5',
          400: '#e39e7f',
          500: '#d8825e',
          600: '#c56843',
          700: '#a55336',
          800: '#85432f',
          900: '#6d372a',
        },
        // Cream tones
        cream: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#faf5ed',
          300: '#f5ede0',
          400: '#ede1cc',
          500: '#e2d1b3',
          600: '#d0bb94',
          700: '#b39e73',
          800: '#8f7f59',
          900: '#6f6244',
        },
        // Keep primary as forest green for consistency
        primary: {
          50: '#f0f7f0',
          100: '#e1efe1',
          200: '#c3dfc3',
          300: '#9cc99c',
          400: '#6fad6f',
          500: '#4a8f4a',
          600: '#3a723a',
          700: '#2f5a2f',
          800: '#264526',
          900: '#1e351e',
        },
        // Secondary as earth tones
        secondary: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#e8ddd0',
          300: '#d9c9b5',
          400: '#c8b299',
          500: '#b89b7e',
          600: '#a0855f',
          700: '#7d6548',
          800: '#5a4a36',
          900: '#3d3225',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'natural-gradient': 'linear-gradient(135deg, #f0f7f0 0%, #faf8f5 100%)',
        'earth-gradient': 'linear-gradient(135deg, #e8ddd0 0%, #d9c9b5 100%)',
        'sage-gradient': 'linear-gradient(135deg, #f5f7f5 0%, #e8ede8 100%)',
      }
    },
  },
  plugins: [],
}