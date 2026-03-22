const mix = require('laravel-mix');
const { execSync } = require('child_process');

const buildApp = process.env.BUILD_APP === 'true';
const buildInt = process.env.BUILD_INTEGRACIONES === 'true';
const buildGar = process.env.BUILD_GARANTIAS === 'true';

// 1. APP ORIGINAL
if (buildApp) {
    console.log('🏗️  Compilando App Original...');
    mix.js('resources/js/app.js', 'public/js')
       .sass('resources/sass/app.scss', 'public/css');
}

// 2. INTEGRACIONES
if (buildInt) {
    console.log('🏗️  Compilando Integraciones...');
    mix.js('packages/Reda/Integraciones/resources/js/main.js', 'public/js/integraciones.js')
       .sass('packages/Reda/Integraciones/resources/sass/main.scss', 'public/css/integraciones.css');
}

// 3. GARANTÍAS (CON TU CONFIGURACIÓN ORIGINAL COMPLETA)
if (buildGar) {
    console.log('🏗️  Compilando Garantías...');
    mix.react('packages/Reda/Garantias/resources/js/react/main.jsx', 'public/js/garantias.js')
       .sass('packages/Reda/Garantias/resources/sass/react/index.scss', 'public/css/garantias.css')
       .webpackConfig({
           module: {
               rules: [
                   {
                       test: /\.js$|jsx/,
                       include: [
                           /node_modules\/@mui/,
                           /node_modules\/@emotion/,
                           /node_modules\/react-i18next/,
                           /packages\/Reda\/Garantias\/resources\/js/
                       ],
                       use: [{
                           loader: 'babel-loader',
                           options: {
                               presets: [
                                   ['@babel/preset-env', {
                                       targets: "defaults",
                                       forceAllTransforms: true
                                   }],
                                   // MODIFICADO: Añadimos el runtime automatic aquí
                                   ['@babel/preset-react', {
                                       "runtime": "automatic"
                                   }]
                               ],
                               plugins: [
                                   '@babel/plugin-transform-optional-chaining',
                                   '@babel/plugin-transform-nullish-coalescing-operator',
                                   '@babel/plugin-transform-class-properties',
                                   '@babel/plugin-transform-logical-assignment-operators'
                               ]
                           }
                       }]
                   }
               ]
           }
       });

    // Compilar entry jQuery del plugin Garantías (inyecciones DOM y estilos del plugin)
    mix.js('packages/Reda/Garantias/resources/js/jquery/main.js', 'public/js/garantias-jq.js')
       .sass('packages/Reda/Garantias/resources/sass/jquery/main.scss', 'public/css/garantias-jq.css');
}