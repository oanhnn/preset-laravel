const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  futures: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...fontFamily.sans],
      },
      inset: {
        '0': 0,
        full: '100%',
        auto: 'auto',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
    customForms: () => ({
      default: {
        checkbox: {
          borderRadius: 2,
          '&:indeterminate': {
            background:
              'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="8" height="2" x="4" y="7" rx="1"/%3E%3C/svg%3E\');',
            borderColor: 'transparent',
            backgroundColor: 'currentColor',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
        },
      },
    }),
  },

  variants: {},

  purge: {
    content: [
      './app/**/*.php',
      './resources/**/*.html',
      './resources/**/*.js',
      './resources/**/*.jsx',
      './resources/**/*.ts',
      './resources/**/*.tsx',
      './resources/**/*.php',
      './resources/**/*.vue',
      './resources/**/*.twig',
    ],
    layers: [
      'base',
      'components',
      'utilities',
    ],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
      whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/, /show$/],
    },
  },

  plugins: [
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
  ],
}
