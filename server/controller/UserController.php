<?php

require_once __DIR__ . '/../model/UserModel.php';

class UserController {
    public function getUsers($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $allowedKeys = ['id', 'role', 'fullname', 'bday', 'avt_url'];
        $users = $user->read($queryParams, $allowedKeys);
        if ($users !== null) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $users
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No users found."
            );
        }
    }

    public function getSingleUser($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $allowedKeys = ['id', 'role', 'fullname', 'bday', 'avt_url'];
        $users = $user->read(['id' => $idRoute], $allowedKeys);
        if ($users !== null) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $users[0]
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "User not found."
            );
        }
    }

    public function showMe($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $allowedKeys = ['id', 'role', 'fullname', 'bday', 'avt_url'];
        $users = $user->read(['id' => $fromUser['sub']], $allowedKeys);
        if ($users !== null) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $users[0]
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "User not found."
            );
        }
    }

    public function updateUser($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $allowedKeys = ['role', 'fullname', 'bday', 'avt_url'];
        $data = json_decode($postData, true);
        if ($user->update($fromUser['sub'], $data, $allowedKeys)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "User updated successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to update user."
            );
        }
    }

    public function deleteUser($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        if ($user->delete($idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                'message' => 'User deleted successfully.'
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to delete user."
            );
        }
    }
}

?>