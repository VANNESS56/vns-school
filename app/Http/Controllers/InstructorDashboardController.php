<?php

namespace App\Http\Controllers;

use App\Models\ClassRoom;
use App\Models\Instructor;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class InstructorDashboardController extends Controller
{
    /**
     * Display the instructor dashboard.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $instructor = $user->instructor;

        if (!$instructor) {
            // Create instructor profile if doesn't exist
            $instructor = Instructor::create([
                'user_id' => $user->id,
                'employee_id' => 'EMP' . str_pad($user->id, 5, '0', STR_PAD_LEFT),
            ]);
        }

        // Get instructor's classes with students
        $classes = ClassRoom::where('instructor_id', $instructor->id)
            ->with(['subject', 'students'])
            ->get()
            ->map(function ($class) {
                return [
                    'id' => $class->id,
                    'name' => $class->name,
                    'code' => $class->code,
                    'subject' => $class->subject ? $class->subject->name : 'No Subject',
                    'room' => $class->room,
                    'schedule' => $class->schedule,
                    'students_count' => $class->students->count(),
                    'max_students' => $class->max_students,
                    'status' => $class->status,
                ];
            });

        // Calculate statistics
        $totalStudents = $classes->sum('students_count');
        $totalClasses = $classes->count();
        $teachingHours = $instructor->total_teaching_hours;

        return Inertia::render('instructor/dashboard', [
            'instructor' => [
                'id' => $instructor->id,
                'name' => $user->name,
                'email' => $user->email,
                'employee_id' => $instructor->employee_id,
                'specialization' => $instructor->specialization,
                'bio' => $instructor->bio,
                'profile_photo' => $instructor->profile_photo,
            ],
            'stats' => [
                'total_students' => $totalStudents,
                'total_classes' => $totalClasses,
                'teaching_hours' => $teachingHours,
            ],
            'classes' => $classes,
        ]);
    }

    /**
     * Display the classes page.
     */
    public function classes(): Response
    {
        $user = Auth::user();
        $instructor = $user->instructor;

        $classes = ClassRoom::where('instructor_id', $instructor->id)
            ->with(['subject', 'students'])
            ->get()
            ->map(function ($class) {
                return [
                    'id' => $class->id,
                    'name' => $class->name,
                    'code' => $class->code,
                    'subject' => $class->subject ? [
                        'id' => $class->subject->id,
                        'name' => $class->subject->name,
                        'code' => $class->subject->code,
                    ] : null,
                    'room' => $class->room,
                    'schedule' => $class->schedule,
                    'students_count' => $class->students->count(),
                    'max_students' => $class->max_students,
                    'status' => $class->status,
                    'students' => $class->students->map(function ($student) {
                        return [
                            'id' => $student->id,
                            'name' => $student->name,
                            'student_id' => $student->student_id,
                            'email' => $student->email,
                            'grade' => $student->pivot->grade,
                        ];
                    }),
                ];
            });

        return Inertia::render('instructor/classes', [
            'classes' => $classes,
        ]);
    }

    /**
     * Display the students page.
     */
    public function students(): Response
    {
        $user = Auth::user();
        $instructor = $user->instructor;

        // Get all students from instructor's classes
        $studentIds = ClassRoom::where('instructor_id', $instructor->id)
            ->with('students')
            ->get()
            ->pluck('students')
            ->flatten()
            ->pluck('id')
            ->unique();

        $students = Student::whereIn('id', $studentIds)
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'student_id' => $student->student_id,
                    'email' => $student->email,
                    'phone' => $student->phone,
                    'grade' => $student->grade,
                    'status' => $student->status,
                    'classes_count' => $student->classes->count(),
                ];
            });

        return Inertia::render('instructor/students', [
            'students' => $students,
        ]);
    }

    /**
     * Display the schedule page.
     */
    public function schedule(): Response
    {
        $user = Auth::user();
        $instructor = $user->instructor;

        $classes = ClassRoom::where('instructor_id', $instructor->id)
            ->with('subject')
            ->where('status', 'active')
            ->get()
            ->map(function ($class) {
                return [
                    'id' => $class->id,
                    'name' => $class->name,
                    'subject' => $class->subject ? $class->subject->name : 'No Subject',
                    'room' => $class->room,
                    'schedule' => $class->schedule,
                ];
            });

        return Inertia::render('instructor/schedule', [
            'classes' => $classes,
        ]);
    }
}
