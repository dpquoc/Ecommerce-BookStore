<?php

require_once __DIR__ . '/../model/ReviewModel.php';

class ReviewController {
    
    public function createReview($idRoute = null, $queryParams, $postData, $fromUser) {
        $review = new ReviewModel();
        $postData['user_id'] = $fromUser['id'];
        $allowedKeys = ['id', 'rating', 'review', 'book_isbn', 'user_id'];
    
        // Check if a review by the user for the book already exists
        $existingReview = $review->read(['user_id' => $fromUser['id'], 'book_isbn' => $postData['book_isbn']]);
        if ($existingReview) {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Review already exists for this book."
            );
        }
    
        if ($review->create($postData, $allowedKeys)) {
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Review created successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to create review. Please check your data and try again."
            );
        }
    }
    
    public function getReviews($idRoute = null, $queryParams, $postData, $fromUser) {
        $review = new ReviewModel();
        $allowedKeys = ['id', 'rating', 'review', 'book_isbn', 'user_id'];
        $select = ['id', 'rating', 'review', 'book_isbn', 'user_id'] ;

        $reviews = $review->read($queryParams, $allowedKeys , $select);
        if (!empty($reviews)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $reviews
            );
        } else {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "No reviews found."
            );
        }
    }

    public function getSingleReview($idRoute = null, $queryParams, $postData, $fromUser) {
        $review = new ReviewModel();
        $reviews = $review->read(['id' => $idRoute]);
        if (!empty($reviews)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $reviews[0]
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Review not found."
            );
        }
    }


    public function updateReview($idRoute = null, $queryParams, $postData, $fromUser) {
        $review = new ReviewModel();

        // Check if review with the given ID exists
        $existingReview = $review->read(['id' => $idRoute]);
        if (!$existingReview) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Review not found."
            );
        }
        
        $existingReview = $existingReview[0];
        // Check if the review belongs to the user who is trying to update it
        if ($existingReview['user_id'] != $fromUser['id']) {
            http_response_code(403);
            return array(
                "status" => "error",
                "message" => "You are not the owner of this review to update it."
            );
        }

        $allowedKeys = ['rating', 'review', 'book_isbn', 'user_id'];
        if ($review->update($idRoute,$postData, $allowedKeys)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Review updated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to update review. Please check your data and try again."
            );
        }
    }

    public function deleteReview($idRoute = null, $queryParams, $postData, $fromUser) {
        $review = new ReviewModel();

        // Check if review with the given ID exists
        $existingReview = $review->read(['id' => $idRoute]);
        if (!$existingReview) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Review not found."
            );
        }
        $existingReview = $existingReview[0];
        // Check if the review belongs to the user who is trying to delete it
        if ($fromUser['role'] != 'admin' && $existingReview['user_id'] != $fromUser['id']) {
            http_response_code(403);
            return array(
                "status" => "error",
                "message" => "You are not the owner of this review to delete"
            );
        }
    
        if ($review->delete($idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Review deleted successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to delete review. Please try again later."
            );
        }
    }
}

?>
