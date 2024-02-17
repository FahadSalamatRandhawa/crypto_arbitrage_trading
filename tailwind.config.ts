import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
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
        "md": "800px",
        "lg":"1180px",
        "xl":"1920px"
      },
      keyframes:{
        linear_move: {
          '0%, 100%': { transform: 'translate(0%)' },
          '50%': { transform: 'translate(100%)' },
        },
        wiggle:{
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
          '100%':{ transform: 'rotate(0deg)'}
        }
      },
      animation: {
        linear_move: 'linear_move 5s ease-in-out infinite',
        wiggle: 'wiggle 1.5s ease-in-out 1',
      },
    },
  },
  plugins: [],
}
export default config
