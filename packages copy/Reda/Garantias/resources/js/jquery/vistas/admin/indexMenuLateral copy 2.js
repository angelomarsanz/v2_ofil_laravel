$(function () {
    // Sólo en rutas /admin
    try {
        if (!window.location.pathname.startsWith('/admin')) return;

        // Buscar el <li> que contiene el collapse con id 'propertySpecifications'
        const propertyCollapse = $('#propertySpecifications');
        if (!propertyCollapse.length) return;

        const parentLi = propertyCollapse.closest('li.nav-item');
        if (!parentLi.length) return;

        // Evitar duplicados: buscar link ya existente
        if ($(`a[href="/admin/garantias"]`).length) return;

        const menuItemHtml = `
            <li class="nav-item">
                <a href="/admin/garantias">
                    <i class="far fa-shield-alt"></i>
                    <p>Garantías</p>
                </a>
            </li>
        `;

        parentLi.after(menuItemHtml);
    } catch (e) {
        console.error('Error injecting Garantías menu item:', e);
    }
});