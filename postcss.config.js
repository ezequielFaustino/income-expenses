const postcssPresetEnv = require('postcss-preset-env')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    require('postcss-import'),
    postcssPresetEnv({stage: 2}),
    require('cssnano'),
    tailwindcss({}),
    autoprefixer({}),
  ]
}