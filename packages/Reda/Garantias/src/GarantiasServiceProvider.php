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
            // Definir los tags HTML
            $stylesHtml = '<link rel="stylesheet" href="' . asset('css/garantias-jq.css?v='.time()) . '">';
            $scriptsHtml = '<script src="' . asset('js/garantias-jq.js?v='.time()) . '" defer></script>';

            // Compartimos las variables con todas las vistas, 
            // pero solo se imprimirán si el layout las llama.
            // Usamos nombres únicos para evitar colisiones con el autor original.
            $view->with('garantias_styles', $stylesHtml);
            $view->with('garantias_scripts', $scriptsHtml);
        });
    }
}