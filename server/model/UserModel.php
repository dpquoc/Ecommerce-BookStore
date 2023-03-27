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

    public function create($data) {
        $keys = array_keys($data);
        $values = array_values($data);
        $query = "INSERT INTO USER (" . implode(", ", $keys) . ") VALUES ('" . implode("', '", $values) . "')";
        if ($this->connection->query($query)) {
            return true;
        } else {
            return false;
        }
    }

    public function read($queryParams) {
        $conditions = [];
        foreach ($queryParams as $key => $value) {
            $conditions[] = "$key='$value'";
        }
        $whereClause = !empty($conditions) ? 'WHERE ' . implode(' AND ', $conditions) : '';
        $query = "SELECT id, role, fullname, bday, avt_url FROM USER $whereClause";
        $result = $this->connection->query($query);
        if ($result->num_rows > 0) {
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            return $users;
        } else {
            return null;
        }
    }

    public function update($id, $data) {
        $updates = [];
        foreach ($data as $key => $value) {
            $updates[] = "$key='$value'";
        }
        $query = "UPDATE USER SET " . implode(", ", $updates) . " WHERE id='$id'";
        if ($this->connection->query($query)) {
            return true;
        } else {
            return false;
        }
    }

    public function delete($id) {
        $query = "DELETE FROM USER WHERE id=$id";
        if ($this->connection->query($query)) {
            return true;
        } else {
            return false;
        }
    }
    public function checkCredential($username, $password) {
        $query = "SELECT * FROM USER WHERE username='$username'";
        $result = $this->connection->query($query);
        if ($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            return password_verify($password, $user['password']);
        } else {
            return false;
        }
    }
}

?>
