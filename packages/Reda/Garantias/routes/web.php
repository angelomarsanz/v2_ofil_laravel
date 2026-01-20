<?php

use Illuminate\Support\Facades\Route;
use Reda\Garantias\Http\Controllers\GarantiaController;
use Reda\Garantias\Http\Controllers\CategoriaController;
use Reda\Garantias\Http\Controllers\UsuarioController;

// --- LÓGICA DE DETECCIÓN DE TENANT (Copiada de tenant_frontend.php) ---
$domain = env('WEBSITE_HOST');
$parsedUrl = parse_url(url()->current());
$host = isset($parsedUrl['host']) ? str_replace("www.", "", $parsedUrl['host']) : null;
$prefix = '';

if ($host) {
    if ($host == env('WEBSITE_HOST')) {
        $prefix = '/{username}';
    } else {
        $domain = (substr($_SERVER['HTTP_HOST'] ?? '', 0, 4) === 'www.') ? 'www.{domain}' : '{domain}';
    }
}

// ----------------------------------------------------------------------
// 1. RUTAS PARA ADMIN (Acceso: https://dominio.com/admin/garantias)
//    Usamos la misma detección de $domain definida arriba.
// ----------------------------------------------------------------------
Route::domain($domain)->group(function () use ($domain) {
    Route::prefix('admin')->middleware(['adminLang'])->group(function () {
        Route::group(['middleware' => ['auth:admin', 'checkstatus']], function () {
            Route::get('garantias', [GarantiaController::class, 'index'])->name('reda.garantias.index');
            Route::get('garantias/busqueda-filtros', [GarantiaController::class, 'busquedaGarantias'])->name('reda.garantias.busqueda');
            Route::get('garantias/usuario/verificar', [UsuarioController::class, 'verificarUsuarioConectado'])->name('reda.garantias.usuario.verificar');
            Route::get('garantias/categorias', [CategoriaController::class, 'index'])->name('reda.garantias.categorias.index');
            Route::get('seleccionar-aseguradora', [GarantiaController::class, 'seleccionarAseguradora'])->name('reda.garantias.seleccionar-aseguradora');
        });
    });
});

// ----------------------------------------------------------------------
// 2. RUTAS PARA LA AGENCIA (USUARIO WEB TRADICIONAL)
// Acceso: https://dominio.com/user/garantias
// ----------------------------------------------------------------------
Route::group(['prefix' => 'user', 'middleware' => ['auth:web', 'userstatus', 'TenantDashboardLang']], function () {
    Route::get('garantias', [GarantiaController::class, 'index'])->name('reda.garantias.index');
    Route::get('garantias/busqueda-filtros', [GarantiaController::class, 'busquedaGarantias'])->name('reda.garantias.busqueda');
    Route::get('garantias/usuario/verificar', [UsuarioController::class, 'verificarUsuarioConectado'])->name('reda.garantias.usuario.verificar');
    Route::get('garantias/categorias', [CategoriaController::class, 'index'])->name('reda.garantias.categorias.usuario.index');
    Route::get('seleccionar-aseguradora/$idGarantia', [GarantiaController::class, 'seleccionarAseguradora'])->name('reda.garantias.usuario.seleccionar-aseguradora');

});

// ----------------------------------------------------------------------
// 3. RUTAS PARA EL AGENTE (DENTRO DEL CONTEXTO TENANT)
// Acceso: https://dominio.com/{username}/agent/garantias
// ----------------------------------------------------------------------
Route::group([
    'domain' => $domain,
    'prefix' => $prefix,
    'middleware' => ['userMaintenance']
], function () use ($domain, $prefix) {

    Route::middleware(['frontend.language'])->group(function () {

        // El prefijo 'agent' es para seguir la convención del sistema de agentes
        Route::group(['prefix' => 'agent', 'middleware' => ['auth:agent']], function () {

            Route::get('garantias', [GarantiaController::class, 'index'])->name('reda.garantias.agent.index');
            Route::get('garantias/busqueda-filtros', [GarantiaController::class, 'busquedaGarantias'])->name('reda.garantias.agent.busqueda');
            Route::get('garantias/usuario/verificar', [UsuarioController::class, 'verificarUsuarioConectado'])->name('reda.garantias.agent.usuario.verificar');
            Route::get('garantias/categorias', [CategoriaController::class, 'index'])->name('reda.garantias.categorias.agent.index');
            Route::get('seleccionar-aseguradora', [GarantiaController::class, 'seleccionarAseguradora'])->name('reda.garantias.agent.seleccionar-aseguradora');
        });
    });
});