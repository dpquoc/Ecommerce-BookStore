<?php

require_once __DIR__ . '/../model/BlogModel.php';

class BlogController {
    
    public function createBlog($idRoute = null, $queryParams, $postData, $fromUser) {
        $blog = new BlogModel();
        $allowedKeys = ['id', 'title', 'banner_url', 'content', 'publish_date', 'tag'];
        if ($blog->create($postData, $allowedKeys)) {
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Blog created successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to create blog. Please check your data and try again."
            );
        }
    }

    public function getBlogs($idRoute = null, $queryParams, $postData, $fromUser) {
        $blog = new BlogModel();
        $allowedKeys = ['id', 'title', 'banner_url', 'content', 'publish_date', 'tag'];
        $select = ['id', 'title', 'banner_url', 'publish_date', 'tag'] ;

        $blogs = $blog->read($queryParams, $allowedKeys , $select);
        if (!empty($blogs)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $blogs
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No blogs found."
            );
        }
    }

    public function getSingleBlog($idRoute = null, $queryParams, $postData, $fromUser) {
        $blog = new BlogModel();
        $blogs = $blog->read(['id' => $idRoute]);
        if (!empty($blogs)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $blogs[0]
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Blog not found."
            );
        }
    }


    public function updateBlog($idRoute = null, $queryParams, $postData, $fromUser) {
        $blog = new BlogModel();
        $allowedKeys = ['title', 'banner_url', 'content', 'tag'];
        if ($blog->update($idRoute,$postData, $allowedKeys)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Blog updated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to update blog. Please check your data and try again."
            );
        }
    }

    public function deleteBlog($idRoute = null, $queryParams, $postData, $fromUser) {
        $blog = new BlogModel();

        // Check if blog with the given ID exists
        $existingBlog = $blog->read(['id' => $idRoute]);
        if (!$existingBlog) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Blog not found."
            );
        }
        
        if ($blog->delete($idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Blog deleted successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to delete blog. Please try again later."
            );
        }
    }
}

?>
