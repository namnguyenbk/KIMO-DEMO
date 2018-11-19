$(document).ready(function () {
    if (typeof (Storage) !== "undefined") {
        let userName = localStorage.getItem("userName");
        if (userName !== null) {
            updateUserBox(userName, '', 'logged');
        }
    } else {
    }
});
$("#display").on("click", function (event) {
    $("#sidebar").hide();
});
$("#hide").on("click", function (event) {
    $("#sidebar").show();
});
$("#loginBtn").click(function () {
    var phonenumber = $("#userName").val();
    var password = $("#password").val();
    login(phonenumber, password);

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
        headers: {
            'Authorization': '',
        },
        method: 'POST',
        dataType: 'json',
        data: dataMap,
        success: function (data) {
            console.log("Nam");

            if (data['code'] == '1000') {
                showSuccessNotify("Chúc mừng" + fullname + "đã trở thành thành viên của KIMO");
                login(phonenumber, password);
            }
            else {
                if (data['code'] == '9996') {
                    showFailNotify("Tài khoản đã tồn tại, vui lòng dùng số điện thoại khác để đăng ký");
                } else {
                }
            }
        },
        error: function (data) {

        }
    });
});
$('#logoutBtn').on('click', function () {
    localStorage.removeItem("userName");
    updateUserBox(null, null, "logout");
    window.location.href = "/";
});
var login = (phonenumber, password) => {
    var dataMap = {
        'phonenumber': phonenumber,
        'password': password
    }
    $.ajax({
        url: '/users/signIn',
        method: 'POST',
        data: dataMap,
        success: function (data) {
            if (data['code'] == '1000') {
                showSuccessNotify("Xin chào" + data['fullname']);
                updateUserBox(data['fullname'], '', 'logged');
                localStorage.setItem('userID', data['id']);
                localStorage.setItem('token', data['token']);
                localStorage.setItem("userName", "Nguyen Danh Nam");
            }
            if (data['code'] == '9995') {
                showFailNotify('Tài khoản/ hoặc mật khẩu không chính xác!');
            }
        }
    });
}
var updateUserBox = (fullname, avatar, status) => {
    if (status == "logged") {
        $('#notLoginBtn').hide();
        $('#userBox').show('fast', () => {
            $('#userNameBox').html(fullname);
        });
    } else {
        $('#notLoginBtn').show();
        $('#userBox').hide();
    }

}

$.ajax({
    url: 'https://thongtindoanhnghiep.co/api/city',
    type: 'GET',
    async: 'false',
    success: function(data){
        getListProduct(data);
    }
});

var getListProduct = function (data) {
    var containerProduct = $('#containerProduct');
    var line = data['LtsItem'];
    line.sort(function (a,b) {
        if( a.SolrID > b.SolrID) return 1;
        if( a.SolrID < b.SolrID) return -1;
        return 0;
    });
    for (let i = 0; i < 63/3 ; i++) {
        for (let j = 1; j < 4; j++) {
            var item = line[i*j];
            var nameProduct = item.Title;
            var html = '<p class="text-success"> ' + nameProduct + '</p>';
            containerProduct.append(html);
        }
           
    }
}