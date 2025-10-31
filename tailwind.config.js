/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], // must cover all JSX
  theme: {
    extend: {
      fontFamily: {
      playball: ['Playball', 'cursive'],
      inter: ['Inter', 'sans-serif'],
      outfit: ['Outfit', 'sans-serif'],
      cormorant: ['Cormorant', 'serif'],
    },
    },
  },
  plugins: [],
};
