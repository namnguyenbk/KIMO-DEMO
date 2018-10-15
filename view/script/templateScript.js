$("#display").on("click", function (event) {
    $("#sidebar").hide();
});
$("#hide").on("click", function (event) {
    $("#sidebar").show();
});
$("#loginBtn").click(function () {
    var phonenumber = $("#userName").val();
    var password = $("#password").val();
    var dataMap = {
        'phonenumber': phonenumber,
        'password': password
    }
    $.ajax({
        url: '/users/signIn',
        headers: {
            'jwt_key': 'vlxx.tv',
        },
        method: 'POST',
        data: dataMap,
        success: function (data) {
            if (data['code'] == '9996') {
                
            }
            showSuccessNotify("Xin chào" + data['fullname']);
            updateUserBox(data['fullname'], '', 'logged')
        }
    });
});
$("#signupBtn").on('click', function (event) {
    var phonenumber = $("#userNameSignup").val();
    var password = $('#passwordSignup').val();
    var fullName = $('#fullname').val();
    var dataMap = {
        'phonenumber': phonenumber,
        'password': password,
    }
    $.ajax({
        url: '/users/signUp',
        method: 'POST',
        dataType :'json',
        data: dataMap,
        success: function (data) {
            console.log("Nam");
            
            if (data['code'] == '1000') {
                showSuccessNotify("Chúc mừng" + fullname + "đã trở thành thành viên của KIMO");
                updateUserBox(fullName, ' ', 'logged');
            }
            else {
                if (data['code'] == '9996') {
                    showFailNotify("Tài khoản đã tồn tại, vui lòng dùng số điện thoại khác để đăng ký");
                }
            }
        },
        error: function ( data) {
            
        }
    });
});
$('#logoutBtn').on('click', function () {
    
});
var updateUserBox = (fullname, avatar, status) => {
    if (status == "logged") {
        $('#notLoginBtn').hide();
        $('#userBox').show('fast', fullname => {
            $('userNameBox').html = fullname;
        });
    } else {
        $('#notLoginBtn').show();
        $('#userBox').hide();
    }

}