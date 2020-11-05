<?php
// получение данных юзера из БД по куке
function user() {
    global $pdo;
    if ( isset($_COOKIE["sess_id"])) {
        $q = $pdo->prepare("SELECT * FROM users WHERE `_session_id` = ? LIMIT 1");
        $q->execute(array($_COOKIE["sess_id"]));
        $u = $q->fetch();
        return $u['_id'] ? $u : false;
    } else {
        return false;
    }
}

// фильтрация пользовательского ввода
function user_input($input) {
    $output = trim($input);
    $output = strip_tags($output);
    $output = htmlspecialchars($output);
    return $output;
}

// генерация рандомного набора символов
function generator($minchars=8, $maxchars=10, $chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz") {
    $escapecharplus = 0;
    $repeat = mt_rand($minchars, $maxchars);
    $randomword = '';
    while ( $escapecharplus < $repeat ) {
        $randomword .= $chars[mt_rand(1, strlen($chars)-1)];
        $escapecharplus += 1;
    }
    return $randomword;
}

// получение данных юзера по логину
function user_login($login) {
    global $pdo;

    $q = $pdo->prepare("SELECT * FROM users WHERE `_log` = ? LIMIT 1");
    $q->execute(array($login));
    $u = $q->fetch();
    return isset($u['_id']) ? $u : false;
}

// добавление нового юзера
function user_new($arr) {
    // $arr массив данных: логин, пароль
    global $pdo;

    $sess_id = md5(rand(1000,9999).generator(12,18));

    $arr[] = $sess_id;
      
    $q = $pdo->prepare("INSERT INTO users (`_log`,`_pas`,`_session_id`) VALUES (?,?,?)");
    $q->execute($arr);
}

// сохранение токена сессии
function user_session($id) {
    global $pdo;

    $sess_id = md5(rand(1000,9999).generator(12,18));

    $q = $pdo->prepare("UPDATE users SET `_session_id` = ? WHERE `_id` = ? LIMIT 1");
    $q->execute(array($sess_id,$id));

    setcookie("sess_id", $sess_id, time()+60*60*24, "/");
}

// изменение данных юзера
// 'pass' = изменение пароля, 'name' = изменение ФИО
function user_change($new_data, $id, $type) {
    global $pdo;
    
    if ($type == 'pass') $string = '_pas';
    if ($type == 'name') $string = '_name';
    $query = "UPDATE users SET " + $string + " = ? WHERE `_id` = ? LIMIT 1";
    $q = $pdo->prepare($query);
    $q->execute(array($new_data, $id));
}
?>