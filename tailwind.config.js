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
        secondary: "#c75327",
        bluePrimary: "#083D78",
        inputBorder: "#999795",
        lightPrimary: "#00888980",
        grey3d:"#3d3d3d",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'custom': 'shadow-[inset_0px_2px_4px_0px_rgba(61,61,61,0.15)]',
        'custom2': 'shadow-[0px_2px_3px_1px_rgba(0,0,0,0.1)]',
      },
    },
  },
  plugins: [],
};
