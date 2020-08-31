<?php

namespace App\Http\Controllers;

use App\Contact;
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

    public function getContacts()
    {
        $all_contacts = Contact::All();
        $array = [];
        foreach ($all_contacts as $value) {
            array_push($array, $value);
        }
        if (sizeof($array) > 0) {
            return response(["contacts" => $array], 200);
        } else {
            return response([], 200);
        }
    }

    public function postContacts(Request $request)
    {
        $contact = new Contact;
        try {
            $contact->name = $request->name;
            $contact->email = $request->email;
            $contact->face = $request->face;
            $contact->linkedin = $request->linkedin;
            $contact->save();
            if (isset($contact)) {
                return response(["message" => "Contato Cadastrado!!"], 200);
            }
        } catch (\Exception $e) {
            return response(["message" => "Erro ao cadastrar", "error" => $e], 500);
        }
    }

    public function deleteContact(Request $request)
    {
        $contact = Contact::find($request->input("id"));
        if (isset($contact)) {
            Contact::destroy($contact->id);
            return response(["message" => "Excluido com sucesso"], 200);
        } else {
            return response(["message" => "Erro ao excluir", "error" => "Contato inexistente"], 200);
        }
    }

    public function editContact(Request $request)
    {
        $contact = Contact::find($request->input("id"));

        if (isset($contact)) {
            $contact->name = $request->name;
            $contact->email = $request->email;
            $contact->face = $request->face;
            $contact->linkedin = $request->linkedin;
            $contact->save();
            return response(["message" => "Alteração realizada com sucesso"], 200);
        } else {
            return response(["message" => "Erro ao alterar"], 200);
        }
    }
}
