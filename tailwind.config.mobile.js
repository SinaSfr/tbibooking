module.exports = {
  content: [
    './mobile/**/*.html',       
    './mobile/assets/js/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fade-white': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 84.28%)',
        'white-shadow': 'linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);',
        'fade-black': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);',
        'soft-black-bottom': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 54.62%, rgba(0, 0, 0, 0.8) 100%);',
        defaultBg: "var(--default-bg)",
        tourListBg: "var(--tourlist-bg)",
        articleListBg: "var(--articlelist-bg)",
        hotelListBg: "var(--hotellist-bg)",
        articleBg: "var(--article-bg)",
        footerBg: "var(--footer-bg)",
        contactBg: "var(--contact-bg)"
      },
      colors: {
        primary: {
           DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
           DEFAULT: "var(--secondary)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
        },
        specialcolor: {
          1: "var(--special-1)",
          2: "var(--special-2)",
          3: "var(--special-3)",
          4: "var(--special-4)",
       },

      }
    },
  },
  plugins: [],
};

