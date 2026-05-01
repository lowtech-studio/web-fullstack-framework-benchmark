<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    /**
     * Display a listing of todos (Inertia page).
     */
    public function index(): Response
    {
        $todos = Todo::select('id', 'todo')->get();

        return Inertia::render('todos/index', [
            'todos' => $todos,
        ]);
    }

    /**
     * Return todos as JSON (API endpoint).
     */
    public function list(): JsonResponse
    {
        $todos = Todo::select('id', 'todo')->get();

        return response()->json($todos);
    }

    /**
     * Store a newly created todo.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'todo' => ['required', 'string', 'max:255'],
        ]);

        $todo = Todo::create($validated);

        return response()->json($todo, 201);
    }

    /**
     * Remove the specified todo.
     */
    public function destroy(Todo $todo): JsonResponse
    {
        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully']);
    }
}
