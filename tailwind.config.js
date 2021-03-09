module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./src/*.html"],
    options: {
      safelist: ["nav-with-bg", "nav-open"]
    }
  },
  theme: {
    fontFamily: {
      russo: "Russo One, sans-serif",
      inter: "Inter, sans-serif",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: {
        DEFAULT: "#FFFFFF",
      },
      black: {
        DEFAULT: "#000000",
      },
      gray: {
        1: "#333333",
        2: "#4F4F4F",
        3: "#BDBDBD",
      },
      blue: {
        DEFAULT: "#7288FF",
        1: "#DCEAFF",
        2: "#CCD6FF",
        3: "#7288FF",
      },
      purple: {
        DEFAULT: "#BCC3FF",
        1: "#D8DCFF",
      },
      yellow: {
        1: "#FFF1D2",
        2: "#F2C94C",
      },
      red: {
        1: "#FFF4EF",
        2: "#FF9384",
      },
      orange: {
        1: "#FB9952",
      },
      green: {
        1: "#64E6D3",
      },
    },
  },
  variants: {},
  plugins: [],
};
