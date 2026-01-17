<?php

namespace Reda\Garantias\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Reda\Garantias\Models\Zona;

class Departamento extends Model
{
    use HasFactory;

    protected $fillable = 
    [
        "id_departamento_infocasas",
        "departamento",
    ];

    public function zonas()
    {
        return $this->hasMany(Zona::class);
    }

}
