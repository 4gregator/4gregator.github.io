<?php
include ROOT.'/auth/signup.php';
?>

<div id="reg" class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54" style="display:none;">
	<form class="login100-form validate-form" method="POST" name="reg" action="" autocomplete="off">
		<span class="login100-form-title p-b-49">
			Sign Up
		</span>

		<div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
			<span class="label-input100">Username</span>
			<input class="input100" type="text" name="r_login" placeholder="Type your username" autocomplete="off">
			<span class="focus-input100" data-symbol="&#xf206;"></span>
		</div>

		<div class="wrap-input100 validate-input" data-validate="Password is required">
			<span class="label-input100">Password</span>
			<input class="input100" type="password" name="r_password" placeholder="Type your password">
			<span class="focus-input100" data-symbol="&#xf190;"></span>
		</div>

		<input type="hidden" name="reg">
		<p style="color:red;"><?=$msgReg?></p>
		
		<div class="container-login100-form-btn">
			<div class="wrap-login100-form-btn mt-5">
				<div class="login100-form-bgbtn"></div>
				<button class="login100-form-btn">
					Sign Up
				</button>
			</div>
		</div>

		<div class="flex-col-c p-t-155">
			<span class="txt1 p-b-17">
				Or Sign In
			</span>

			<a id="_signin" href="javascript:void(0);" class="txt2">
				Sign In
			</a>
		</div>
	</form>
</div>