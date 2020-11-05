<div class="limiter">
	<div class="container-login100" style="background-image: url('view/login/images/bg-01.jpg');">
<?php
if (!$user) {// если данных по юзеру нет нет - предложим залогиниться или зарегаться
	include ROOT.'/var/auth/signin.php';
	include ROOT.'/var/auth/signup.php';
} else if ( !isset($_GET['goo']) ) include ROOT.'/var/main.php';// если есть - отправим на главную
else include ROOT.'/var/goo.php';
?>
	</div>
</div>