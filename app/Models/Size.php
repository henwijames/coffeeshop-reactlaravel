<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price_modifier',
    ];

    protected $casts = [
        'price_modifier' => 'decimal:2',
    ];

    /**
     * The products that belong to this size.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class)
            ->withPivot('price')
            ->withTimestamps();
    }
}
