<?php
header('Content-Type: application/json');

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// DATA FROM POST METHOD
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
        else if ( $payload['role'] == 'admin' ) { $userLevel = 2 ; }
    }
} 

//  0 : viewer , 1 : user , 2 : admin

$routes = [
    'POST /api.php/auth/register' => 'AuthController@register@0',
    'POST /api.php/auth/login' => 'AuthController@login@0',
    'GET /api.php/auth/logout' => 'AuthController@logout@0',
];

$routeKey = $method . ' ' . $request;

if (array_key_exists($routeKey, $routes)) {
    $action = explode('@', $routes[$routeKey]);
    $controllerName = $action[0];
    $methodName = $action[1];
    $routeUserLevel = intval($action[2]) ;
    
    // Check if the user is authorized to access the route
    if ($routeUserLevel <= $userLevel) {
        require __DIR__ . '/controller/' . $controllerName . '.php';
        $controller = new $controllerName();
        $response = call_user_func_array([$controller, $methodName], [$_GET, $data , $payload]);
        echo json_encode($response);
    } else {
        echo json_encode([
            "status" => "unauthorized",
            "message" => "You are not authorized to access this resource."
        ]);
    }

} else {
    echo json_encode([
        "status" => "not found",
        "message" => "The requested resource was not found."
    ]);
}
?>