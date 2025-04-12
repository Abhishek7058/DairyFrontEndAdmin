/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        accent: '#8b5cf6',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Dark mode colors
        'dark-bg': '#121212',
        'dark-card': '#1e1e1e',
        'dark-text': '#e0e0e0',
        'dark-border': '#333333'
      },
    },
  },
  plugins: [],
};