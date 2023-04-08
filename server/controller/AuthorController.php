<?php

require_once __DIR__ . '/../model/AuthorModel.php';

class AuthorController {
    
    public function createAuthor($idRoute = null, $queryParams, $postData, $fromUser) {
        $author = new AuthorModel();
        $allowedKeys = ['id', 'name', 'img_url', 'description'];
        if ($author->create($postData, $allowedKeys)) {
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Author created successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to create author. Please check your data and try again."
            );
        }
    }

    public function getAuthors($idRoute = null, $queryParams, $postData, $fromUser) {
        $author = new AuthorModel();
        $allowedKeys = ['id', 'name', 'img_url', 'description'];
        $select = ['id', 'name', 'img_url'] ;

        $authors = $author->read($queryParams, $allowedKeys , $select);
        if (!empty($authors)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $authors
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No authors found."
            );
        }
    }

    public function getSingleAuthor($idRoute = null, $queryParams, $postData, $fromUser) {
        $author = new AuthorModel();
        $authors = $author->read(['id' => $idRoute]);
        if (!empty($authors)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $authors[0]
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Author not found."
            );
        }
    }


    public function updateAuthor($idRoute = null, $queryParams, $postData, $fromUser) {
        $author = new AuthorModel();
        $allowedKeys = ['name', 'img_url', 'description'];
        if ($author->update($idRoute,$postData, $allowedKeys)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Author updated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to update author. Please check your data and try again."
            );
        }
    }

    public function deleteAuthor($idRoute = null, $queryParams, $postData, $fromUser) {
        $author = new AuthorModel();

        // Check if author with the given ID exists
        $existingAuthor = $author->read(['id' => $idRoute]);
        if (!$existingAuthor) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Author not found."
            );
        }

        if ($author->delete($idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Author deleted successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to delete author. Please try again later."
            );
        }
    }
}

?>
