<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, boolean, json, etc.
            $table->string('group')->default('general');
            $table->timestamps();
        });

        // Insert default settings
        DB::table('settings')->insert([
            ['key' => 'site_name', 'value' => 'Kaffee Siyap', 'type' => 'string', 'group' => 'general', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'site_theme', 'value' => 'coffee', 'type' => 'string', 'group' => 'appearance', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'primary_color', 'value' => '#DB924C', 'type' => 'string', 'group' => 'appearance', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
