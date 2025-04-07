<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'customer_name',
        'total_amount',
        'status',
        'notes',
    ];

    /**
     * Get all items in this order
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the user who placed this order
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
