<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'student_id',
        'email',
        'phone',
        'grade',
        'profile_photo',
        'status',
    ];

    /**
     * Get all classes this student is enrolled in.
     */
    public function classes(): BelongsToMany
    {
        return $this->belongsToMany(ClassRoom::class, 'class_student', 'student_id', 'class_id')
            ->withPivot(['enrolled_at', 'grade'])
            ->withTimestamps();
    }
}
