<?php

require_once __DIR__ . '/../model/UserModel.php';
class AuthController {
    private $secret_key = 'x3AQwlq^2LS1%q0%vg3P';
    public function register($queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $postData['password'] = password_hash($postData['password'], PASSWORD_DEFAULT);

        if ($user->create($postData, ['bday' , 'avt_url' , 'fullname' ,'email' , 'username' ,'password'])) {
            return array(
                "status" => "success",
                "message" => "User registration completed successfully."
            );
        } else {
            return array(
                "status" => "error",
                "message" => "An error occurred during user registration. Please try again."
            );
        }
    }

    public function login($queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $username = $postData['username'];
        $password = $postData['password'];
        
        if ($user->checkCredential($username, $password)) {
            $userInfo = $user->read(['username' => $username])[0] ;
            $header = base64_encode(json_encode(array(
                "alg" => "HS256",
                "typ" => "JWT"
            )));
            $payload = base64_encode(json_encode(array(
                "id" => $userInfo['id'],
                "role" => $userInfo['role'],
                "fullname" => $userInfo['fullname'] 
            )));

            $signature = hash_hmac('sha256', "$header.$payload",$this->secret_key, true);
            $signature = base64_encode($signature);
            $token = "$header.$payload.$signature";

            setcookie('jwt', $token, [
                'expires' => time() + 60 * 60 * 24 * 7,
                'httponly' => true,
            ]);
            return array(
                "status" => "success",
                "message" => "User logged in successfully.",
                "id" => $userInfo['id'],
                "role" => $userInfo['role'],
                "fullname" => $userInfo['fullname'] 
            );
        } else {
            return array(
                "status" => "error",
                "message" => "Invalid username or password. Please try again."
            );
        }
    }
    
    public function logout($queryParams, $postData, $fromUser) {
        setcookie('jwt', '', time() - 3600);
        return array(
            "status" => "success",
            "message" => "User logged out successfully."
        );
    }
}

?>