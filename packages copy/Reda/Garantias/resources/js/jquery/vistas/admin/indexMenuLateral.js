$(function () {
    function injectMenu() {
        if (!window.location.pathname.startsWith('/admin')) return;
        
        const propertyCollapse = $('#propertySpecifications');
        if (!propertyCollapse.length) return;

        if ($(`a[href="/admin/garantias"]`).length) return;

        const menuItemHtml = `
            <li class="nav-item">
                <a href="/admin/garantias">
                    <i class="fas fa-shield-alt"></i> <p>Garantías</p>
                </a>
            </li>`;

        propertyCollapse.closest('li.nav-item').after(menuItemHtml);
        console.log("Menú de Garantías inyectado correctamente.");
    }

    // Ejecutar al cargar
    injectMenu();
    
    // Por si el menú se carga dinámicamente, re-intentar a los 2 segundos
    setTimeout(injectMenu, 2000);
});