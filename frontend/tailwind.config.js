module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [],
    theme: {
        fontFamily: {
            sans: 'Euclid Circular B',
        },
        extend: {
            boxShadow: {
                indigo: '0 10px 14px -8px rgba(180, 178, 221, .8)',
                card: '0 40px 20px -30px rgba(236, 240, 243)',
            },
        },
    },
    variants: {
        boxShadow: ['focus', 'hover'],
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    },
    plugins: [require('tailwind-css-variables')()],
};
