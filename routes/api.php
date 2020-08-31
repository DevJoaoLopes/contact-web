<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Login
Route::post('/auth', 'ApiController@postLogin');

// Contatos
Route::get('/contacts', 'ApiController@getContacts');
Route::post('/contacts', 'ApiController@postContacts');
Route::post('/delete/contact', 'ApiController@deleteContact');
Route::put('/edit/contact', 'ApiController@editContact');

//Telefone
Route::post('/phones', 'ApiController@postPhone');
Route::get('/phones', 'ApiController@getPhones');
Route::put('/edit/phone', 'ApiController@editPhone');