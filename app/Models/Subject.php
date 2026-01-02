<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'icon',
        'color',
        'credit_hours',
        'is_popular',
    ];

    protected $casts = [
        'is_popular' => 'boolean',
    ];

    /**
     * Get all classes for this subject.
     */
    public function classes(): HasMany
    {
        return $this->hasMany(ClassRoom::class);
    }
}
