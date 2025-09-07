//** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Replace with your desired color (e.g., Tailwind blue-900)
        secondary: "#9333EA", // Replace with your desired color (e.g., Tailwind purple-600)
      },
      fontFamily:{
        "sideUpperBar":["Playwrite ZA Guides", "serif"]
      },
    },
  },
  plugins: [],
}

