<?php
$msgAuth = NULL;
$log = NULL;
//сначала проверим логин
if ( isset($_POST['auth']) ) {
	if ( isset($_POST['_login']) ) {
		$login = user_input($_POST['_login']);

		$u = user_login($login);
	} else $msgAuth = 'Что-то пошло не так, попробуйте ещё раз...';

	if ($u === false) $msgAuth = 'ОШИБКА! Пользователь не существует!';
	else {// пользователь найден, проверим пароль
		if ( isset($_POST['_password']) ) {
			$sha_pass = sha1( user_input($_POST['_password']) );
			
			if ($sha_pass == $u['_pas']) {//пароль верный, сохраним токен сессии
				user_session($u['_id']);

				exit( header("Location: /") );
			} else {
				$msgAuth = 'ОШИБКА! Введен неверный пароль!';
				$log = $login;
			}
		} else $msgAuth = 'Что-то пошло не так, попробуйте ещё раз...';
	}
}
?>