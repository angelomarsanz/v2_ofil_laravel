@extends('garantias::layout_bridge')

@section('contenido_del_plugin')
    <div id='indexCategorias'></div>
    <div class="alert alert-info">
        Módulo: {{ config('garantia.module_version') }}
    </div>
@endsection