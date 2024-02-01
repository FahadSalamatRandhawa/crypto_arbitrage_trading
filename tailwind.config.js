/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "md": "800px",
          "lg":"1180px",
          "xl":"1920px"
        },
      },
      colors:{
        'light_transparent':"#AAD7D9",
        'sea_water':"#52D3D8",
        'dim_blue':"#3887BE",
        'darkish_blue':"#38419D",
        'lime-egg':"#E5E5E5",
        'primary':'#176B87',
        'secondary':'#86B6F6',
        'tertiary':'#B4D4FF',
        'card':'#EEF5FF'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        linear_move: 'linear_move 5s ease-in-out infinite',
        wiggle: 'wiggle 1.5s ease-in-out 1',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}