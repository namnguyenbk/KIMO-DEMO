$(document).ready(function () {
    if (typeof (Storage) !== "undefined") {
        let userName = localStorage.getItem("userName");
        if (userName !== null) {
            updateUserBox(userName, '', 'logged');
        }
    } else {
    }
});
$('#avatarThumb').hide();
$("#loginBtn").click(function () {
    var phonenumber = $("#userName").val();
    var password = $("#password").val();
    if( phonenumber != ''){
        if(password != ''){
            login(phonenumber, password);
        }else{
            showDangerNotify('Bạn chưa nhập mật khẩu!');
        }
    }else{
        showDangerNotify('Bạn chư nhập số điện thoại!');
    }
    

});
$("#signupBtn").on('click', function (event) {
    var phonenumber = $("#userNameSignup").val();
    var password = $('#passwordSignup').val();
    var confirmPassword = $('#confirmPasswordSignup').val();
    // var fullName = $('#fullname').val();
    if( phonenumber == ''){
        showDangerNotify('Bạn chưa nhập số điện thoại!');
        return 0;
    }
    if(password == ''){
        showDangerNotify('Bạn chưa nhập mật khẩu!');
        return 0;
    }
    if(password !== confirmPassword){
        showDangerNotify('Mật khẩu không khớp!');
        return 0;
    }
    var dataMap = {
        'phonenumber': phonenumber,
        'password': password,
    }
    $.ajax({
        url: '/users/signUp',
        method: 'POST',
        dataType: 'json',
        data: dataMap,
        success: function (data) {
            // console.log("Nam");
            $('#eidtProfile').show();
            if (data['code'] == '1000') {
                showSuccessNotify("Chúc mừng đã trở thành thành viên của KIMO");
                $('#editProfile').modal('toggle');
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
    localStorage.removeItem("userId");
    localStorage.setItem('token');
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
                var user_id = data['id'];
                // $.ajax({
                //     url: '/users/get_user_info',
                //     method: 'POST',
                //     data: {
                //         user_id: user_id
                //     },
                //     success: (dataUserInfo) => {
                //         var fullname = dataUserInfo['firstname'] + ' ' + dataUserInfo['lastname'];
                //         showSuccessNotify("Xin chào" + fullname );
                //         updateUserBox(fullname, '', 'logged');
                //         localStorage.setItem('userID', data['id']);
                //         localStorage.setItem('token', data['token']);
                //         localStorage.setItem("userName", fullname);
                //     }
                // });
                showSuccessNotify("Xin chào" + fullname );
                        updateUserBox(fullname, '', 'logged');
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

// $.ajax({
//     url: '',
//     type: 'POST',
//     async: 'false',
//     success: function(data){
//         // getListProduct(data);
//     }
// });

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


function readURL(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#' + id).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#inputFile01").change(function () {
    $('#avatarThumb').show();
    readURL(this, 'avatarThumb');
});
var updateProfile = function () {
    
}