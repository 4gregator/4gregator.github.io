<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

define('ROOT', $_SERVER['DOCUMENT_ROOT']);

include_once ROOT.'/src/config.php' ;
include_once ROOT.'/src/functions.php';

// получим данные юзера (если он логинился)
$user = user();

ob_start();
// error_reporting(E_ALL);

include ROOT.'/var/header.php';
include ROOT.'/var/page.php';
include ROOT.'/var/footer.php';

$content = ob_get_contents();
ob_end_clean();
echo $content;
?>