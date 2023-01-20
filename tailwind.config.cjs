/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "670px",
      desktop: "1200px",
    },
    colors: {
      red: "#D73737",
      white: "#fff",
      purple: "#AD1FEA",
      blue: "#4661E6",
      "dark-blue": "#3A4374",
      "light-grey": "#F2F4FF",
      "light-grey-lighter": "#F7F8FD",
      orange: "#F49F85",
      "light-blue": "#62BCFA",
      "greyish-blue": "#647196",
    },
    fontSize: {
      h1: [
        "1.5rem",
        { fontWeight: 700, lineHeight: "2.18rem", letterSpacing: "-0.33px" },
      ],
      h2: [
        "1.25rem",
        { fontWeight: 700, lineHeight: "1.81rem", letterSpacing: "-0.25px" },
      ],
      h3: [
        "1.125rem",
        { fontWeight: 700, lineHeight: "1.625rem", letterSpacing: "-0.25px" },
      ],
      h4: [
        "0.875rem",
        { fontWeight: 700, lineHeight: "1.25rem", letterSpacing: "-0.2px" },
      ],
      body1: ["1rem", { lineHeight: "1.43rem" }],
      body2: ["0.94rem", { lineHeight: "1.375rem" }],
      body3: ["0.81rem", { lineHeight: "1.18rem" }],
    },
    fontFamily: {
      sans: ["var(--font-jost)", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "header-desktop":
          "url(/backgroud-header/desktop/background-header.png)",
        "header-tablet": "url(/backgroud-header/tablet/background-header.png)",
        "header-mobile": "url(/backgroud-header/mobile/background-header.png)",
      },
    },
  },
  plugins: [],
};
