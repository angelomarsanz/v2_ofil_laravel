#!/bin/bash

# Colores
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Carga variables .env
set -o allexport
source .env
set +o allexport

# 1. Compilar, respaldar y subir ASSETS

echo -e "${YELLOW}--- CONFIGURACIÓN DE COMPILACIÓN Y SUBIDA ---${NC}"

# Preguntas
read -p "¿Compilar App Original? (S/N): " RESP_APP
read -p "¿Compilar y Subir Integraciones? (S/N): " RESP_INT
read -p "¿Compilar y Subir Garantías? (S/N): " RESP_GAR

# Exportar para Webpack
[[ "$RESP_APP" =~ ^[Ss]$ ]] && export BUILD_APP=true || export BUILD_APP=false
[[ "$RESP_INT" =~ ^[Ss]$ ]] && export BUILD_INTEGRACIONES=true || export BUILD_INTEGRACIONES=false
[[ "$RESP_GAR" =~ ^[Ss]$ ]] && export BUILD_GARANTIAS=true || export BUILD_GARANTIAS=false

# Ejecutar si alguno es true
if [ "$BUILD_APP" = true ] || [ "$BUILD_INTEGRACIONES" = true ] || [ "$BUILD_GARANTIAS" = true ]; then
    echo -e "${YELLOW}Ejecutando proceso selectivo...${NC}"
    npm run prod
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error en la compilación. Abortando.${NC}"
        exit 1
    fi
else
    echo "No se seleccionó ninguna acción."
fi

# 2. Sube archivos PHP puntuales (del proyecto original o de REDA)
echo "Subiendo archivos PHP puntuales (si aplica)..."

# --- CONFIGURACIÓN DE SUBIDA PUNTUAL ---
# La lista de archivos puntuales se carga desde un archivo externo.
if [ -f "./subir_archivos_puntuales.sh" ]; then
    source ./subir_archivos_puntuales.sh
    echo "Lista de archivos puntuales cargada desde ./subir_archivos_puntuales.sh"
else
    echo "Advertencia: No se encontró el archivo de configuración './subir_archivos_puntuales.sh'. No se subirán archivos puntuales."
    ARCHIVOS_PHP_PUNTUALES=() # Definir como vacío para evitar errores
fi

# Comprobar si se debe ejecutar la subida de archivos puntuales
if [ ${#ARCHIVOS_PHP_PUNTUALES[@]} -gt 0 ] && [ "${ARCHIVOS_PHP_PUNTUALES[0]}" != "Ninguno" ]; then
    lftp_commands_puntual="set ftp:ssl-allow no; open -u $FTP_USER,$FTP_PASSWORD $FTP_HOST;"
    archivos_encontrados=0
    for archivo in "${ARCHIVOS_PHP_PUNTUALES[@]}"; do
        if [ -f "$archivo" ]; then
            archivos_encontrados=$((archivos_encontrados + 1))
            NOMBRE_ARCHIVO=$(basename "$archivo")
            CARPETA_PADRE=$(basename "$(dirname "$archivo")")
            NOMBRE_RESPALDO="${CARPETA_PADRE}_${NOMBRE_ARCHIVO}"
            URL_ORIGEN_FTP="/$archivo"
            URL_RESPALDO_FTP="$FTP_REMOTE_PATH_OLD/$NOMBRE_RESPALDO"
            DIRECTORIO_REMOTO=$(dirname "$URL_ORIGEN_FTP")

            echo "  -> Preparando para subir (puntual): $NOMBRE_ARCHIVO..."
            lftp_commands_puntual+="mv ${URL_ORIGEN_FTP} ${URL_RESPALDO_FTP}; mkdir -p ${DIRECTORIO_REMOTO}; put -O ${DIRECTORIO_REMOTO}/ ${archivo};"
        else
            echo "  ⚠️  Archivo puntual no encontrado localmente, omitiendo: $archivo"
        fi
    done

    if [ $archivos_encontrados -gt 0 ]; then
        echo "📡 Ejecutando subida masiva (puntual) con lftp..."
        lftp -c "$lftp_commands_puntual"
        echo "✅ Archivos PHP puntuales han sido subidos."
    else
        echo "⏩ No se encontraron archivos puntuales válidos para subir."
    fi
fi

echo -e "${GREEN}--- Proceso de despliegue finalizado ---${NC}"