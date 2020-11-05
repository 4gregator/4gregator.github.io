<?php
include ROOT.'/auth/signin.php';
?>

<div id="auth" class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
	<form class="login100-form validate-form" method="POST" name="auth" action="" autocomplete="off">
		<span class="login100-form-title p-b-49">
			Sign In
		</span>

		<div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
			<span class="label-input100">Username</span>
			<input class="input100" type="text" name="_login" placeholder="Type your username" autocomplete="off"
			<?php
				if (isset($log)) echo 'value="'.$log.'"';
			?>
			>
			<span class="focus-input100" data-symbol="&#xf206;"></span>
		</div>

		<div class="wrap-input100 validate-input" data-validate="Password is required">
			<span class="label-input100">Password</span>
			<input class="input100" type="password" name="_password" placeholder="Type your password">
			<span class="focus-input100" data-symbol="&#xf190;"></span>
		</div>

		<input type="hidden" name="auth">
		<p style="color:red;"><?=$msgAuth?></p>
		
		<div class="text-right p-t-8 p-b-31">
			<a href="#">
				Forgot password?
			</a>
		</div>
		
		<div class="container-login100-form-btn">
			<div class="wrap-login100-form-btn">
				<div class="login100-form-bgbtn"></div>
				<button class="login100-form-btn">
					Sign In
				</button>
			</div>
		</div>

		<div class="txt1 text-center p-t-54 p-b-20">
			<span>
				Or Sign Up Using
			</span>
		</div>

		<div class="flex-c-m">
			<a href="#" class="login100-social-item bg1">
				<i class="fa fa-facebook"></i>
			</a>

			<a href="#" class="login100-social-item bg2">
				<i class="fa fa-twitter"></i>
			</a>

			<a href="#" class="login100-social-item bg3">
				<i class="fa fa-google"></i>
			</a>
		</div>

		<div class="flex-col-c p-t-155">
			<span class="txt1 p-b-17">
				Or Sign Up Using
			</span>

			<a id="_signup" href="javascript:void(0);" class="txt2">
				Sign Up
			</a>
		</div>
	</form>
</div>