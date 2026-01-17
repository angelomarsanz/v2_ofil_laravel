// packages/Reda/Integraciones/resources/js/vistas/mercado_libre/importadores/indexImportadores.js

$(function() {
    // 1. Verificar si el div específico de esta vista existe en la página.
    const containerId = '#indexImportadores';
    if ($(containerId).length) {

        // --- Aquí va todo el código de la vista de Index Importadores ---

        console.log('Script para "Index Importadores" cargado.');

        // 2. Crear el botón y el modal
        const modalId = 'modalIndexImportadores';

        // HTML del Modal (Actualizado para Bootstrap 5)
        const modalHtml = `
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel">Listado del Importador</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    Listado del Importador
                  </div>
                </div>
              </div>
            </div>
        `;

        // 3. Crear contenido inicial dinámico con el botón modificado para Bootstrap 5
        const initialContentHtml = `
            <div class="card">
              <div class="card-header">
                Gestión del Importador
              </div>
              <div class="card-body">
                <h5 class="card-title">Contenido dinámico</h5>
                <p class="card-text">Este contenido ha sido insertado dinámicamente con JavaScript.</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                  Listado del Importador
                </button>
              </div>
            </div>
        `;

        // 4. Añadir el contenido al contenedor y el modal al body.
        $(containerId).html(initialContentHtml);
        $('body').append(modalHtml);
    }
});