new WOW().init();
        $(document).ready(function () {
            if (typeof (Storage) !== "undefined") {
                let userName = localStorage.getItem("userName");
                if (userName !== null) {
                    updateUserBox(userName, '', 'logged');
                }
            } else {
            }
        });
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

        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Áo thun", "Áo sơ mi", "Áo khoác", "Áo dài tay", "Giày,dép", "Đồ lót, đồ bơi", 'Mũ nón', 'Quần bò', 'Quần short', 'Quần vải', 'Veston', 'Váy', 'Phụ kiện'],
                datasets: [{
                    label: '# số lượng ',
                    data: [12, 19, 3, 5, 2, 3, 24, 12, 3, 5, 6, 7, 8, 9],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        var ctxP = document.getElementById("pieChart").getContext('2d');
        var myPieChart = new Chart(ctxP, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [300, 50, 100, 40, 120],
                    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                }]
            },
            options: {
                responsive: true
            }
        });

        // Initialize maps

        var mainMenu = $('#main');
        var productMenu = $('#product');
        var profileMenu = $('#profile');
        var mainView = $('#mainView');
        var productView = $('#productView');
        var profileView = $('#profileView');
        productView.addClass("d-none");
        profileView.addClass("d-none");
        mainMenu.on( "click", () =>{
            if(!mainMenu.hasClass('active')){
                mainMenu.addClass("active");
            }
            if(mainView.hasClass('d-none')){
                mainView.removeClass("d-none");
            }

            if(!productView.hasClass('d-none')){
                productView.addClass("d-none");
            }
            if(productMenu.hasClass('active')){
                productMenu.removeClass("active");
            }

            if(!profileView.hasClass('d-none')){
                profileView.addClass("d-none");
            }
            if(profileMenu.hasClass('active')){
                profileMenu.removeClass("active");
            }
            
        });
        productMenu.on('click', () =>{
            if (!productMenu.hasClass('active')) {
                productMenu.addClass('active');
            }
            if (productView.hasClass('d-none')) {
                productView.removeClass('d-none');
            }

            if(!mainView.hasClass('d-none')){
                mainView.addClass("d-none");
            }
            if(mainMenu.hasClass('active')){
                mainMenu.removeClass('active');
            }

            if(!profileView.hasClass('d-none')){
                profileView.addClass("d-none");
            }
            if(profileMenu.hasClass('active')){
                profileMenu.removeClass("active");
            }
        });

        profileMenu.on('click', () =>{
            if(!profileMenu.hasClass('active')){
                profileMenu.addClass("active");
            }
            if(profileView.hasClass('d-none')){
                profileView.removeClass('d-none');
            }

            if(!productView.hasClass('d-none')){
                productView.addClass("d-none");
            }
            if(productMenu.hasClass('active')){
                productMenu.removeClass("active");
            }

            if(!mainView.hasClass('d-none')){
                mainView.addClass("d-none");
            }
            if(mainMenu.hasClass('active')){
                mainMenu.removeClass('active');
            }
        });