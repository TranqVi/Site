/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:"class", // для theme provider
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // fontFamily:{
      //   dmsans: ["DM Sans", "sans-serif"],
      //   montserrat: ["Montserrat","sans-serif"]
      // }
    },
    // screens:{
    //   xs: "480px",
    //   sm: "768px",
    //   md: "1060px"
    // },
  },
  plugins: [],
}
