@php
    if (auth()->guard('admin')->check()) {
        $layout = 'admin.layout';
    } elseif (auth()->guard('agent')->check()) {
            $layout = 'agent.layout';
    } else {
        $layout = 'user.layout';
    }
@endphp
{{-- Extiende el layout apropiado según el guard autenticado --}}
@extends($layout)

@php
    // Contenido común de estilos del plugin
    $pluginCssHref = asset('css/garantias.css?v=' . time());
    $tenantJqHref = file_exists(public_path('assets/tenant/css/jquery-ui.min.css')) ? asset('assets/tenant/css/jquery-ui.min.css') : null;
    $pluginStylesHtml = '<link rel="stylesheet" href="' . e($pluginCssHref) . '">';
    if ($tenantJqHref) {
        $pluginStylesHtml .= '<link rel="stylesheet" href="' . e($tenantJqHref) . '">';
    }
    $csrfMeta = '<meta name="csrf-token" content="' . e(csrf_token()) . '">';
@endphp

@section('styles')
    {!! $pluginStylesHtml !!}
    {!! $csrfMeta !!}
    @yield('extra_plugin_styles')
@endsection

{{-- Compatibilidad: exponer los mismos estilos a la sección singular usada por algunos layouts --}}
@section('style')
    {!! $pluginStylesHtml !!}
    {!! $csrfMeta !!}
    @yield('extra_plugin_styles')
@endsection

@section('content')
    {{-- 
       El layout de usuario suele usar @yield('content') para el cuerpo principal.
       Aquí renderizamos el contenido específico del plugin.
    --}}
    @yield('contenido_del_plugin')
@endsection

@php
    $pluginJsSrc = asset('js/garantias.js?v=' . time());
@endphp

@section('scripts')
    {{-- Carga estática para layouts que usan 'scripts' --}}
    <script id="garantias-js" src="{{ $pluginJsSrc }}" defer></script>
    @yield('extra_plugin_scripts')
@endsection

{{-- Compatibilidad: para layouts que usan 'script' cargamos dinámicamente solo si no existe el script estático --}}
@section('script')
    <script>
        (function(){
            if (!document.getElementById('garantias-js')) {
                var s = document.createElement('script');
                s.id = 'garantias-js';
                s.src = '{{ $pluginJsSrc }}';
                s.defer = true;
                document.body.appendChild(s);
            }
        })();
    </script>
    @yield('extra_plugin_scripts')
@endsection

@section('variables')
    @yield('extra_plugin_variables')
@endsection