<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use App\Models\Instructor;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create an instructor user
        $user = User::create([
            'name' => 'Vanness',
            'email' => 'admin@vanness.id',
            'password' => Hash::make('vns123'),
            'email_verified_at' => now(),
        ]);

        $instructor = Instructor::create([
            'user_id' => $user->id,
            'employee_id' => 'EMP00001',
            'specialization' => 'Matematika & Fisika',
            'bio' => 'Pengajar berpengalaman dengan 10+ tahun di bidang pendidikan.',
            'total_teaching_hours' => 156,
        ]);

        // Create subjects
        $subjects = [
            ['name' => 'Matematika', 'code' => 'MTK', 'description' => 'Pelajari konsep matematika dari dasar hingga lanjutan', 'icon' => 'Calculator', 'color' => '#3B82F6', 'is_popular' => true],
            ['name' => 'Fisika', 'code' => 'FIS', 'description' => 'Jelajahi hukum-hukum alam dan fenomena fisika', 'icon' => 'Atom', 'color' => '#8B5CF6', 'is_popular' => true],
            ['name' => 'Kimia', 'code' => 'KIM', 'description' => 'Pahami reaksi kimia dan struktur materi', 'icon' => 'FlaskConical', 'color' => '#10B981', 'is_popular' => true],
            ['name' => 'Biologi', 'code' => 'BIO', 'description' => 'Eksplorasi kehidupan dan organisme', 'icon' => 'Leaf', 'color' => '#22C55E', 'is_popular' => true],
            ['name' => 'Bahasa Inggris', 'code' => 'ENG', 'description' => 'Kuasai bahasa internasional untuk masa depan', 'icon' => 'Languages', 'color' => '#F59E0B', 'is_popular' => true],
            ['name' => 'Informatika', 'code' => 'INF', 'description' => 'Belajar pemrograman dan teknologi digital', 'icon' => 'Code', 'color' => '#0EA5E9', 'is_popular' => true],
        ];

        foreach ($subjects as $subjectData) {
            Subject::create($subjectData);
        }

        // Create classes
        $classesData = [
            ['name' => 'Matematika XII IPA 1', 'code' => 'MTK-XII-1', 'subject_id' => 1, 'room' => 'R-101', 'schedule' => 'Senin 07:00-09:00'],
            ['name' => 'Fisika XI IPA 2', 'code' => 'FIS-XI-2', 'subject_id' => 2, 'room' => 'Lab Fisika', 'schedule' => 'Selasa 09:00-11:00'],
            ['name' => 'Matematika X IPA 1', 'code' => 'MTK-X-1', 'subject_id' => 1, 'room' => 'R-103', 'schedule' => 'Rabu 13:00-15:00'],
        ];

        foreach ($classesData as $classData) {
            $classData['instructor_id'] = $instructor->id;
            ClassRoom::create($classData);
        }

        // Create students
        $students = [];
        for ($i = 1; $i <= 15; $i++) {
            $students[] = Student::create([
                'name' => 'Siswa ' . $i,
                'student_id' => 'STD' . str_pad($i, 5, '0', STR_PAD_LEFT),
                'email' => 'siswa' . $i . '@eduprime.id',
                'phone' => '0812345678' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'grade' => ['X', 'XI', 'XII'][rand(0, 2)],
                'status' => 'active',
            ]);
        }

        // Enroll students to classes
        $classes = ClassRoom::all();
        foreach ($classes as $class) {
            $randomStudents = collect($students)->random(rand(5, 10));
            foreach ($randomStudents as $student) {
                $class->students()->attach($student->id, [
                    'enrolled_at' => now(),
                    'grade' => rand(70, 100),
                ]);
            }
        }

        // Create testimonials
        $testimonials = [
            ['name' => 'Fufufafa', 'role' => 'Alumni DPR', 'content' => 'Sekolah ini memberikan pendidikan terbaik dan mempersiapkan saya untuk masa depan yang cerah.', 'rating' => 5, 'is_featured' => true],
            ['name' => 'Djokowi', 'role' => 'Orang Tua Siswa', 'content' => 'Anak saya berkembang pesat berkat bimbingan guru-guru yang berdedikasi tinggi.', 'rating' => 5, 'is_featured' => true],
            ['name' => 'Praroro', 'role' => 'Orang Tua Siswa', 'content' => 'Kami berkomitmen untuk mencetak generasi unggul yang siap menghadapi tantangan global.', 'rating' => 5, 'is_featured' => true],
            ['name' => 'Sri Mulyano', 'role' => 'Siswa Kelas 12', 'content' => 'Fasilitas modern dan metode pembelajaran interaktif membuat belajar jadi menyenangkan!', 'rating' => 5, 'is_featured' => true],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
