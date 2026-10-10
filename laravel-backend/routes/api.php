<?php

use Illuminate\Support\Facades\Route;

Route::get('/status', function () {
    return response()->json([
        'status' => 'Laravel API is running',
        'app' => config('app.name'),
        'laravel' => app()->version(),
        'time' => now()->toIso8601String(),
    ]);
});
