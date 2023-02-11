<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthMiddleware
{
  public function handle(Request $request, Closure $next)
  {
    $user = auth()->user();
    
    if ($user) {
      return $next($request);
    }

    return response()->json(['error' => 'Unauthenticated'], 401);
  }
}
