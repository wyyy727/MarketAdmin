
// 一是ready，表示文档结构已经加载完成（不包含图片等非文字媒体文件）
// 二是onload，指示页面包含图片等文件在内的所有元素都加载完成。
$(document).ready(function () {
    $('#side-menu').metisMenu();

    //左侧导航切换
    $('.toggle-minisize').click(function () {
        $('body').toggleClass("mini-navbar");
        SmoothlyMenu();
    });



    $(function () {
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9,
            alwaysVisible: false
        });
    });


    $('#side-menu > li').click(function () {
        if($('body').hasClass('mini-navbar')){
            NavToggle();
        }
    });



    // $('.full-height-scroll').slimScroll({
    //     height: '100%'
    // });

    var admin_name = get_cookie("admin_name");
    $('#usernow').html("您好" + admin_name +" ,欢迎登录！");
});




$(window).bind("load resize",function () {
    if($(this).width() < 769){
        $('body').addClass('mini-navbar');
        // $('.navbar-static-side').hide();
        $('.navbar-static-side').fadeIn();
    }
});

function SmoothlyMenu(){
    if(!$('body').hasClass('mini-navbar')){
        $('#side-menu').hide();
        setTimeout(function () {
            $('#side-menu').fadeIn(500);
        },100);
    }else if($('body').hasClass('fixed-sidebar')){
        $('#side-menu').hide();
        setTimeout(function () {
            $('#side-menu').fadeIn(500);
        },300);
    }else {
        $('#side-menu').removeAttr('style');
    }
}

function NavToggle() {
    $('.toggle-minisize').trigger('click');
}