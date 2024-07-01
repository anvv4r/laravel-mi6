<?php

use Illuminate\Support\Facades\Route;

Route::get('/people', [App\Http\Controllers\Api\PersonController::class, 'index']);
Route::get('/people/{person_id}', [App\Http\Controllers\Api\PersonController::class, 'show']);
