<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('garantias') && !Schema::hasColumn('garantias', 'tipo_agente')) {
            Schema::table('garantias', function (Blueprint $table) {
                $table->string('tipo_agente', 255)->nullable()->after('agente_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('garantias') && Schema::hasColumn('garantias', 'tipo_agente')) {
            Schema::table('garantias', function (Blueprint $table) {
                $table->dropColumn('tipo_agente');
            });
        }
    }
};
