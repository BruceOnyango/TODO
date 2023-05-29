<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

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


    
    /**
     * will integrate auth santum if needed for now just quick simple routes
     */
    
    /**
     * basic crud routes below
     */
    
    Route::get('/', [TodoController::class, 'index']);
    Route::post('/todos/store', [TodoController::class, 'store']);
    Route::get('/todos/show/{id}', [TodoController::class, 'show']);
    Route::put('/todos/{todo}', [TodoController::class, 'markAsCompleted']);
    Route::put('/todos/update/{id}', [TodoController::class, 'update']);
    Route::delete('/todos/delete/{id}',[TodoController::class, 'destroy']);
    Route::get('/todos/completed', [TodoController::class, 'completedTodos']);
   

  

   
    

    
    
