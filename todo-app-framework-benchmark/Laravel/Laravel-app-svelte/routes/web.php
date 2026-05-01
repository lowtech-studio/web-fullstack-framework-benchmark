<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/todos');

Route::controller(TodoController::class)->group(function () {
    Route::get('/todos', 'index')->name('todos.index');
    Route::get('/todos/list', 'list')->name('todos.list');
    Route::post('/todos', 'store')->name('todos.store');
    Route::delete('/todos/{todo}', 'destroy')->name('todos.destroy');
});

