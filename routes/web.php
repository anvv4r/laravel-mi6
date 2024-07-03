<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('main');
// });

Route::view('/{path?}', 'main')->where('path', '.*');
//PUT in the end of the code line..// if /react-app.blade.php renders the React app