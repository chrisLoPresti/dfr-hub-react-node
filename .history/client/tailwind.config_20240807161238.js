const config = {
  content: [
    "./src/pages/**/*.{js,jsx,tsx,mdx}",
    "./src/components/**/*.{js,jsx,tsx,mdx}",
    "./src/app/**/*.{js,jsx,tsx,mdx}",
    "./src/context/**/*.{js,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#61CA14",
        secondary: "#D4E12C",
        tertiary: "#0C111F",
        "blue-annotation": "#2D8CF0",
        "green-annotation": "#19BE6B",
        "yellow-annotation": "#FFBB00",
        "red-annotation": "#E23C39",
        "purple-annotation": "#B620E0",
      },
    },
    animation: {
      progress: "progress 1s infinite linear",
    },
    keyframes: {
      progress: {
        "0%": { transform: " translateX(0) scaleX(0)" },
        "40%": { transform: "translateX(0) scaleX(0.4)" },
        "100%": { transform: "translateX(100%) scaleX(0.5)" },
      },
    },
    transformOrigin: {
      "left-right": "0% 50%",
    },
  },
  safelist: [
    {
      pattern: /bg-(red|green|blue|purple|yellow)-annotation/,
      variants: ["lg", "hover", "focus", "lg:hover"],
    },
    {
      pattern: /text-(red|green|blue|purple|yellow)-annotation/,
    },
  ],
  plugins: [
    require("@designbycode/tailwindcss-text-stroke"),
    require("tailwind-scrollbar"),
  ],
};
export default config;
