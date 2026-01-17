<?php

namespace Reda\Garantias\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Reda\Garantias\Models\Departamento;

class Zona extends Model
{
    use HasFactory;

    protected $fillable = 
    [
        "id_zona_infocasas",
        "zona",
        "departamento_id"
    ];

    public function departamento()
    {
        return $this->belongsTo(Departamento::class);
    }
}
