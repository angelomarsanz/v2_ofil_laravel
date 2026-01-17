<?php

namespace Reda\Garantias;

use Illuminate\Support\ServiceProvider;

class GarantiasServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/garantia.php', 'garantia');
    }

    public function boot(): void
    {
        // 1. Carga de Rutas
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        // 2. Carga de Vistas con el namespace 'garantias'
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'garantias');

        // 3. Carga de Migraciones (descomentar si agregas tablas)
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');

       // 4. PUBLICACIÓN DE CONFIGURACIÓN
        $this->publishes([
            __DIR__.'/../config/garantia.php' => config_path('garantia.php'),
        // Nueva etiqueta
        ], 'garantia-config');

        // 5. View composers para inyectar assets
        $layouts = ['admin.layout', 'agent.layout', 'user.layout'];

        \Illuminate\Support\Facades\View::composer($layouts, function ($view) {
            try {
                $viewName = $view->getName();
                
                // Definir los tags
                $styles = '<link rel="stylesheet" href="' . asset('css/garantias-jq.css?v=' . time()) . '">';
                $scripts = '<script src="' . asset('js/garantias-jq.js?v=' . time()) . '" defer></script>';

                // Inyectar según el layout (corrigiendo nombres de secciones)
                if ($viewName === 'agent.layout') {
                    // El layout de Agent usa 'style' y 'script' en singular
                    $view->getFactory()->startSection('style', $styles . ($view->getFactory()->getSections()['style'] ?? ''));
                    $view->getFactory()->startSection('script', $scripts . ($view->getFactory()->getSections()['script'] ?? ''));
                } else {
                    // Admin y User usan plural
                    $view->getFactory()->startSection('styles', $styles . ($view->getFactory()->getSections()['styles'] ?? ''));
                    $view->getFactory()->startSection('scripts', $scripts . ($view->getFactory()->getSections()['scripts'] ?? ''));
                }
            } catch (\Throwable $e) {
                logger()->error('GarantiasServiceProvider composer error: ' . $e->getMessage());
            }
        });
    }
}