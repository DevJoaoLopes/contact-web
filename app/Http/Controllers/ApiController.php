<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{

    // funcion fake auth for login
    public function postLogin(Request $request)
    {
        if($request->email == 'admin' && $request->pass == 'admin'){
            return ["auth" => true];
        }else{
            return ["auth" => false];
        }
    }
}
