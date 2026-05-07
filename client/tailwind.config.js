/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'lg': '0 5px 5px -20px rgb(125  125  125  / 0.05), 0 8px 16px 5px rgb(125  125  125 / 0.05)',
              }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
