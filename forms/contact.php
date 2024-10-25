<?php
require 'C:\xampp\htdocs\Personal\PHPMailer-master\PHPMailer-master\src\Exception.php';
require 'C:\xampp\htdocs\Personal\PHPMailer-master\PHPMailer-master\src\PHPMailer.php';
require 'C:\xampp\htdocs\Personal\PHPMailer-master\PHPMailer-master\src\SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize it
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Gmail SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'bakulpansuriya2907@gmail.com'; // Your Gmail address
        $mail->Password   = 'ylyp htbl pzyn qhks'; // Your Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use TLS encryption
        $mail->Port       = 587; // TCP port for TLS

        // Set sender email and name (the user who filled the form)
        $mail->setFrom($email); // Use the email from the form input as the sender
        $mail->addAddress('bakulpansuriya2907@gmail.com', 'Bakul Pansuriya'); // Set the recipient email

        // Content
        $mail->isHTML(false); // Set email format to plain text
        $mail->Subject = $subject;

        // Prepare the message
        $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

       // Send the email
if ($mail->send()) {
  echo '<div style="background-color: #d4edda; color: #155724; padding: 10px; border: 1px solid #c3e6cb; border-radius: 5px;">Message has been sent successfully!</div>';
} else {
  echo '<div style="background-color: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 5px;">Message could not be sent.</div>';
}

  } catch (Exception $e) {
      echo "Mailer Error: {$mail->ErrorInfo}";
  }
}

