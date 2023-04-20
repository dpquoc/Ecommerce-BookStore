<?php

require_once __DIR__ . '/../model/CategoryModel.php';

class CategoryController {
    
    public function addCategory($idRoute = null, $queryParams, $postData, $fromUser) {
        $category = new CategoryModel();
        $allowedKeys = ['category' , 'book_isbn'];
        $postData['book_isbn'] = intval($idRoute);
        if ($category->create($postData, $allowedKeys)) {
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Category created successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to create category. Please check your data and try again."
            );
        }
    }

    public function getBookCategory($idRoute = null, $queryParams, $postData, $fromUser) {
        $category = new CategoryModel();
        $categorys = $category->read(['book_isbn' => $idRoute]);
        if (!empty($categorys)) {
            http_response_code(200);

            $categories = array_column($categorys, 'category');
            return array(
                "status" => "success",
                "data" => $categories
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Category not found."
            );
        }
    }

    public function deleteCategory($idRoute = null, $queryParams, $postData, $fromUser) {
        $category = new CategoryModel();

        // Check if category with the given ID exists
        $existingCategory = $category->read(['book_isbn' => $idRoute]);
        if (!$existingCategory) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Category not found."
            );
        }
        
        if ($category->delete($idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Category deleted successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to delete category. Please try again later."
            );
        }
    }
}

?>
