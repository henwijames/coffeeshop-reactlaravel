<?php

use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Auth\SessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Redirect to dashboard if already logged in
    if (Auth::check()) {
        return redirect()->route('dashboard');
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

// Common routes for all authenticated users
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Orders routes (accessible by both admin and cashier)
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::put('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.update.status');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Settings for all users
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::post('/settings/toggle-role', [SettingsController::class, 'toggleRole'])->name('settings.toggle-role');
    Route::post('/settings/site', [SettingsController::class, 'updateSiteSettings'])->name('settings.update-site');

    Route::delete('/logout', [SessionController::class, 'destroy']);
});

// Admin-only routes
Route::middleware(['auth'])->group(function () {
    // Categories routes
    Route::get('/categories', [CategoryController::class, 'create']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // Products routes
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    // Settings
    Route::get('/settings', [SettingsController::class, 'index']);

    // Customers routes (when implemented)
    // Route::get('/customers', [CustomerController::class, 'index']);
});
