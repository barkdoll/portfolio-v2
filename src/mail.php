<?php
  use PHPMailer\PHPMailer\PHPMailer;
  require '../phpmailer/src/PHPMailer.php';
  require '../phpmailer/src/Exception.php';
  require '../phpmailer/src/SMTP.php';
  require '../phpmailer/Config.php';


  $contact_name = $_POST['name'];
  if ($_POST['subject']) {
    $contact_subject = $_POST['subject'];
  } else {
    $contact_subject = 'Contact Form (jessebarkdoll.com)';
  }
  $contact_email = $_POST['email'];
  $contact_message = $_POST['message'];

  // PHPMailer Configuration
  $mail = new PHPMailer;
  $mail->isSMTP(true);

  // This is the code solution I needed because of an
  // error regarding stream_socket_enable_crypto() ???
  $mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
  );

  // To view error output logs for debugging
  // $mail->SMTPDebug = 4;


  $mail->Host = Config::SMTP_HOST;
  $mail->SMTPSecure = 'ssl';
  $mail->Port = Config::SMTP_PORT;
  $mail->SMTPAuth = true;
  $mail->Username = Config::SMTP_USER;
  $mail->Password = Config::SMTP_PASS;
  $mail->CharSet = 'UTF-8';

  // Send an email
  $mail->setFrom(Config::SMTP_USER, $contact_name);
  $mail->addAddress(Config::SMTP_USER);

  $mail->isHTML(true);
  $mail->Subject = $contact_subject . ' - ' . $contact_name;
  $mail->Body = '<h2 style="margin:5px 0 0"><span style="font-weight:normal">送信者： </span>' . $contact_name . '</h2><h2 style="margin:5px 0 0"><span style="font-weight:normal">メール： </span>' . $contact_email . '</h2><pre  style="font-family:\'Noto Sans\',\'Noto Sans CJK JP\',\'Helvetica\',\'Arial\',\'Meiryo\',sans-serif;font-size:16px">' . $contact_message . '</pre>';
  $mail->AltBody = 'From: ' . $contact_name . ' \nEmail: ' . $contact_email . ' \n\n' .$contact_message;
  // Optional attachment property
  // $mail->addAttachment(dirname(__FILE__) . '/example.pdf', 'sample.pdf');
?>


<!DOCTYPE html>
<html>
  <?php
  $page_title = 'Contact Jesse Barkdoll';
  include 'templates/head.php'; ?>
  <body style="padding: 10px">
    <?php
      // Uncomment the following line to check if ssl is loading and enabled
      // echo (extension_loaded('openssl')?'SSL loaded':'SSL not loaded')."<br />";
      if ($mail->send()) {
        echo '<h1>Message sent!</h1>';
      } else {
          echo '<h2 style="color:#800">Mailer error: ' . $mail->ErrorInfo . '</h2>';
      } ?>
      <br />
      <a href="index.php" style="font-size:1.3em;font-weight:bold;">Return to Jesse's awesome website</a>
  </body>
</html>
