<script>
$(function() {
    $("#_signup, #_signin").click(() => {
        let visible = $(".wrap-login100:visible"),
            hidden = $(".wrap-login100:hidden");

        $(visible).slideToggle(400, () => {
            $(hidden).slideToggle();
        });
    });
    <?php
    if ( isset($msgReg)) {
    ?>
    $("#auth").hide();
    $("#reg").show();
    <?php
    }
    ?>

    $('#logout').click(e => {
        $('form[name=logout]').submit();
    });
});
</script>
<!-- LOGIN START -->
<script src="view/login/vendor/animsition/js/animsition.min.js"></script>
<script src="view/login/vendor/bootstrap/js/popper.js"></script>
<script src="view/login/vendor/bootstrap/js/bootstrap.min.js"></script>
<script src="view/login/vendor/select2/select2.min.js"></script>
<script src="view/login/vendor/daterangepicker/moment.min.js"></script>
<script src="view/login/vendor/daterangepicker/daterangepicker.js"></script>
<script src="view/login/vendor/countdowntime/countdowntime.js"></script>
<script src="view/login/js/main.js"></script>
<!-- LOGIN END -->
</body>
</html>