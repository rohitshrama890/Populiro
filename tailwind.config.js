/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'pixelated': { raw: '(image-rendering: pixelated)' },
      },
      fontFamily: {
        alegreya: ['Alegreya', 'serif'],
        pacifico: ['Pacifico', 'cursive'],
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
        GY:{
          100:'#b1fc5b',
          200:'#54de2a',
          300:'#29800e',
        },
      },
    },
  },
  plugins: [],
};
