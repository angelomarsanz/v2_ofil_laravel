#!/bin/bash

# --- CONFIGURACIÓN DE SUBIDA PUNTUAL ---
# Lista aquí las rutas de TODOS los archivos específicos que quieres subir.
# Pueden ser del proyecto original o de los módulos REDA.
# Para no subir archivos, escribir la palabra "Ninguno".
# Ejemplo:
#   ARCHIVOS_PHP_PUNTUALES=(
#       "app/Http/Controllers/PaymentController.php"
#       "Ninguno"
#   )
ARCHIVOS_PHP_PUNTUALES=(
        #"Ninguno"
        "packages/Reda/Garantias/resources/js/react/vectores_objetos/datosInicio.jsx"
        "packages/Reda/Garantias/resources/js/react/i18n/es/general.json"
        "packages/Reda/Garantias/routes/web.php"

        "packages/Reda/Garantias/resources/js/react/formularios/Arrendatario.jsx"
        "packages/Reda/Garantias/resources/js/react/pasos/Indice.jsx"
        "packages/Reda/Garantias/resources/js/react/pasos/SeleccionarAseguradora.jsx"
        "packages/Reda/Garantias/resources/js/react/pasos/ContratoGarantia.jsx"
        "packages/Reda/Garantias/src/Http/Controllers/GarantiaController.php"
        "packages/Reda/Garantias/src/Http/Controllers/PersonaController.php"
        "packages/Reda/Garantias/resources/js/react/vectores_objetos/opcionesInputs.jsx"

)