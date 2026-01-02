<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employee_id',
        'specialization',
        'bio',
        'phone',
        'profile_photo',
        'total_teaching_hours',
    ];

    /**
     * Get the user that owns the instructor profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all classes taught by this instructor.
     */
    public function classes(): HasMany
    {
        return $this->hasMany(ClassRoom::class);
    }

    /**
     * Get total students across all classes.
     */
    public function getTotalStudentsAttribute(): int
    {
        return $this->classes->sum(function ($class) {
            return $class->students->count();
        });
    }
}
