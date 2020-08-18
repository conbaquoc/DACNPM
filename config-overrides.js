/* eslint-disable */
const { fixBabelImports, override, addLessLoader } = require('customize-cra');
const themeConfig = require('./src/configs/theme');

// Config override property for theme
module.exports = override(
    fixBabelImports(
        'import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, // change importing css to less
    ),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': themeConfig.palette.lightPrimary }
    })
);