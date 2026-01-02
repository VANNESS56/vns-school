<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ClassRoom extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'name',
        'code',
        'instructor_id',
        'subject_id',
        'room',
        'schedule',
        'max_students',
        'status',
    ];

    /**
     * Get the instructor for this class.
     */
    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    /**
     * Get the subject for this class.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get all students enrolled in this class.
     */
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'class_student', 'class_id', 'student_id')
            ->withPivot(['enrolled_at', 'grade'])
            ->withTimestamps();
    }

    /**
     * Get the number of enrolled students.
     */
    public function getEnrolledCountAttribute(): int
    {
        return $this->students->count();
    }
}
