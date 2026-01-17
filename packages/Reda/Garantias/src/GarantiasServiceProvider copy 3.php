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
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'garantias');
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');

        $this->publishes([
            __DIR__.'/../config/garantia.php' => config_path('garantia.php'),
        ], 'garantia-config');

        // 5. View composers para inyectar assets
        $layouts = ['admin.layout', 'agent.layout', 'user.layout', 'layout'];

        \Illuminate\Support\Facades\View::composer($layouts, function ($view) {
            $viewName = $view->getName();
            
            // Ajuste de nombres de sección según el layout
            $sectionStyle = (str_contains($viewName, 'agent')) ? 'style' : 'styles';
            $sectionScript = (str_contains($viewName, 'agent')) ? 'script' : 'scripts';

            $styles = '<link rel="stylesheet" href="' . asset('css/garantias-jq.css?v='.time()) . '">';
            $scripts = '<script src="' . asset('js/garantias-jq.js?v='.time()) . '" defer></script>';

            $factory = $view->getFactory();

            // Inyectar Estilos
            $factory->startSection($sectionStyle);
            echo $factory->yieldContent($sectionStyle); 
            echo $styles;
            $factory->stopSection();

            // Inyectar Scripts (Usamos append para asegurar que vaya al final)
            $factory->appendSection($sectionScript, $scripts);
        });
    }
}