
var layer ;
layui.use('layer', function(){
    layer = layui.layer;
});

$('#submit').click(function () {
    var admin_name = $('#admin_name').val();
    var admin_password = $('#admin_password').val();
    if(admin_name == NaN  || admin_name == undefined || admin_name.length == 0){
        var index;
        index = layer.msg('请输入用户名', function(){
           layer.close(index);
          });
        return;
    }

    if(admin_password == NaN  || admin_password == undefined || admin_password.length == 0){
        var index;
        index = layer.msg('请输入用密码', function(){
            layer.close(index);
        });
        return;
    }


    $.post(URL + "/userController/checkLogin.do",
        {
            admin_name:admin_name,
            admin_password:admin_password,

        },function(resultJSONObject){
            // $.ajaxSettings.async = true;
            //alert(resultJSONObject.message);
            var index;
            if(resultJSONObject.status == "00"){
                set_cookie("admin_name",admin_name);// 设置cookie 1小时
//                alert(get_cookie("status"));
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    window.location.href = "index.html";
                });
            }else{
                layer.msg(resultJSONObject.message, {
                    icon: 9
                    ,shade: 0.6,
                    time: 2000
                });
            }

        });


});

//点击回车键登录
function keyLogin(){
    if (event.keyCode==13){  //回车键的键值为13
        var admin_name = $('#admin_name').val();
        var admin_password = $('#admin_password').val();
        if(admin_name == NaN  || admin_name == undefined || admin_name.length == 0){
            var index;
            index = layer.msg('请输入用户名', function(){
                layer.close(index);
            });
            return;
        }

        if(admin_password == NaN  || admin_password == undefined || admin_password.length == 0){
            var index;
            index = layer.msg('请输入用密码', function(){
                layer.close(index);
            });
            return;
        }


        $.post(URL + "/userController/checkLogin.do",
            {
                admin_name:admin_name,
                admin_password:admin_password,

            },function(resultJSONObject){
                // $.ajaxSettings.async = true;
                //alert(resultJSONObject.message);
                var index;
                if(resultJSONObject.status == "00"){
                    set_cookie("admin_name",admin_name);// 设置cookie 1小时
//                alert(get_cookie("status"));
                    index = layer.msg(resultJSONObject.message, {
                        icon: 16
                        ,shade: 0.6,
                        time: 2000
                    },function () {
                        window.location.href = "index.html";
                    });
                }else{
                    layer.msg(resultJSONObject.message, {
                        icon: 9
                        ,shade: 0.6,
                        time: 2000
                    });
                }

            });
    }
}





function set_cookie(key,val){//设置cookie方法
    var date=new Date(); //获取当前时间

    //date.setTime(date.getTime()+ time * 1000); //格式化为cookie识别的时间
    document.cookie=key + "=" + val ;  //设置cookie
}

function set_cookie_with_time(key,val,time){//设置cookie方法
    var date=new Date(); //获取当前时间

    date.setTime(date.getTime()+ time * 1000); //格式化为cookie识别的时间
    document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
}

