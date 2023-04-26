<?php

require_once __DIR__ . '/../model/OrderModel.php';
require_once __DIR__ . '/../model/OrderItemModel.php';
require_once __DIR__ . '/../model/BookModel.php';

class OrderController {
    
    public function createOrder($idRoute = null, $queryParams, $postData, $fromUser) {
        $order = new OrderModel();
        $item = new OrderItemModel();
        $book = new BookModel();
        
        $order_allowedKeys = ['name', 'email', 'address', 'telephone', 'price', 'user_id'];
        $item_allowedKeys = ['order_id', 'book_isbn', 'quantity', 'price'];
    
        // Get the list of items in the order from the post data
        $items = isset($postData['items']) ? $postData['items'] : array();
    
        // Calculate the total price of the order
        $total_price = 0;
        foreach ($items as &$item_data) {
            $book_data = $book->read(['isbn' => $item_data['book_isbn']]);
            $book_data = $book_data[0];

            $price = $book_data['price'];
            if ($book_data['on_sale']) {
                $discount_percent = $book_data['on_sale'];
                $price -= 1.0 * $price * ($discount_percent / 100);
            }
            
            $price = round($price, 2);
            
            $item_data['price'] = $price;
            $total_price += $item_data['quantity'] * $item_data['price'];
        }
    
        // Add the total price to the order data
        $postData['price'] = $total_price;
        
        $user_id = $fromUser['user_level'] > 0 ? $fromUser['id'] : -1;
        $postData['user_id'] = $user_id;
    
        // Create the order
        if ($order->create($postData, $order_allowedKeys)) {
            // Get the ID of the new order
            $order_id = $order->getLastInsertId();
            
            // Create the order items
            foreach ($items as &$item_data) {
                $item_data['order_id'] = $order_id;
                $item->create($item_data, $item_allowedKeys);
            }
            
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Order created successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to create order. Please check your data and try again."
            );
        }
    }
    

    public function getOrders($idRoute = null, $queryParams, $postData, $fromUser) {
        $order = new OrderModel();
        $item = new OrderItemModel();
        $allowedKeys = ['id', 'user_id', 'name', 'email', 'address', 'telephone', 'status'];

        $orders = $order->read($queryParams, $allowedKeys, []);
        if (!empty($orders)) {
            foreach ($orders as &$order_data) {
                $order_items = $item->read(['order_id' => $order_data['id']], [], ['book_isbn', 'quantity', 'price']);
                $order_data['items'] = $order_items;
            }
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $orders
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No orders found."
            );
        }
    }

    public function getMyOrders($idRoute = null, $queryParams, $postData, $fromUser) {
        $order = new OrderModel();
        $item = new OrderItemModel();
        $allowedKeys = ['id', 'user_id', 'name', 'email', 'address', 'telephone', 'status'];

        $orders = $order->read(['user_id' => $fromUser['id']], $allowedKeys, []);
        if (!empty($orders)) {
            foreach ($orders as &$order_data) {
                $order_items = $item->read(['order_id' => $order_data['id']], [], ['book_isbn', 'quantity', 'price']);
                $order_data['items'] = $order_items;
            }
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $orders
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No orders found."
            );
        }
    }

    public function updateOrder($idRoute = null, $queryParams, $postData, $fromUser) {
        $order = new OrderModel();
        $allowedKeys = ['status'];
        if ($order->update($idRoute,$postData, $allowedKeys)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Order updated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to order blog. Please check your data and try again."
            );
        }
    }

}

?>
