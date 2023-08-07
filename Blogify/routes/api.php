<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/post/{id}', [PostController::class, 'show']);
Route::get('/posts', [PostController::class, 'index']);
Route::post('/addpost', [PostController::class, 'store']);

//tags
Route::get('/tags',[TagController::class, 'index']);
Route::get('/tags/{tag}',[TagController::class, 'showTag']);

// Route::prefix('api/v1')->group(function () {
//     Route::prefix('posts')->group(function () {
//         Route::get('/', 'PostController@index');      
//         Route::post('/', 'PostController@store');      
//         Route::get('/{id}', 'PostController@show');    
        
//     });

//     Route::prefix('tags')->group(function () {
//         Route::get('/', 'TagController@index');        
//               
//     });
// });


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
