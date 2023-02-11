<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShipmentController;

Route::group(['prefix'=>'v1'], function(){
  Route::group(['prefix'=>'auth'], function(){
    Route::post('/register', [AuthController::class, 'register']);
  });
});


