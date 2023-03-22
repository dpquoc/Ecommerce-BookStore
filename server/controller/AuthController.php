<?php

require_once __DIR__ . '/../model/UserModel.php';
class AuthController {
    public function register($queryParams, $postData) {
        $user = new UserModel();
        $fullname = $postData['fullname'];
        $bday = $postData['bday'];
        $email = $postData['email'];
        $avt_url = $postData['avt_url'];
        $username = $postData['username'];
        $password = password_hash($postData['password'], PASSWORD_DEFAULT);
        
        if ($user->create($fullname, $bday, $email, $avt_url, $username, $password)) {
            return true;
        } else {
            return false;
        }
    }

    public function login($queryParams, $postData) {
        $jwt = 'jwt_value';
        setcookie('jwt', $jwt);
    }

    public function logout($queryParams, $postData) {
        setcookie('jwt', '', time() - 3600);
    }
}

?>