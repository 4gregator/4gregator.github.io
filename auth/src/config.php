<?php
	date_default_timezone_set('Europe/Moscow');
	setlocale(LC_ALL, 'ru_RU.UTF-8');
  header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Expires: " . date("r"));	
  ini_set('error_reporting', E_ERROR | E_WARNING);
  ini_set('magic_quotes_runtime', 0); 
  ini_set('magic_quotes_sybase', 0);

  $dsn = "mysql:host=localhost;dbname=cl50388_bd;charset=utf8";
  $opt = array(
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
  );
  
  $pdo = new PDO($dsn, "cl50388_bd", "31337", $opt);
  $pdo->exec('SET NAMES utf8;'); 
  $pdo->exec('SET sql_mode="";');
?>