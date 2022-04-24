<?php

// get email from the config file
$config = require_once __DIR__ . './validation/config.php';
$recipient_email = $config['mail']['to_email'];

// contact information
$contact_name = $inputs['name'];
$contact_number = $inputs['number'];
$contact_email = $inputs['email'];
$message = $inputs['message'];


// Email header
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = "To: $recipient_email";
$headers[] = "From: $contact_email";
$header = implode('\r\n', $headers);

mail($recipient_email, $message, $header);