<?php

use App\Http\Controllers\InstructorDashboardController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\StudentRegistrationController;
use Illuminate\Support\Facades\Route;

// Landing Page
Route::get('/', [LandingPageController::class, 'index'])->name('home');

// Student Registration (Public)
Route::prefix('daftar')->name('registration.')->group(function () {
    Route::get('/', [StudentRegistrationController::class, 'create'])->name('create');
    Route::post('/', [StudentRegistrationController::class, 'store'])->name('store');
    Route::get('/sukses', [StudentRegistrationController::class, 'success'])->name('success');
});

// Instructor Dashboard Routes (Protected)
Route::middleware(['auth', 'verified'])->prefix('instructor')->name('instructor.')->group(function () {
    Route::get('/dashboard', [InstructorDashboardController::class, 'index'])->name('dashboard');
    Route::get('/classes', [InstructorDashboardController::class, 'classes'])->name('classes');
    Route::get('/students', [InstructorDashboardController::class, 'students'])->name('students');
    Route::get('/schedule', [InstructorDashboardController::class, 'schedule'])->name('schedule');

    // Student Registrations Management
    Route::get('/registrations', [StudentRegistrationController::class, 'index'])->name('registrations');
    Route::patch('/registrations/{registration}/status', [StudentRegistrationController::class, 'updateStatus'])->name('registrations.updateStatus');
    Route::delete('/registrations/{registration}', [StudentRegistrationController::class, 'destroy'])->name('registrations.destroy');
});

// Legacy dashboard redirect
Route::middleware(['auth', 'verified'])->get('dashboard', function () {
    return redirect()->route('instructor.dashboard');
})->name('dashboard');

require __DIR__ . '/settings.php';
