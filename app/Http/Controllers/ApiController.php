<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    public function postLogin(Request $request)
    {
        try {
            $user = User::where('email', $request->input("email"))->where('password', $request->input("pass"))->get();
            if (sizeof($user) > 0) {
                return response(["success" => true, "message" => "Login efetuado com sucesso"], 200);
            } else {
                return response(["success" => false, "message" => "Dados incorretos"], 200);
            }
        } catch (\Exception $e) {
            return response(["success" => false, "message" => $e], 500);
        }
    }
}
