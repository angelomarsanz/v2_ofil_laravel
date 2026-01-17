{{-- Extiende el layout del inquilino --}}
@extends('tenant_frontend.layout')

{{-- 
   IMPORTANTE: El layout de tenant usa 'style' y 'script' en singular.
--}}

@section('style')
    <link rel="stylesheet" href="{{ asset('css/integraciones.css?v=' . time()) }}">
    @stack('plugin_styles')
@endsection

@section('content')
    {{-- 
       Aquí inyectamos el contenido de tu plugin en la sección 'content' 
       que es la que el layout padre reconoce.
    --}}
    @yield('contenido_del_plugin')
@endsection

@section('script')
    <script src="{{ asset('js/integraciones.js?v=' . time()) }}"></script>
    @stack('plugin_scripts')
@endsection