$("#login").click(function () {
    var AllValue = $('form').serialize();
    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: AllValue,
        success: function (data) {

        }
    });
})
