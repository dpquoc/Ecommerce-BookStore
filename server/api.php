<?php
$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// DATA FROM POST METHOD
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$routes = [
    'POST /api.php/auth/register' => 'AuthController@register',
    'POST /api.php/auth/login' => 'AuthController@login',
    'GET /api.php/auth/logout' => 'AuthController@logout',
];

$routeKey = $method . ' ' . $request;

if (array_key_exists($routeKey, $routes)) {
    $action = explode('@', $routes[$routeKey]);
    $controllerName = $action[0];
    $methodName = $action[1];
    
    require __DIR__ . '/controller/' . $controllerName . '.php';
    
    $controller = new $controllerName();
    $response = call_user_func_array([$controller, $methodName], [$_GET, $data]);
    echo $response;
} else {
    http_response_code(404);
    require __DIR__ . '/view/404.php';
}
?>