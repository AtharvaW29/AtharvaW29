<?php

// check the honeypot
$honeypot = filter_input(INPUT_POST, 'nickname', FILTER_SANITIZE_STRING);
if ($honeypot) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
}

// validate name
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$inputs['name'] = $name;
if (!$name || trim($name) === '') {
    $errors['name'] = 'Please enter your name';
}

// validate number
$number = $_POST["Phone_No."];
$inputs['number'] = $number;
if(!preg_match("/^[0-9]*$/", $number)){
    $errors['number'] = "Only numeric values allowed";
} else{
    $errors['number'] = 'Please enter your phone no.';
}
// validate email
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$inputs['email'] = $email;
if ($email) {
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    if (!$email) {
        $errors['email'] = 'Please enter a valid email';
    }
} else {
    $errors['email'] = 'Please enter an email';
}


// validate message
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
$inputs['message'] = $message;
if (!$message || trim($message) === '') {
    $errors['message'] = 'Please enter the message';
}