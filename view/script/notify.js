var showSuccessNotify = message => {
    $.notify({
        title: '<strong> Thành công </strong>',
        message: message,
    },{
        type: 'success'
    });
}
var showFailNotify =  message => {
    $.notify({
        title: '<strong>Thất bại</strong>',
        message: message,
    },{
        type: 'danger'
    });
}

var showDangerNotify = message => {
    $.notify({
        title: '<strong>Cảnh báo! </strong>',
        message: message,
        
    },{
        type: 'warning',
        placement : {
            from: 'bottom',
        align: 'right'
        }
    });
   
}