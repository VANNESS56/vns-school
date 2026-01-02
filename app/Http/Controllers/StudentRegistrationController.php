<?php

namespace App\Http\Controllers;

use App\Models\StudentRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class StudentRegistrationController extends Controller
{
    /**
     * Display the registration form.
     */
    public function create()
    {
        return Inertia::render('registration/create');
    }

    /**
     * Store a new student registration.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:student_registrations,email',
            'phone' => 'required|string|max:20',
            'birth_date' => 'required|date|before:today',
            'gender' => 'required|in:male,female',
            'address' => 'required|string|max:500',
            'parent_name' => 'required|string|max:255',
            'parent_phone' => 'required|string|max:20',
            'previous_school' => 'nullable|string|max:255',
            'grade_applying' => 'required|in:X,XI,XII',
            'program' => 'nullable|string|max:50',
            'motivation' => 'nullable|string|max:1000',
        ], [
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'birth_date.required' => 'Tanggal lahir wajib diisi.',
            'birth_date.before' => 'Tanggal lahir harus sebelum hari ini.',
            'gender.required' => 'Jenis kelamin wajib dipilih.',
            'address.required' => 'Alamat wajib diisi.',
            'parent_name.required' => 'Nama orang tua wajib diisi.',
            'parent_phone.required' => 'Nomor telepon orang tua wajib diisi.',
            'grade_applying.required' => 'Kelas yang dituju wajib dipilih.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        StudentRegistration::create($request->all());

        return redirect()->route('registration.success');
    }

    /**
     * Show success page after registration.
     */
    public function success()
    {
        return Inertia::render('registration/success');
    }

    /**
     * Display all registrations for instructor.
     */
    public function index(Request $request)
    {
        $query = StudentRegistration::query()->latest();

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $registrations = $query->get()->map(function ($reg) {
            return [
                'id' => $reg->id,
                'full_name' => $reg->full_name,
                'email' => $reg->email,
                'phone' => $reg->phone,
                'birth_date' => $reg->birth_date->format('d M Y'),
                'gender' => $reg->gender === 'male' ? 'Laki-laki' : 'Perempuan',
                'address' => $reg->address,
                'parent_name' => $reg->parent_name,
                'parent_phone' => $reg->parent_phone,
                'previous_school' => $reg->previous_school,
                'grade_applying' => $reg->grade_applying,
                'program' => $reg->program,
                'motivation' => $reg->motivation,
                'status' => $reg->status,
                'status_label' => $reg->status_label,
                'notes' => $reg->notes,
                'created_at' => $reg->created_at->format('d M Y H:i'),
                'reviewed_at' => $reg->reviewed_at?->format('d M Y H:i'),
            ];
        });

        $stats = [
            'total' => StudentRegistration::count(),
            'pending' => StudentRegistration::where('status', 'pending')->count(),
            'accepted' => StudentRegistration::where('status', 'accepted')->count(),
            'rejected' => StudentRegistration::where('status', 'rejected')->count(),
        ];

        return Inertia::render('instructor/registrations', [
            'registrations' => $registrations,
            'stats' => $stats,
            'filters' => [
                'status' => $request->status ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Update registration status.
     */
    public function updateStatus(Request $request, StudentRegistration $registration)
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected',
            'notes' => 'nullable|string|max:500',
        ]);

        $registration->update([
            'status' => $request->status,
            'notes' => $request->notes,
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
        ]);

        return back()->with('success', 'Status pendaftaran berhasil diperbarui.');
    }

    /**
     * Delete a registration.
     */
    public function destroy(StudentRegistration $registration)
    {
        $registration->delete();

        return back()->with('success', 'Pendaftaran berhasil dihapus.');
    }
}
