@extends('integraciones::layout_bridge')

@section('contenido_del_plugin')
    <div id='indexImportadores'></div>
    <br /><br /><br />
    <div class="alert alert-info">
        Módulo: {{ config('integracion.module_version') }}
    </div>
@endsection