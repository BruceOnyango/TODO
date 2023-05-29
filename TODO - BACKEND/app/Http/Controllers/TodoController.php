<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\todo;

class TodoController extends Controller
{
    
    /**
     * this section includes CRUD for the tasks list
     */


    //get all todos
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos);
    }

    //save a todo
    public function store(Request $request)
    {
      $validatedData = $request->validate([
        'title' => 'required',
        'description' => 'required',
      ]);

      $todo = Todo::create($validatedData);

      /**
       * added headers for cors 
       */

      return response()->json('Todo created!')
      ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
      ->header('Access-Control-Allow-Methods', 'POST')
      ->header('Access-Control-Allow-Headers', 'Content-Type');
    }

    //show a specific todo
    public function show($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json(['message' => 'Todo not found'], 404);
        }

        return response()->json($todo);
    }

    //update a specific todo
    public function update(Request $request, $id)
    {
        
        $todo = Todo::findOrFail($id);

        $todo->title = $request->input('title');
        $todo->description = $request->input('description');
        $todo->save();
        
        /**
         * added headers for cors policy
         */
        return response()->json($todo)
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'PUT')
        ->header('Access-Control-Allow-Headers', 'Content-Type');
    }

    //delete a specific todo
    public function destroy($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json(['message' => 'Todo not found'], 404);
        }

        $todo->delete();

        return response()->json(['message' => 'Todo deleted']);
    }

    //mark todo as completed
    public function markCompleted($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json(['message' => 'Todo not found'], 404);
        }

        $todo->completed = true;
        $todo->save();

        return response()->json(['message' => 'Todo marked as completed', 'todo' => $todo]);
    }

    //get completed todos
    public function completedTodos()
    {
        $completedTodos = Todo::where('is_completed', true)->get();

        return response()->json($completedTodos);
    }

    //get pending todos
    public function uncompletedTodos()
    {
        $uncompletedTodos = Todo::where('is_completed', false)->get();

        return response()->json($uncompletedTodos);
    }

}

