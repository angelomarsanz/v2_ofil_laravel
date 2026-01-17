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

// 4. LÓGICA DE SUBIDA (RESTABLECIDA A TU VERSIÓN ORIGINAL)
mix.then(() => {
    if (mix.inProduction()) {
        const ftpUser = process.env.FTP_USER;
        const ftpPassword = process.env.FTP_PASSWORD;
        const ftpHost = process.env.FTP_HOST;
        const remotePathJs = process.env.FTP_REMOTE_PATH_JS;
        const remotePathCss = process.env.FTP_REMOTE_PATH_CSS;
        const remotePathOld = process.env.FTP_REMOTE_PATH_OLD;

        const uploadPuntual = (localFile, remoteFile, prefix) => {
            const fileName = localFile.split('/').pop();
            const remoteDir = remoteFile.substring(0, remoteFile.lastIndexOf('/'));
            const backupName = `${prefix}_${fileName}`;

            console.log(`  -> Procesando ${fileName}...`);
            try {
                // Sintaxis exacta de tu original: ftpHost seguido de remoteFile sin barras extras manuales
                execSync(`curl --insecure -u "${ftpUser}:${ftpPassword}" ${ftpHost}${remoteFile} -o /dev/null && curl --insecure -u "${ftpUser}:${ftpPassword}" ${ftpHost}/ -Q "RNFR ${remoteFile}" -Q "RNTO ${remotePathOld}/${backupName}" || true`);
                
                execSync(`curl --insecure -T ${localFile} -u "${ftpUser}:${ftpPassword}" ${ftpHost}${remoteDir}/`);
                console.log(`  ✅ ${fileName} subido.`);
            } catch (e) {
                console.log(`  ❌ Error: ${e.message}`);
            }
        };

        if (buildInt) {
            console.log('🚀 Subiendo Integraciones...');
            uploadPuntual('public/js/integraciones.js', `${remotePathJs}/integraciones.js`, 'js_int');
            uploadPuntual('public/css/integraciones.css', `${remotePathCss}/integraciones.css`, 'css_int');
        }

        if (buildGar) {
            console.log('🚀 Subiendo Garantías...');
            uploadPuntual('public/js/garantias.js', `${remotePathJs}/garantias.js`, 'js_gar');
            uploadPuntual('public/css/garantias.css', `${remotePathCss}/garantias.css`, 'css_gar');
            // Subir assets jQuery del plugin Garantías
            uploadPuntual('public/js/garantias-jq.js', `${remotePathJs}/garantias-jq.js`, 'js_gar_jq');
            uploadPuntual('public/css/garantias-jq.css', `${remotePathCss}/garantias-jq.css`, 'css_gar_jq');
        }
    }
});