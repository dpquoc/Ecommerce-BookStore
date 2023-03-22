<?php

require_once __DIR__ . '/../database.php';

class UserModel {
    private $connection;

    public function __construct() {
        $database = new Database();
        $this->connection = $database->connect();
    }

    public function __destruct() {
        $this->connection->close();
    }

    public function create($fullname, $bday, $email, $avt_url, $username, $password) {
        $query = "INSERT INTO USER (fullname, bday, email, avt_url, username, password) 
                  VALUES ('$fullname', '$bday', '$email', '$avt_url', '$username', '$password')";
        if ($this->connection->query($query)) {
            return true;
        } else {
            return false;
        }
    }

    public function read($id) {
       
    }

    public function update($id, $fullname, $bday, $email, $avt_url, $username, $password) {
       
    }

    public function delete($id) {
        $query = "DELETE FROM USER WHERE id=$id";
        if ($this->connection->query($query)) {
            return true;
        } else {
            return false;
        }
    }
}

?>
