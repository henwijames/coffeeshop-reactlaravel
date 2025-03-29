<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', ['name' => "Henry"]);
});


Route::get('/login', function () {
    return Inertia::render('Auth/Login');
});
Route::get('/signup', function () {
    return Inertia::render('Auth/Signup');
});
