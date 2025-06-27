<?php

use App\Http\Controllers\NavItemController;
use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Prompts\Themes\Default\NoteRenderer;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [NoteController::class, 'index'])->name('dashboard');
    Route::post('/nav-items', [NavItemController::class, 'store'])->name('nav-items.store');
    Route::post('/update/{id}', [NoteController::class, 'update'])->name('update');
    Route::post('/update_content/{id}', [NoteController::class, 'update_content'])->name('update_content');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
