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

$pasosGarantia = 'seleccionar-aseguradora|datos-propiedad|datos-arrendatario|personas-adicionales|detalle-garantia|garantia-enviada|revision-garantia|contrato-garantia|inventario-garantia|firma-contrato|pago-garantia';

// ----------------------------------------------------------------------
// 1. RUTAS PARA ADMIN (Acceso: https://dominio.com/admin/garantias)
//    Usamos la misma detección de $domain definida arriba.
// ----------------------------------------------------------------------
Route::domain($domain)->group(function () use ($domain, $pasosGarantia) {
    Route::prefix('admin')->middleware(['adminLang'])->group(function () use ($pasosGarantia) {
        Route::group(['middleware' => ['auth:admin', 'checkstatus']], function ()  use ($pasosGarantia) {
            Route::get('garantias', [GarantiaController::class, 'index'])->name('reda.admin.garantias.index');
            Route::post('garantias/store', [GarantiaController::class, 'store'])->name('reda.admin.garantias.store');
            Route::post('garantias/update/{id}', [GarantiaController::class, 'update'])->name('reda.admin.garantias.update');
            Route::get('garantias/show/{id}', [GarantiaController::class, 'show'])->name('reda.admin.garantias.show');
            Route::post('garantias/destroy/{id}', [GarantiaController::class, 'destroy'])->name('reda.agent.garantias.destroy');
            Route::get('garantias/busqueda-filtros', [GarantiaController::class, 'busquedaGarantias'])->name('reda.admin.garantias.busqueda');
            Route::get('garantias/usuario/verificar', [UsuarioController::class, 'verificarUsuarioConectado'])->name('reda.admin.garantias.usuario.verificar');
            Route::get('garantias/categorias', [CategoriaController::class, 'index'])->name('reda.admin.garantias.categorias.index');
            Route::get("garantias/{step}/{id}", function ()  use ($pasosGarantia) {
                return redirect()->route('reda.admin.garantias.index');
            })->where('step', $pasosGarantia);
        });
    });
});

// ----------------------------------------------------------------------
// 2. RUTAS PARA LA AGENCIA (USUARIO WEB TRADICIONAL)
// Acceso: https://dominio.com/user/garantias
// ----------------------------------------------------------------------
Route::group(['prefix' => 'user', 'middleware' => ['auth:web', 'userstatus', 'TenantDashboardLang']], function () use ($pasosGarantia) {
    Route::get('garantias', [GarantiaController::class, 'index'])->name('reda.user.garantias.index');
    Route::post('garantias/store', [GarantiaController::class, 'store'])->name('reda.user.garantias.store');
    Route::post('garantias/update/{id}', [GarantiaController::class, 'update'])->name('reda.user.garantias.update');
    Route::get('garantias/show/{id}', [GarantiaController::class, 'show'])->name('reda.user.garantias.show');
    Route::post('garantias/destroy/{id}', [GarantiaController::class, 'destroy'])->name('reda.agent.garantias.destroy');
    Route::get('garantias/busqueda-filtros', [GarantiaController::class, 'busquedaGarantias'])->name('reda.user.garantias.busqueda');
    Route::get('garantias/usuario/verificar', [UsuarioController::class, 'verificarUsuarioConectado'])->name('reda.user.garantias.usuario.verificar');
    Route::get('garantias/categorias', [CategoriaController::class, 'index'])->name('reda.user.garantias.categorias.index');
    Route::get("garantias/{step}/{id}", function ()  use ($pasosGarantia) {
        return redirect()->route('reda.user.garantias.index');
    })->where('step', $pasosGarantia);
});

// ----------------------------------------------------------------------
// 3. RUTAS PARA EL AGENTE (DENTRO DEL CONTEXTO TENANT)
// Acceso: https://dominio.com/{username}/agent/garantias
// ----------------------------------------------------------------------
Route::group([
    'domain' => $domain,
    'prefix' => $prefix,
    'middleware' => ['userMaintenance']
], function () use ($domain, $prefix, $pasosGarantia) {

    Route::middleware(['frontend.language'])->group(function () use ($pasosGarantia) {

        // El prefijo 'agent' es para seguir la convención del sistema de agentes
        Route::group(['prefix' => 'agent', 'middleware' => ['auth:agent']], function () use ($pasosGarantia) {

            Route::get('garantias', [GarantiaController::class, 'index'])->name('reda.agent.garantias.index');
            Route::post('garantias/store', [GarantiaController::class, 'store'])->name('reda.agent.garantias.store');
            Route::post('garantias/update/{id}', [GarantiaController::class, 'update'])->name('reda.agent.garantias.update');
            Route::get('garantias/show/{id}', [GarantiaController::class, 'show'])->name('reda.agent.garantias.show');
            Route::post('garantias/destroy/{id}', [GarantiaController::class, 'destroy'])->name('reda.agent.garantias.destroy');
            Route::get('garantias/busqueda-filtros', [GarantiaController::class, 'busquedaGarantias'])->name('reda.agent.garantias.busqueda');
            Route::get('garantias/usuario/verificar', [UsuarioController::class, 'verificarUsuarioConectado'])->name('reda.agent.garantias.usuario.verificar');
            Route::get('garantias/categorias', [CategoriaController::class, 'index'])->name('reda.agent.garantias.categorias.index');
            Route::get("garantias/{step}/{id}", function () use ($pasosGarantia) {
                return redirect()->route('reda.agent.garantias.index');
            })->where('step', $pasosGarantia);
        });
    });
});