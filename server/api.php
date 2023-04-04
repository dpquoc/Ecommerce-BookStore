<?php
error_reporting(E_ERROR);
header('Content-Type: application/json');

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Data from post method
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$userLevel = 0 ;
$payload = [] ;

if (isset($_COOKIE['jwt'])) {
    $jwt = $_COOKIE['jwt'] ;
    $parts = explode('.', $jwt);

    // Decode the header and payload
    $header = json_decode(base64_decode($parts[0]), true);
    $payload = json_decode(base64_decode($parts[1]), true);
    
    // Compute the signature
    $secret_key = 'x3AQwlq^2LS1%q0%vg3P';
    $signature = hash_hmac('sha256', "$parts[0].$parts[1]", $secret_key, true);
    $signature = base64_encode($signature);

    $validToken = $signature === $parts[2] ;
    
    if( $validToken ){
        if ( $payload['role'] == 'user' ) { $userLevel = 1 ; }
        else if ( $payload['role'] == 'admin' ) { $userLevel = 2 ;}
    }
} 

// userLevel = 0 : viewer , 1 : user , 2 : admin

$routes = [
    // authentication
    'POST /api.php/auth/register' => 'AuthController@register@0',
    'POST /api.php/auth/login' => 'AuthController@login@0',
    'GET /api.php/auth/logout' => 'AuthController@logout@0',

    // user
    'GET /api.php/user' => 'UserController@getUsers@1',
    'GET /api.php/user/(\d+)' => 'UserController@getSingleUser@1',
    'GET /api.php/user/showme' => 'UserController@showMe@1',
    'PATCH /api.php/user/(\d+)' => 'UserController@updateUser@1',
    'DELETE /api.php/user/(\d+)' => 'UserController@deleteUser@2',

    //blog
    'POST /api.php/blog' => 'BlogController@createBlog@2',
    'GET /api.php/blog' => 'BlogController@getBlogs@0',
    'GET /api.php/blog/(\d+)' => 'BlogController@getSingleBlog@0',
    'PATCH /api.php/blog/(\d+)' => 'BlogController@updateBlog@2',
    'DELETE /api.php/blog/(\d+)' => 'BlogController@deleteBlog@2',

    //book
    'POST /api.php/book' => 'BookController@createBook@2',
    'GET /api.php/book' => 'BookController@getBooks@0',
    'GET /api.php/book/(\d+)' => 'BookController@getSingleBook@0',
    'PATCH /api.php/book/(\d+)' => 'BookController@updateBook@2',
    'DELETE /api.php/book/(\d+)' => 'BookController@deleteBook@2',
    //cart
];


$routeKey = $method . ' ' . $request;

// Try to match the route key to the defined route patterns
foreach ($routes as $routePattern => $action) {
    // Split the route pattern into method and path parts
    list($routeMethod, $routePath) = explode(' ', $routePattern, 2);

    // Check if the route method and path match the requested method and path
    if ($routeMethod == $method && preg_match("#^{$routePath}(\?.*)?$#", $request, $matches)) {
        // The route pattern matches the requested URL
        $actionInfo = explode('@', $action) ;
        $controllerName = $actionInfo[0];
        $methodName = $actionInfo[1];
        $routeUserLevel = intval($actionInfo[2]);

        // Extract the dynamic parameter values from the URL
        $params = array_slice($matches, 1)[0];

        // Check if the user is authorized to access the route
        if ($routeUserLevel <= $userLevel) {
            require __DIR__ . '/controller/' . $controllerName . '.php';
            $controller = new $controllerName();

            $response = call_user_func_array([$controller, $methodName], [$params, $_GET, $data, $payload]);
            echo json_encode($response);
        } else {
            http_response_code(401);
            echo json_encode([
                "status" => "unauthorized",
                "message" => "You are not authorized to access this resource."
            ]);
        }

        exit; // Stop processing the other routes
    }
}

// No route pattern matched the requested URL
echo json_encode([
    "status" => "not found",
    "message" => "The requested resource was not found."
]);

?>