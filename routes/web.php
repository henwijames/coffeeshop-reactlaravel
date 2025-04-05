<?php

use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Auth\SessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Redirect to dashboard if already logged in
    if (Auth::check()) {
        return redirect('/dashboard');
    }
    return Inertia::render('Home');
});

Route::fallback(fn() => Inertia::render('Errors/NotFound'));

Route::middleware('guest')->group(function () {
    Route::get('/signup', [RegisterUserController::class, 'create']);
    Route::post('/signup', [RegisterUserController::class, 'store']);

    Route::get('/login', [SessionController::class, 'create']);
    Route::post('/login', [SessionController::class, 'store'])->name('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/orders', [OrderController::class, 'index']);

    Route::get('/categories', [CategoryController::class, 'create']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::delete('/logout', [SessionController::class, 'destroy']);

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Product routes
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});
