<?php

use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Auth\SessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});



Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth');
Route::get('/products', [ProductController::class, 'index'])->middleware('auth');
Route::get('/orders', [OrderController::class, 'index'])->middleware('auth');

Route::middleware('guest')->group(function () {
    Route::get('/signup', [RegisterUserController::class, 'create']);
    Route::post('/signup', [RegisterUserController::class, 'store']);

    Route::get('/login', [SessionController::class, 'create']);
    Route::post('/login', [SessionController::class, 'store'])->name('login');
});

Route::delete('/logout', [SessionController::class, 'destroy'])->middleware('auth');
