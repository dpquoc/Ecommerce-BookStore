<?php

require_once __DIR__ . '/../database.php';

class BookModel {
    private $connection;

    public function __construct() {
        $database = new Database();
        $this->connection = $database->connect();
    }

    public function __destruct() {
        $this->connection->close();
    }

    public function create($data , $allowedKeys = []) {
        if (!empty($allowedKeys)) {
            $data = array_intersect_key($data, array_flip($allowedKeys));
        }
        
        $keys = array_keys($data);
        $values = array_values($data);
        $query = "INSERT INTO BOOK (" . implode(", ", $keys) . ") VALUES ('" . implode("', '", $values) . "')";
        if ($this->connection->query($query)) {
            return true;
        } else {
            return false;
        }
    }

    public function read($queryParams, $allowedKeys = [], $select = []) {
        // Filter the query parameters to only include allowed keys
        if (!empty($allowedKeys)) {
            $queryParams = array_intersect_key($queryParams, array_flip($allowedKeys));
        }
    
        // Create SELECT clause based on provided columns
        $selectClause = empty($select) ? '*' : implode(', ', $select);
    
        $conditions = [];
        foreach ($queryParams as $key => $value) {
            $conditions[] = "$key='$value'";
        }
        $whereClause = !empty($conditions) ? 'WHERE ' . implode(' AND ', $conditions) : '';
        $query = "SELECT $selectClause FROM BOOK $whereClause";
        $result = $this->connection->query($query);
        if ($result->num_rows > 0) {
            $books = [];
            while ($row = $result->fetch_assoc()) {
                $books[] = $row;
            }
            return $books;
        } else {
            return null;
        }
    }

    public function search($queryParams, $allowedKeys = []) {
        // Filter the query parameters to only include allowed keys
        if (!empty($allowedKeys)) {
            $queryParams = array_intersect_key($queryParams, array_flip($allowedKeys));
        }
        $search_title = $queryParams['search_title'] ?? null;
        $search_category = $queryParams['search_category'] ?? null;
        $search_author = $queryParams['search_author'] ?? null;
        $min_price = $queryParams['min_price'] ?? null;
        $max_price = $queryParams['max_price'] ?? null;
        $sort = $queryParams['sort'] ?? null;
    
        $query = "CALL search_books('$search_title', '$search_category', '$search_author', '$min_price', '$max_price', '$sort')";
        $result = $this->connection->query($query);
        if ($result->num_rows > 0) {
            $books = [];
    
            // Loop through the results and add each book to the $books array
            while ($row = $result->fetch_assoc()) {
                $categories = explode(', ', $row['categories']);
                $row['categories'] = $categories;
                $books[] = $row;
            }
            return $books;
        } else {
            return null;
        }
    }
    

    public function update($id, $data, $allowedKeys = []) {
        // Filter the data to only include allowed keys
        if (!empty($allowedKeys)) {
            $data = array_intersect_key($data, array_flip($allowedKeys));
        }

        $updates = [];
        foreach ($data as $key => $value) {
            $updates[] = "$key='$value'";
        }
        $query = "UPDATE BOOK SET " . implode(", ", $updates) . " WHERE id='$id'";
        if ($this->connection->query($query)) {
            return true;
        } else {
            return false;
        }
    }

    public function delete($id) {
        $query = "DELETE FROM BOOK WHERE id='$id'";
        if ($this->connection->query($query)) {
            return true;
        } else {
            return false;
        }
    }
    
}

?>
