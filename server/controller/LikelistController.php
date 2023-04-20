<?php

require_once __DIR__ . '/../model/LikelistModel.php';

class LikelistController {
    
    public function likeBook($idRoute = null, $queryParams, $postData, $fromUser) {
        $likelist = new LikelistModel();

        $data = array(
            'user_id' => $fromUser['id'],
            'book_isbn' => $idRoute
        );

        if ($likelist->create($data, [])) {
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Like book operated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to like book. Please check your data and try again."
            );
        }
    }

    public function getLikelists($idRoute = null, $queryParams, $postData, $fromUser) {
        $likelist = new LikelistModel();
        $allowedKeys = ['user_id', 'book_isbn'];

        $likelists = $likelist->read($queryParams, $allowedKeys);
        if (!empty($likelists)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $likelists
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No likelists found."
            );
        }
    }

    public function getMyLikelist($idRoute = null, $queryParams, $postData, $fromUser) {
        $likelist = new LikelistModel();

        $likelists = $likelist->read(array('user_id' => $fromUser['id']));
        if (!empty($likelists)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $likelists
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No likelists found."
            );
        }
    }




    public function unlikeBook($idRoute = null, $queryParams, $postData, $fromUser) {
        $likelist = new LikelistModel();

        // Check if likelist with the given ID exists
        $existingLikelist = $likelist->read(['user_id' => $fromUser['id'] ,'book_isbn' => $idRoute]);
        if (!$existingLikelist) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Likelist not found."
            );
        }

        if ($likelist->delete($fromUser['id'], $idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Unlink book operated successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to unlike book. Please try again later."
            );
        }
    }
}

?>
