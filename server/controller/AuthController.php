<?php
require_once __DIR__ . '/../mailer.php';
require_once __DIR__ . '/../model/UserModel.php';

class AuthController {
    private $secret_key = 'x3AQwlq^2LS1%q0%vg3P';
    public function register($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $postData['password'] = password_hash($postData['password'], PASSWORD_DEFAULT);

        $password = $postData['password'];
        $email = $postData['email'];

        // validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return array(
                "status" => "error",
                "message" => "Invalid email address."
            );
        }

        // validate password length
        if (strlen($password) < 8) {
            return array(
                "status" => "error",
                "message" => "Password must be at least 8 characters long."
            );
        }


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

    public function registerAdmin($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $postData['role'] = 'admin';
        $postData['password'] = password_hash($postData['password'], PASSWORD_DEFAULT);

        if ($user->create($postData, ['bday' , 'avt_url' , 'fullname' ,'email' , 'role', 'username' ,'password'])) {
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

    public function login($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $username = $postData['username'];
        $password = $postData['password'];
        
        if ($user->checkCredential($username, $password)) {
            $userInfo = $user->read(['username' => $username], [], ['id', 'role', 'fullname','avt_url','email','bday'])[0] ;
            $header = base64_encode(json_encode(array(
                "alg" => "HS256",
                "typ" => "JWT"
            )));
            $payload = base64_encode(json_encode(array(
                "id" => $userInfo['id'],
                "role" => $userInfo['role'],
                "fullname" => $userInfo['fullname'], 
                "avt_url" => $userInfo['avt_url'],
                "email" => $userInfo['email'],
                "bday" => $userInfo['bday'],
            )));

            $signature = hash_hmac('sha256', "$header.$payload",$this->secret_key, true);
            $signature = base64_encode($signature);
            $token = "$header.$payload.$signature";

            setcookie('jwt', $token, [
                'expires' => time() + 60 * 60 * 24 * 7,
                'path' => '/', // to set cookie be available on all path
                'domain' => 'localhost',
                'secure' => false,  // set to true if using HTTPS
                'httponly' => true, // prevent code to read the cookie on client side
                'samesite' => 'Lax', //  to prevent CSRF attacks
            ]);
            
            return array(
                "status" => "success",
                "message" => "User logged in successfully.",
                "id" => $userInfo['id'],
                "role" => $userInfo['role'],
                "fullname" => $userInfo['fullname'],
                "avt_url" => $userInfo['avt_url'],
                "email" => $userInfo['email'],
                "bday" => $userInfo['bday']
            );
        } else {
            return array(
                "status" => "error",
                "message" => "Invalid username or password. Please try again."
            );
        }
    }
    
    public function updatePassword($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $oldPassword = $postData['oldPassword'];
        $newPassword = $postData['newPassword'];

        $userInfo = $user->read(['id' => $fromUser['id']], [], ['id', 'password'])[0];
        if (!password_verify($oldPassword, $userInfo['password'])) {
            return array(
                "status" => "error",
                "message" => "Incorrect old password."
            );
        }

        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $user->update($fromUser['id'], ['password' => $newPasswordHash]);

        return array(
            "status" => "success",
            "message" => "Password updated successfully."
        );
    }
    public function forgotPassword($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $email = $postData['email'];
    
        // Check if the user with this email exists
        $userInfo = $user->read(['email' => $email], [], ['id', 'fullname'])[0];
        if (!$userInfo) {
            return array(
                "status" => "error",
                "message" => "No user found with this email address."
            );
        }
    
        $token = bin2hex(random_bytes(32));
        $user->update($userInfo['id'], ['token' => $token]);
        $user->setTokenExpiry($userInfo['id']);

        // hash email with secret_key_2
        $hashed_email = hash('sha256', $email);
        $url_safe_hashed_email = str_replace(['+', '/'], ['-', '_'], base64_encode($hashed_email));

        $reset_link = "http://localhost:5173/reset-password?user=$url_safe_hashed_email&token=$token";
        
        // Send an email to the user with a link containing the token
        $to = $email;
        $subject = "Password reset request";
        $body = "Dear " . $userInfo['fullname'] . ",<br><br>"
                . "We have received a request to reset your password. If you did not make this request, please ignore this email.<br><br>"
                . "To reset your password, please click on the following link:<br><br>"
                . "<a href='$reset_link'>Reset Password</a><br><br>"
                . "Please note that this link is only valid for 5 minutes from the time it was generated.<br><br>"
                . "Thank you,<br>"
                . "The BookS Team";

    
        sendEmail($to, $subject, $body);
    
        return array(
            "status" => "success",
            "message" => "A password reset link has been sent to your email address."
        );
    }
    

    public function resetPassword($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $userInfo = $user->read($postData, ['token'], ['id', 'email', 'token_expiry'])[0];
        if (!$userInfo) {
            return array(
                "status" => "error",
                "message" => "Invalid reset token."
            );
        }

        $expiryTime = $userInfo['token_expiry'];
        $expiryTimestamp = strtotime($expiryTime);
        if (time() > $expiryTimestamp) {
            return array(
                "status" => "error",
                "message" => "Reset token has expired."
            );
        }

        // Verify hashed email
        $hashed_email = base64_decode(str_replace(['-', '_'], ['+', '/'], $postData['user']));
        if (hash('sha256', $userInfo['email']) !== $hashed_email) {
            return array(
                "status" => "error",
                "message" => "Invalid user."
            );
        }


        $password = $postData['new_password'];
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $user->update($userInfo['id'],['password' => $password_hash]);

        return array(
            "status" => "success",
            "message" => "Password has been reset successfully."
        );
    }
    

    public function logout($idRoute = null, $queryParams, $postData, $fromUser) {
        unset($_COOKIE['jwt']);
        setcookie('jwt', '', time() - 3600, '/', 'localhost', false, true);
        return array(
            "status" => "success",
            "message" => "User logged out successfully."
        );
    }


}

?>