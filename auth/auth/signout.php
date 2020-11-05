<?php
if ( isset($_POST['logout']) ) {
  setcookie("sess_id", "", time(), "/");
  exit( header("location: /") );
} else exit( header("location: /") );
?>