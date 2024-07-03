<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index()
    {
        $statuses = Mission::all();
        return $statuses;
    }

    public function show($mission_id)
    {
        $mission = Mission::find($mission_id);

        if (!$mission) {
            return response()->json(['message' => 'Mission not found'], 404);
        }

        return $mission;
    }

    // public function store()
    // {
    //     $data = request()->validate([
    //         'name' => 'required',
    //         'year' => 'required'
    //     ]);

    //     $mission = Mission::create($data);

    //     return response()->json($mission, 201);

    // }

    public function store(Request $request, $mission_id = null)
    {
        // ... validation
        $request->validate([
            'name' => 'required'
        ]);

        if ($mission_id) {
            $mission = Mission::findOrFail($mission_id);
        } else {
            $mission = new Mission;
        }

        $mission->name = $request->input('name');
        $mission->year = $request->input('year');
        $mission->outcome = $request->input('outcome', '');
        $mission->save();

        return [
            'status' => 'success',
            'message' => 'The mission has been updated'
        ];
    }
}
