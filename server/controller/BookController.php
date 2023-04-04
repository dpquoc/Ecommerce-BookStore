<?php

require_once __DIR__ . '/../model/BookModel.php';

class BookController {
    
    public function createBook($idRoute = null, $queryParams, $postData, $fromUser) {
        $book = new BookModel();
        $allowedKeys = ['isbn', 'title', 'price', 'on_sale', 'image_url', 'author_id', 'cover_designer', 'pages', 'publisher', 'lang', 'released', 'description'];
        if ($book->create($postData, $allowedKeys)) {
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Book created successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to create book. Please check your data and try again."
            );
        }
    }

    public function getBooks($idRoute = null, $queryParams, $postData, $fromUser) {
        $book = new BookModel();
        $allowedKeys = ['search_title', 'search_category', 'search_author', 'min_price', 'max_price', 'sort'];

        $books = $book->search($queryParams, $allowedKeys);
        if (!empty($books)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $books
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No books found."
            );
        }
    }

    public function getSingleBook($idRoute = null, $queryParams, $postData, $fromUser) {
        $book = new BookModel();
        $books = $book->read(['id' => $idRoute]);
        if (!empty($books)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $books[0]
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Book not found."
            );
        }
    }


    public function updateBook($idRoute = null, $queryParams, $postData, $fromUser) {
        $book = new BookModel();
        $allowedKeys = ['isbn', 'title', 'price', 'on_sale', 'image_url', 'author_id', 'cover_designer', 'pages', 'publisher', 'lang', 'released', 'description'];
        
        if ($book->update($idRoute,$postData, $allowedKeys)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Book updated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to update book. Please check your data and try again."
            );
        }
    }

    public function deleteBook($idRoute = null, $queryParams, $postData, $fromUser) {
        $book = new BookModel();
        if ($book->delete($idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Book deleted successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to delete book. Please try again later."
            );
        }
    }
}

?>
