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
        inputBorder: "#999795",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0px 2px 3px 1px rgba(0, 0, 0, 0.25)', // adjust color and opacity as needed
      },
    },
  },
  plugins: [],
};
