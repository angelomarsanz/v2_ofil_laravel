// packages/Reda/Integraciones/resources/js/vistas/mercado_libre/importadores/indexImportadores.js

$(function() {
    // 1. Verificar si el div específico de esta vista existe en la página.
    const containerId = '#'; // id de referencia en el archivo resources/views/admin/partials/side-navbar.blade.php
    if ($(containerId).length) {


        // 3. Agregar opción en el menú para acceder a /admin/garantias  
        const initialContentHtml = `
            <div>
              Opción para acceder a Garantías en el menú lateral
            </div>
        `;

        // 4. Añadir el contenido al contenedor y el modal al body.
        $(containerId).html(initialContentHtml);
        $('body').append(modalHtml);
    }
});