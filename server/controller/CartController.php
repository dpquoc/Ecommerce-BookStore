<?php

require_once __DIR__ . '/../model/CartModel.php';

class CartController {
    
    public function addToCart($idRoute = null, $queryParams, $postData, $fromUser) {
        $cart = new CartModel();
        $postData['user_id'] = $fromUser['id'];
        $allowedKeys = ['user_id', 'book_isbn', 'quantity'];
    
        // Check if a cart by the user for the book already exists
        $existingCart = $cart->read(['user_id' => $fromUser['id'], 'book_isbn' => $postData['book_isbn']]);
        if ($existingCart) {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Cart already exists for this book."
            );
        }
    
        if ($cart->create($postData, $allowedKeys)) {
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Book in cart created successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to create cart for this book. Please check your data and try again."
            );
        }
    }
    
    public function getCart($idRoute = null, $queryParams, $postData, $fromUser) {
        $cart = new CartModel();

        $carts = $cart->read(['user_id' => $fromUser['id'] ]);
        if (!empty($carts)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $carts
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No carts found."
            );
        }
    }



    public function updateCart($idRoute = null, $queryParams, $postData, $fromUser) {
        $cart = new CartModel();

        // Check if cart with the given ID exists
        $existingCart = $cart->read(['user_id' => $fromUser['id'], 'book_isbn' => $postData['book_isbn']]);

        if (!$existingCart) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "The book in your cart not found."
            );
        }
    

        if ($cart->update($fromUser['id'], $idRoute, $postData)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Cart updated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to update cart. Please check your data and try again."
            );
        }
    }

    public function removeFromCart($idRoute = null, $queryParams, $postData, $fromUser) {
        $cart = new CartModel();

        // Check if cart with the given ID exists
        $existingCart = $cart->read(['user_id' => $fromUser['id'], 'book_isbn' => $idRoute]);
        if (!$existingCart) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "The book in your cart not found."
            );
        }
    
    
        if ($cart->delete($fromUser['id'], $idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Book in cart deleted successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to delete the book in cart. Please try again later."
            );
        }
    }
}

?>
