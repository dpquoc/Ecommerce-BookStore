<?php

require_once __DIR__ . '/../model/UserModel.php';

class UserController {
    public function getUsers($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        $allowedKeys = ['id', 'role', 'fullname', 'bday', 'avt_url'];
        $select = ['id', 'role', 'fullname', 'avt_url'];

        $users = $user->read($queryParams, $allowedKeys , $select);
        if (!empty($users)) {
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
        if ( $idRoute != $fromUser['id'] && $fromUser['role'] != 'admin' ){
            http_response_code(401);
            return [
                "status" => "unauthorized",
                "message" => "You are not authorized to access this resource."
            ];
        }
        $user = new UserModel();
        $select = ['id', 'role', 'fullname', 'avt_url' ,'bday' , 'username' , 'email'];

        $users = $user->read(['id' => $idRoute], [], $select);
        if (!empty($users)) {
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
        $select = ['id', 'role', 'fullname', 'avt_url' ,'bday' , 'username' , 'email'];

        $users = $user->read(['id' => $fromUser['id']], [], $select);
        if (!empty($users)) {
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
        $allowedKeys = ['fullname', 'bday', 'avt_url'];
        if ($user->update($idRoute,$postData, $allowedKeys)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "User updated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to update user. Please check your data and try again."
            );
        }
    }

    public function deleteUser($idRoute = null, $queryParams, $postData, $fromUser) {
        $user = new UserModel();
        if ($user->delete($idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "User deleted successfully."
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