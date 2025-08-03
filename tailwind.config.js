/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages
    "./components/**/*.{js,ts,jsx,tsx}", // Components
    "./faust/**/*.{js,ts,jsx,tsx}", // Faust-specific files if applicable
  ],
  theme: {
    extend: {
      colors: {
        primary: "#008889",
        bluePrimary: "#083D78",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
