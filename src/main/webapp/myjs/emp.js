(function() {
    var admin_name = get_cookie("admin_name");
    if(admin_name  == "" || admin_name == undefined || admin_name.length <= 0){
        top.location.href = "zt_login.html";
    }
    $('#loadEmpInfoFromData').bootstrapTable({
        height:"69%",
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:URL + "/empinfoController/getAllEmpInfo.do",//要请求数据的文件路径
        onRefresh:function(){
            $('#toolbarEmpInfo').children('#btn_rate,#btn_delete').remove();
        },
        onSearch:function(){
            $('#toolbarEmpInfo').children('#btn_rate,#btn_delete').remove();
        },
        onPageChange:function(){
            $('#toolbarEmpInfo').children('#btn_rate,#btn_delete').remove();
        },
        onUncheck:function(){
            $('#toolbarEmpInfo').children('#btn_rate,#btn_delete').remove();
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
        toolbar: '#toolbarEmpInfo',//指定工具栏
        locale:'zh-CN',//中文支持
        singleSelect: true, //开启单选
        //onClickRow:rowClicked,
        onCheck:rowClicked,
        columns:[
            {
                checkbox: true
            },
            {
                title:'员工ID',
                field:'emp_no'
            },
            {
                title:'姓名',
                field:'emp_name',
            },
            {
                title:'性别',
                field:'emp_sex',
                formatter:operateFormatterStates
            },
            {
                title:'入职时间',
                field:'emp_joindate',
                formatter: function (value, row, index) {
                    return changeDateFormat(value)
                }
            },
            {
                title:'职位',
                field:'emp_duty',
            },
            {
                title:'出生时间',
                field:'emp_birthday',
                formatter: function (value, row, index) {
                    return changeDateFormat(value)
                }
            },
           /* {
                title:'部门ID',
                field:'emp_deptno',
            },*/
            {
                title:'手机号',
                field:'emp_phone',
            },
            {
                title:'邮箱',
                field:'emp_email',
            }],

        responseHandler:function(res){
            //在ajax获取到数据，渲染表格之前，修改数据源
            console.log(res);

            return res;
        }
    });
    function operateFormatterStates(value,row,index){
        if(value == 0){
            return '<span>男</span>';
        }else if(value == 1){
            return '<span>女</span>';
        }
    }
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

//=======================================日期格式转换
    function changeDateFormat(value) {
        if (value != null) {
            return formatTime(value, 'Y-M-D h:m:s');
        }
    }

    function formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    }

    function formatTime(number, format) {
        let time = new Date(number);
        let newArr = [];
        let formatArr = ['Y', 'M', 'D', 'h', 'm', 's'];
        newArr.push(time.getFullYear());
        newArr.push(formatNumber(time.getMonth() + 1));
        newArr.push(formatNumber(time.getDate()));

        newArr.push(formatNumber(time.getHours()));
        newArr.push(formatNumber(time.getMinutes()));
        newArr.push(formatNumber(time.getSeconds()));

        for (let i in newArr) {
            format = format.replace(formatArr[i], newArr[i])
        }
        return format;
    }


    var layer ;
    layui.use('layer', function(){
        layer = layui.layer;
    });


    // 添加渠道
    $('#btn_input').click(function () {
        $('#addEmpInfo').modal('show');

    });

    $('#addUser').on('shown.bs.modal', function (e) {
        $('#payType').empty();

        // 缺一不可
        $('#payType').selectpicker('refresh');
        $('#payType').selectpicker('render');

        $.post(URL + "/MCC/payType.do",
            function(resultJSONObject){
                if(resultJSONObject.status == "00"){

                    for(var i = 0; i < resultJSONObject.rows.length;i++){

                        $('#payType').append("<option value=" + resultJSONObject.rows[i].PW_ID + ">" + resultJSONObject.rows[i].PAY_NAME + "</option>");
                    }
                    // 缺一不可
                }else {

                }
                $('#payType').selectpicker('refresh');
                $('#payType').selectpicker('render');
            });

    });

    function rowClicked(){
        $('#toolbarEmpInfo').children('#btn_rate,#btn_delete').remove();
        var selectRows =  $('#loadEmpInfoFromData').bootstrapTable('getSelections');
        $('#toolbarEmpInfo').append('&nbsp;');
        $('#toolbarEmpInfo').append('<button id="btn_rate" type="button" class="btn btn-info" > <span class="fa fa-edit" aria-hidden="true"></span>信息修改</button>');
        $('#toolbarEmpInfo').append('&nbsp;');
        $('#toolbarEmpInfo').append('<button id="btn_delete" type="button" class="btn btn-danger" > <span class="fa fa-edit" aria-hidden="true"></span>删除员工</button>');

        $("#btn_delete").click(function () {
            var selectRows =  $('#loadEmpInfoFromData').bootstrapTable('getSelections');
            var empNo = selectRows[0].emp_no;
            alert(empNo)
            var isDel=confirm("确认删除吗")
            if(isDel) {
                $.post(URL + "/empinfoController/deleteEmpInfo.do",
                    {
                        id: empNo
                    }, function (resultJSONObject) {
                        var index;
                        if (resultJSONObject.status == "00") {
                            index = layer.msg(resultJSONObject.message, {
                                icon: 16
                                , shade: 0.6,
                                time: 2000
                            }, function () {
                                // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                                $('#loadEmpInfoFromData').bootstrapTable('refresh');
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

            var selectRows =  $('#loadEmpInfoFromData').bootstrapTable('getSelections');
            $('#rateModal').modal('show');
            var empNo = selectRows[0].emp_no;
            //alert(id)
            $.post(URL + "/empinfoController/getAllEmpInfoById.do",
                {
                    id:empNo
                },function(resultJSONObject){
                    console.log(resultJSONObject);
                    var index;
                    if(resultJSONObject.status == "00"){
                        var name = selectRows[0].emp_name;
                        alert(name)
                        $('#empNo').val(resultJSONObject.rows[0].emp_no);
                        $('#upName').val(resultJSONObject.rows[0].emp_name);
                        $('#upSex').val(resultJSONObject.rows[0].emp_sex);
                        $('#upJoin').val(resultJSONObject.rows[0].emp_joindate);
                        $('#upDuty').val(resultJSONObject.rows[0].emp_duty);
                        $('#upBirth').val(resultJSONObject.rows[0].emp_birthday);
                        $('#upPhone').val(resultJSONObject.rows[0].emp_phone);
                        $('#upEmail').val(resultJSONObject.rows[0].emp_email);
                    }

                });
        });
    }
})();

$('#changeSave').click(function () {
    var upName = $('#upName').val();
    var upSex =  $('#upSex').val();
    var upJoin = $('#upJoin').val();
    var upDuty=$('#upDuty').val();
    var upBirth=$('#upBirth').val();
    var upPhone=$('#upPhone').val();
    var upEmail=$('#upEmail').val();
    var empNo = $('#empNo').val();
    var isNumber=/^[0-9]{1,20}$/;
    if(upName == NaN || upName == "" || upName == undefined){
        var index;
        index = layer.msg('姓名为空', function(){
            layer.close(index);
        });
        return;
    }
    if(upDuty == NaN || upDuty == "" || upDuty == undefined){
        var index;
        index = layer.msg('职位为空', function(){
            layer.close(index);
        });
        return;
    }

    if(upPhone == NaN || upPhone.length < 0 || upPhone == undefined){
        var index;
        index = layer.msg('手机号为空', function(){
            layer.close(index);
        });
        return;
    }
    if(upEmail == NaN || upEmail.length < 0 || upEmail == undefined){
        var index;
        index = layer.msg('邮箱为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#rateModal').modal('hide');
    $.post(URL + "/empinfoController/updateEmpInfo.do",
        {
            upNames:upName,
            upSexs:upSex,
            upJoins:upJoin,
            upDutys:upDuty,
            upBirths:upBirth,
            upPhones:upPhone,
            upEmails:upEmail,
            empNos:empNo

        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadEmpInfoFromData').bootstrapTable('refresh');
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
    $('#upName').val(null);
    $('#upSex').val(null);
    $('#upJoin').val(null);
    $('#upDuty').val(null);
    $('#upBirth').val(null);
    $('#upPhone').val(null);
    $('#upEmail').val(null);

});


$('#addEmpInfoMessage').click(function () {
    var newName = $('#newName').val();
    var newSex =  $('#newSex').val();
    var newDuty = $('#newDuty').val();
    var newPhone = $('#newPhone').val();
    var newEmail = $('#newEmail').val();
    var newJoin = $('#newJoin').val();
    var newBirth = $('#newBirth').val();

    if(newName == NaN || newName == "" || newName == undefined){
        var index;
        index = layer.msg('员工姓名为空', function(){
            layer.close(index);
        });
        return;
    }
    if(newDuty == NaN || newDuty == "" || newDuty == undefined){
        var index;
        index = layer.msg('职位为空', function(){
            layer.close(index);
        });
        return;
    }
    if(newPhone == NaN || newPhone == undefined || newPhone == "" || newPhone.length < 0){
        var index;
        index = layer.msg('手机号码为空', function(){
            layer.close(index);
        });
        return;
    }
    if(newJoin == NaN || newJoin == undefined || newJoin == "" || newJoin.length < 0){
        var index;
        index = layer.msg('入职时间为空', function(){
            layer.close(index);
        });
        return;
    }
    if(newBirth == NaN || newBirth == undefined || newBirth == "" || newBirth.length < 0){
        var index;
        index = layer.msg('出生日期为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#addUser').modal('hide');
    $.post(URL + "/empinfoController/addEmpInfo.do",
        {
            newNames:newName,
            newSexs:newSex,
            newDutys:newDuty,
            newPhones:newPhone,
            newEmails:newEmail,
            newJoins:newJoin,
            newBirths:newBirth,
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadEmpInfoFromData').bootstrapTable('refresh');
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
    $('#newName').val(null);
    $('#newSex').val(null);
    $('#newDuty').val(null);
    $('#newPhone').val(null);
    $('#newEmail').val(null);
    $('#newJoin').val(null);
    $('#newBirth').val(null);
});








