<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Phone;
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
        $all_phones = Phone::All();
        $array = array();
        foreach ($all_contacts as $contact) {
            $phones = [];
            foreach ($all_phones as $phone) {
                if ($phone->contact_id == $contact->id) {
                    array_push($phones, $phone);
                }
            }
            array_push($array, (object) [
                'contact' => $contact,
                'phones' => $phones,
            ]);
        }

        if (sizeof($array) > 0) {
            return response(["data" => $array], 200);
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


    public function getPhones()
    {
        $all_phones = Phone::All();
        $array = array();
        foreach ($all_phones as $phone) {
            array_push($array, $phone);
        }

        if (sizeof($array) > 0) {
            return response(["data" => $array], 200);
        } else {
            return response([], 200);
        }
    }


    public function postPhone(Request $request)
    {
        $phone = new Phone();
        try {
            $phone->number = $request->number;
            $phone->type = $request->type;
            $phone->contact_id = $request->contact_id;
            $phone->save();
            if (isset($phone)) {
                return response(["message" => "Telefone Cadastrado!!"], 200);
            }
        } catch (\Exception $e) {
            return response(["message" => "Erro ao cadastrar", "error" => $e], 500);
        }
    }
    public function editPhone(Request $request)
    {
        $phone = Phone::find($request->input("id"));

        if (isset($phone)) {
            $phone->number = $request->number;
            $phone->type = $request->type;
            $phone->contact_id = $request->contact_id;
            $phone->save();
            return response(["message" => "Alteração realizada com sucesso"], 200);
        } else {
            return response(["message" => "Erro ao alterar"], 200);
        }
    }

}
