
$.ajax({
    url: 'https://thongtindoanhnghiep.co/api/city',
    type: 'GET',
    async: 'false',
    data: {
        
    },
    success: function(data){
        
    }
});

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
    readURL(this, 'image1');
});
$("#inputFile02").change(function () {
    readURL(this, 'image2');
});
$("#inputFile03").change(function () {
    readURL(this, 'image3');
});
$("#inputFile04").change(function () {
    readURL(this, 'image4');
});

$('#addProductBtn').on('click', (event) => {
    var productName = $('#productName').val();
    var fullAddrId = [];
    if (productName == "") {
        showDangerNotify(" Bạn chưa nhập tên sản phẩm");
        return 0;
    }
    var cateName = $('#cateName').val();
    var price = $('#price').val();
    if (price == "") {
        showDangerNotify(" Bạn chưa nhập giá sản phẩm");
        return 0;
    }
    if (price < 0) {
        showDangerNotify(" Giá sản phẩm không hợp lệ");
        return 0;
    }
    var categoryId = $('#categoryId').val();
    if (categoryId == "0") {
        showDangerNotify(" Bạn chưa nhập loại sản phẩm");
        return 0;
    }
    var detailAddr = $('#detailAddr').val();
    if (detailAddr == "0") detailAddr = " ";
    var commune = $('#commune').val();
    if (commune == "") {
        showDangerNotify(" Bạn chưa nhập đủ địa chỉ");
        return 0;
    }
    fullAddrId.push(commune);
    var district = $('#district').val();
    if (district == "0") {
        showDangerNotify(" Bạn chưa nhập đủ địa chỉ");
        return 0;
    }
    fullAddrId.push(district);
    var province = $('#province').val();
    if (province == "0") {
        showDangerNotify(" Bạn chưa nhập đủ địa chỉ");
        return 0;
    }
    fullAddrId.push(province);
    var fullAddr = detailAddr + ', ' + commune + ', ' + district + ', ' + province;
    $.ajax({
        url: 'product/addProduct',
        type: 'POST',
        async: 'false',
        data: {
            'name': productName,
            'price': price,
            'price_new': price,
            'category_id': categoryId,
            'ships_from': fullAddr,
            'ships_from_id': fullAddrId,
            'condition': '0',
        },
        success: function(data){
            if( data['code'] == '1000'){
                showSuccessNotify('Đăng sản phẩm thành công!');
            }elseƠ
            showFailNotify('Không thể đăng sản phẩm!');
        }
    });

});

var getProduct = () =>{
    
}
var uploadImageProduct = function (idInput) {
    formdata = new FormData();
    var file = $('#' + idInput).files[0];
    if (formdata) {
        formdata.append("image1", file);
        $.ajax({
            url: "",
            type: "POST",
            header: {
                'Author': ''
            },
            data: {

            },
            processData: false,
            contentType: false,
            success: function () {

            }
        });
    }
}