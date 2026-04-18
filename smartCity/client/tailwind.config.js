/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: "#007C99", // Navy Blue (Main Theme)
secondary: "#00B894", // Soft Sky Blue (Accent)
accent: "#3AAFA9", // Teal Accent
background: "#F4F7F9", // Light Grayish-Blue (Background)
card: "#E3EAF3", // Subtle Blue-Gray (Card Background)
text: "#333333", // Deep Charcoal (Primary Text)
button: "#1363DF", // Rich Royal Blue (CTA Button)
hover: "#0B4F8C", // Slightly Darker Blue (Hover State)
border: "#CBD5E1", // Cool Gray (Borders & Dividers)
shadow: "rgba(0, 0, 0, 0.1)", // Soft Shadows
 // Hover Effect
      },
    },
  },
  plugins: [],
}