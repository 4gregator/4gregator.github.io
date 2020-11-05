<?php
require './PHPMailer.php';
require './SMTP.php';
require './Exception.php';

/* ДАННЫЕ ДЛЯ ОТПРАВКИ ПОЧТЫ */
$mailto = '';// куда присылать письмо
$mymail = '';// логин почты
$mymail_pass = '';// пароль почты
$mymail_smptp = 'smtp.yandex.ru';// ТОЛЬКО для яндекс.почты

$tel = user_input($_POST['tel']);
$pattern = '/[^+\(\)\-\s\d]/';
$rep = preg_replace($pattern,'', $tel);

$title = "Заказ обратного звонка";
$body = "
<h1>Запрос обратного звонка</h1>
<b>Телефон отправителя:</b> $tel<br><br>
";

$mail = new PHPMailer\PHPMailer\PHPMailer();
/*try {
  $mail->isSMTP();   
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
  $mail->Host       = $mymail_smptp;
  $mail->Username   = $mymail;
  $mail->Password   = $mymail_pass;
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->setFrom($mymail, 'Почта-бот');
  $mail->addAddress($mailto);
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  if ($mail->send()) {$result = "success";} 
  else {$result = "error";}
} catch (Exception $e) {
  $result = "error";
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}*/
if (strlen($rep) == 18) {
  $result = "success";
  $status = 200;
} else {
  $result = "error";
  $status = 400;
}
echo json_encode(["result" => $result, "status" => $status]);

// фильтрация пользовательского ввода
function user_input($input) {
  $output = trim($input);
  $output = strip_tags($output);
  $output = htmlspecialchars($output);
  return $output;
}
?>