<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class LandingPageController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index(): Response
    {
        // Get popular subjects
        $subjects = Subject::where('is_popular', true)
            ->take(6)
            ->get()
            ->map(function ($subject) {
                return [
                    'id' => $subject->id,
                    'name' => $subject->name,
                    'code' => $subject->code,
                    'description' => $subject->description,
                    'icon' => $subject->icon,
                    'color' => $subject->color,
                ];
            });

        // If no subjects in database, return sample data
        if ($subjects->isEmpty()) {
            $subjects = collect([
                ['id' => 1, 'name' => 'Matematika', 'code' => 'MTK', 'description' => 'Pelajari konsep matematika dari dasar hingga lanjutan', 'icon' => 'Calculator', 'color' => '#3B82F6'],
                ['id' => 2, 'name' => 'Fisika', 'code' => 'FIS', 'description' => 'Jelajahi hukum-hukum alam dan fenomena fisika', 'icon' => 'Atom', 'color' => '#8B5CF6'],
                ['id' => 3, 'name' => 'Kimia', 'code' => 'KIM', 'description' => 'Pahami reaksi kimia dan struktur materi', 'icon' => 'FlaskConical', 'color' => '#10B981'],
                ['id' => 4, 'name' => 'Biologi', 'code' => 'BIO', 'description' => 'Eksplorasi kehidupan dan organisme', 'icon' => 'Leaf', 'color' => '#22C55E'],
                ['id' => 5, 'name' => 'Bahasa Inggris', 'code' => 'ENG', 'description' => 'Kuasai bahasa internasional untuk masa depan', 'icon' => 'Languages', 'color' => '#F59E0B'],
                ['id' => 6, 'name' => 'Informatika', 'code' => 'INF', 'description' => 'Belajar pemrograman dan teknologi digital', 'icon' => 'Code', 'color' => '#0EA5E9'],
            ]);
        }

        // Get featured testimonials
        $testimonials = Testimonial::where('is_featured', true)
            ->take(4)
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->name,
                    'role' => $testimonial->role,
                    'content' => $testimonial->content,
                    'avatar' => $testimonial->avatar,
                    'rating' => $testimonial->rating,
                ];
            });

        // If no testimonials in database, return sample data
        if ($testimonials->isEmpty()) {
            $testimonials = collect([
                ['id' => 1, 'name' => 'Ahmad Fauzi', 'role' => 'Alumni 2024', 'content' => 'Sekolah ini memberikan pendidikan terbaik dan mempersiapkan saya untuk masa depan yang cerah.', 'avatar' => null, 'rating' => 5],
                ['id' => 2, 'name' => 'Siti Rahma', 'role' => 'Orang Tua Siswa', 'content' => 'Anak saya berkembang pesat berkat bimbingan guru-guru yang berdedikasi tinggi.', 'avatar' => null, 'rating' => 5],
                ['id' => 3, 'name' => 'Dr. Budi Santoso', 'role' => 'Kepala Sekolah', 'content' => 'Kami berkomitmen untuk mencetak generasi unggul yang siap menghadapi tantangan global.', 'avatar' => null, 'rating' => 5],
                ['id' => 4, 'name' => 'Maya Putri', 'role' => 'Siswa Kelas 12', 'content' => 'Fasilitas modern dan metode pembelajaran interaktif membuat belajar jadi menyenangkan!', 'avatar' => null, 'rating' => 5],
            ]);
        }

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'subjects' => $subjects,
            'testimonials' => $testimonials,
        ]);
    }
}
