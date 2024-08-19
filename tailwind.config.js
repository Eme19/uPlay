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
  













// module.exports = {
//   content: [
//     "./pages/**/*.{js,jsx}",
//     "./components/**/*.{js,jsx}",
//     "./App/**/*.{js,jsx}",
//     "./src/**/*.{js,jsx}"
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           black: "#14181F",
//           green: "#56FFA6",
//           grey: {
//             100: "#2B303B",
//             200: "#202731",
//             300: "#C4D3ED",
//           }
//         }
//       },
//       fontFamily: {
//         // Define your custom font family here
//         custom: ['"Proxima Nova"', 'sans-serif'],
//       },
//       // Custom day and night mode configuration
//       darkSelector: '.dark-mode',
//       darkMode: 'class',
//     },
//   },
//   plugins: [
//     require('tailwindcss'),
//   ],
// };




















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
        custom: ['"Proxima Nova"', 'sans-serif'],
      },
      // Custom day and night mode configuration
      darkSelector: '.dark-mode',
      darkMode: 'class',
      screens: {
        'sm': '640px', // Small devices (phones, 600px and up)
        'md': '768px', // Medium devices (tablets, 768px and up)
        'lg': '1024px', // Large devices (desktops, 1024px and up)
        'xl': '1280px', // Extra large devices (large desktops, 1280px and up)
        '2xl': '1536px', // Extra extra large devices (larger desktops, 1536px and up)
      },
    },
  },
  plugins: [
    require('tailwindcss'),
  ],
};
