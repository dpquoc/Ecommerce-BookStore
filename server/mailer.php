<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function sendEmail($to, $subject, $body) {
    $mail = new PHPMailer(true); // Enable verbose debug output

    try {
       //Server settings
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                        //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'your-email@exmaple.com';                         //SMTP username (your Gmail address)
        $mail->Password   = 'your-password';                    //SMTP password (your Gmail password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;          //Enable TLS encryption
        $mail->Port       = 587;                                    //TCP port to connect to

        //Recipients
        $mail->setFrom('your-email@exmaple.com', 'BookStore');          //Set the sender of the email
        $mail->addAddress($to);

        //Content
        $mail->isHTML(true);                                        //Set email format to HTML
        $mail->Subject = $subject;                                  //Set the subject of the email
        $mail->Body    = $body;                                     //Set the HTML message body

        $mail->send();
        return true;                                                //Return true if email sending is successful
    } catch (Exception $e) {
        error_log("Mailer Error: {$mail->ErrorInfo}");
        return false;                                               //Return false if email sending fails
    }
}
