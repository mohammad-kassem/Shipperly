<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'fname' => 'required|string|min:2|max:255',
      'lname' => 'required|string|min:2|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => 'required|string|min:6',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    User::create([
      'fname' => $request->fname,
      'lname' => $request->lname,
      'email' => $request->email,
      'password' => Hash::make($request->password),
    ]);

    $token = auth()->attempt($validator->validated());

    return response()->json([
      'statusMsg' => 'Register successful',
      'token' => $token,
      'name' => $request->fname .' ' .$request->lname, 
    ], 201);
  }

  public function login(Request $request){
    $validator = Validator::make($request->all(), [
      'email' => 'required|string',
      'password' => 'required|string',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 400);
    }

    if (!$token = auth()->attempt($validator->validated())) {
      return response()->json(['error' => ['Invalid cridentials']], 401);
    }

    $user = auth()->user();

    return response()->json([
      'statusMsg' => 'Login successful',
      'token' => $token,
      'name' => $user->fname.' ' .$user->lname, 
    ], 200);
  }
}
