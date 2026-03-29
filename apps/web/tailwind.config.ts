import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Coffee theme
        espresso: {
          DEFAULT: '#4B3621',
          light: '#6F4E37',
        },
        coffee: {
          accent: '#A67B5B',
          light: '#F0E6DD',
          dark: '#8B6540',
        },
        cream: '#FDFBF7',
        beige: {
          DEFAULT: '#F5F1E8',
          dark: '#E3DAC9',
        },
        // Matcha theme
        matcha: {
          DEFAULT: '#8FA668',
          dark: '#5F7144',
          light: '#F1F5EB',
        },
        // Base colors
        'text-main': '#2C241B',
        'background-light': '#FDFBF7',
        'background-dark': '#1C1917',
        'border-subtle': '#E8E5E0',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Lora', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(44, 38, 34, 0.05)',
        card: '0 2px 8px -1px rgba(0,0,0,0.05)',
        hover: '0 10px 25px -5px rgba(44, 38, 34, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
