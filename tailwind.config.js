// import type { Config } from "tailwindcss";

// const config = {
//   darkMode: ["class"],
//   content: [
//     "./pages/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./app/**/*.{ts,tsx}",
//     "./src/**/*.{ts,tsx}",
//   ],
//   prefix: "",
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         primary: {
//           black: "#14181F",
//           green: "#56FFA6",
//           grey: {
//             100: "#2B303B",
//             200: "#202731",
//             300: "#C4D3ED",
//           },
//         },
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// } satisfies Config;

// export default config;






// module.exports = {
//     content: [
//       "./pages/**/*.{js,jsx}",
//       "./components/**/*.{js,jsx}",
//       "./App/**/*.{js,jsx}",
//       "./src/**/*.{js,jsx}"
//     ],
//     theme: {
//       extend: {
//         colors: {
//           primary: {
//             black: "#14181F",
//             green: "#56FFA6",
//             grey: {
//               100: "#2B303B",
//               200: "#202731",
//               300: "#C4D3ED",
//             }
//           }
//         }
//       }
//     },
//     plugins: [
//         require('tailwindcss'),
//     ],
//   };
  




module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./App/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#14181F",
          green: "#56FFA6",
          grey: {
            100: "#2B303B",
            200: "#202731",
            300: "#C4D3ED",
          }
        }
      },
      fontFamily: {
        // Define your custom font family here
        custom: ['"Proxima Nova"', 'sans-serif'],
      },
      // Custom day and night mode configuration
      darkSelector: '.dark-mode',
      darkMode: 'class',
      theme: {
        colors: {
          // Define your dark mode colors here
          background: 'var(--color-background)',
          text: 'var(--color-text)',
          // Add more dark mode colors as needed
        },
      },
    },
  },
  plugins: [
      require('tailwindcss'),
  ],
};
