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
            $viewName = $view->getName();
            
            // Determinar nombres de secciones según el layout del autor
            $sectionStyle = ($viewName === 'agent.layout') ? 'style' : 'styles';
            $sectionScript = ($viewName === 'agent.layout') ? 'script' : 'scripts';

            $styles = '<link rel="stylesheet" href="' . asset('css/garantias-jq.css?v='.time()) . '">';
            $scripts = '<script src="' . asset('js/garantias-jq.js?v='.time()) . '" defer></script>';

            // Usamos startSection pero capturando el factory de la vista actual
            $factory = $view->getFactory();

            // Inyectamos los estilos
            $factory->startSection($sectionStyle);
            echo $factory->yieldContent($sectionStyle); // Mantiene lo que ya existía
            echo $styles;
            $factory->stopSection();

            // Inyectamos los scripts
            $factory->startSection($sectionScript);
            echo $factory->yieldContent($sectionScript); // Mantiene lo que ya existía
            echo $scripts;
            $factory->stopSection();
        }); 
    }
}