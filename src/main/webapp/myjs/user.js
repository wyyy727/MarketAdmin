(function() {
    var admin_name = get_cookie("admin_name");
    if(admin_name  == "" || admin_name == undefined || admin_name.length <= 0){
        top.location.href = "zt_login.html";
    }
    $('#loadUserFromData').bootstrapTable({
        height:"69%",
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:URL + "/userController/getAll.do",//要请求数据的文件路径
        onRefresh:function(){
            $('#toolbarUser').children('#btn_rate,#btn_delete').remove();
        },
        onSearch:function(){
            $('#toolbarUser').children('#btn_rate,#btn_delete').remove();
        },
        onPageChange:function(){
            $('#toolbarUser').children('#btn_rate,#btn_delete').remove();
        },
        onUncheck:function(){
            $('#toolbarUser').children('#btn_rate,#btn_delete').remove();
        },
        striped: true, //是否显示行间隔色
        dataField: "rows",//bootstrap table 可以前端分页也可以后端分页，这里
        //我们使用的是后端分页，后端分页时需返回含有total：总记录数,这个键值好像是固定的
        //rows： 记录集合 键值可以修改  dataField 自己定义成自己想要的就好
        pageNumber: 1, //初始化加载第一页，默认第一页
        pagination:true,//是否分页
        queryParamsType:'limit',//查询参数组织方式
        sidePagination:'server',//指定服务器端分页
        queryParams:queryParams,//请求服务器时所传的参数
        pageSize:10,//单页记录数
        pageList:[5,10,20,30],//分页步进值
        showRefresh:true,//刷新按钮
        showColumns:true,
        search:true,
        clickToSelect: true,//是否启用点击选中行
        toolbar: '#toolbarUser',//指定工具栏
        locale:'zh-CN',//中文支持
        singleSelect: true, //开启单选
        //onClickRow:rowClicked,
        onCheck:rowClicked,
        columns:[
            {
                checkbox: true
            },
            {
                title:'ID',
                field:'user_id'
            },
            {
                title:'账户名',
                field:'user_name',
            },
            {
                title:'密码',
                field:'user_pwd',
            },
            {
                title:'真实姓名',
                field:'user_realname',
            },
            {
                title:'用户权限',
                field:'user_power',
                formatter:operateFormatterState
            }],

        responseHandler:function(res){
            //在ajax获取到数据，渲染表格之前，修改数据源
            console.log(res);

            return res;
        }
    });

    //请求服务数据时所传参数
    function queryParams(params){
        return{
            //每页多少条数据
            pageSize: params.limit,
            //请求第几页
            colOffset:params.offset,
            search: params.search
        }
    }

    function operateFormatterState(value,row,index){
        if(value == 1){
            return '<span style="color:#24ff13">超级用户</span>';
        }else if(value == 0){
            return '<span style="color:#ff2d3b">普通用户</span>';
        }
    }

    var layer ;
    layui.use('layer', function(){
        layer = layui.layer;
    });


    // 添加渠道
    $('#btn_input').click(function () {
        $('#addUser').modal('show');

    });

    $('#addUser').on('shown.bs.modal', function (e) {
        $('#addPerson').empty();

        // 缺一不可
        $('#addPerson').selectpicker('refresh');
        $('#addPerson').selectpicker('render');

        $.post(URL + "/chuku/getEmpName.do",
            function(resultJSONObject){
                if(resultJSONObject.status == "00"){

                    for(var i = 0; i < resultJSONObject.rows.length;i++){

                        $('#addPerson').append("<option value=" + resultJSONObject.rows[i].emp_no + ">" + resultJSONObject.rows[i].emp_name + "</option>");
                    }
                    // 缺一不可
                }else {

                }
                $('#addPerson').selectpicker('refresh');
                $('#addPerson').selectpicker('render');
            });

    });

    function rowClicked(){
        $('#toolbarUser').children('#btn_rate,#btn_delete').remove();
        var selectRows =  $('#loadUserFromData').bootstrapTable('getSelections');
        $('#toolbarUser').append('&nbsp;');
        $('#toolbarUser').append('<button id="btn_rate" type="button" class="btn btn-info" > <span class="fa fa-edit" aria-hidden="true"></span>信息修改</button>');
        $('#toolbarUser').append('&nbsp;');
        $('#toolbarUser').append('<button id="btn_delete" type="button" class="btn btn-danger" > <span class="fa fa-edit" aria-hidden="true"></span>删除用户</button>');

        $("#btn_delete").click(function () {
            var selectRows =  $('#loadUserFromData').bootstrapTable('getSelections');
            var userId = selectRows[0].user_id;
            alert(userId)
            var isDel=confirm("确认删除吗")
            if(isDel) {
                $.post(URL + "/userController/delUser.do",
                    {
                        userId: userId
                    }, function (resultJSONObject) {
                        var index;
                        if (resultJSONObject.status == "00") {
                            index = layer.msg(resultJSONObject.message, {
                                icon: 16
                                , shade: 0.6,
                                time: 2000
                            }, function () {
                                // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                                $('#loadPassWayFromData').bootstrapTable('refresh');
                                //$('#terminalTableFromData').bootstrapTable({
                                layer.close(index);
                            });
                        } else {
                            layer.msg(resultJSONObject.message, {
                                icon: 9
                                , shade: 0.6,
                                time: 2000
                            });
                        }

                    });
            }
        });

        $('#btn_rate').click(function () {

            var selectRows =  $('#loadUserFromData').bootstrapTable('getSelections');
            $('#rateModal').modal('show');
            var id = selectRows[0].user_id;
            //alert(id)
            $.post(URL + "/userController/loadUserByid.do",
                {
                    id:id
                },function(resultJSONObject){
                    console.log(resultJSONObject);
                    var index;
                    if(resultJSONObject.status == "00"){
                        var name = selectRows[0].user_name;
                        //alert(name)
                       $('#rateValue2').val(resultJSONObject.rows[0].user_id);
                        $('#upPow').val(resultJSONObject.rows[0].user_power);
                        $('#upReal').val(resultJSONObject.rows[0].user_realname);
                        $('#upName').val(resultJSONObject.rows[0].user_name);
                        $('#upPwd').val(resultJSONObject.rows[0].user_pwd);
                        $('#end2').val(resultJSONObject.rows[0].emp_id);
                    }

                });
        });
    }
})();

$('#changeSave').click(function () {
    var upName = $('#upName').val();
    var upPwd =  $('#upPwd').val();
    var upReal = $('#upReal').val();
    var upPow=$('#upPow').val();
    var empId=$('#end2').val();
    var upNo=$('#rateValue2').val();
    var isNumber=/^[0-9]{1,20}$/;
   /* if(upPwd.exec(isNumber)){
        var index;
        index = layer.msg('您的密码全有数字组成，请重试', function(){
            layer.close(index);
        });
        return;
    }*/

    if(upName == NaN || upName == "" || upName == undefined){
        var index;
        index = layer.msg('账户名称为空', function(){
            layer.close(index);
        });
        return;
    }
    if(upPwd == NaN || upPwd == "" || upPwd == undefined){
        var index;
        index = layer.msg('密码为空', function(){
            layer.close(index);
        });
        return;
    }
    if(upPow == NaN || upPow.length < 0 || upPow == undefined){
        var index;
        index = layer.msg('真实姓名为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#rateModal').modal('hide');
    $.post(URL + "/userController/upUserMessage.do",
        {
            upName:upName,
            uppPwd:upPwd,
            uppReal:upReal,
            uppPow:upPow,
            empId:empId,
            upNo:upNo,

        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadUserFromData').bootstrapTable('refresh');
                    layer.close(index);
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

$('#rateModal').on('hidden.bs.modal', function (e) {
    $('#rateValue2').val(null);
    $('#upName').val(null);
    $('#upPwd').val(null);
    $('#upReal').val(null);
    $('#upPow').val(null);
});


$('#addUserMessage').click(function () {

    var addName = $('#addName').val();
    var addPwd =  $('#addPwd').val();
    var addReal = $('#addPerson').find("option:selected").text();
    var addPow=$('#addPow').val();
    var addPerson = $('#addPerson').val();
    var addRePwd = $('#addRePwd').val();

    if(addName == NaN || addName == "" || addName == undefined){
        var index;
        index = layer.msg('账户名称为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addPwd == NaN || addPwd == "" || addPwd == undefined){
        var index;
        index = layer.msg('密码为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addReal == NaN || addReal.length < 0 || addReal == undefined){
        var index;
        index = layer.msg('真实姓名为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addPwd != addRePwd){
        var index;
        index = layer.msg('两次输入密码不一致', function(){
            layer.close(index);
        });
        return;
    }
    if(addPerson == NaN || addPerson == undefined || addPerson == "" || addPerson.length < 0){
        var index;
        index = layer.msg('员工为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#addUser').modal('hide');
    $.post(URL + "/userController/addUserMessage.do",
        {
            adName:addName,
            adPwd:addPwd,
            adReal:addReal,
            adPow:addPow,
            adEmpNo:addPerson,
            adRePwd:addRePwd,
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadUserFromData').bootstrapTable('refresh');
                    layer.close(index);
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

$('#addUser').on('hidden.bs.modal', function (e) {
    $('#upStreamDefinition').val(null);
    $('#upStreamIp').val(null);
    $('#upStreamPort').val(null);
    $('#upNo').val(null);
    $('#rateValue').val(null);
    $('#min').val(null);
    $('#max').val(null);
    $('#tradfee').val(null);
});








