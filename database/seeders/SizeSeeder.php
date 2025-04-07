<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sizes = [
            [
                'name' => 'Small',
                'price_modifier' => 0.00,
            ],
            [
                'name' => 'Medium',
                'price_modifier' => 20.00,
            ],
            [
                'name' => 'Large',
                'price_modifier' => 35.00,
            ],
        ];

        foreach ($sizes as $size) {
            Size::create($size);
        }
    }
}
