(function() {
    var admin_name = get_cookie("admin_name");
    if(admin_name  === "" || admin_name === undefined || admin_name.length <= 0){
        top.location.href = "zt_login.html";
    }
    $('#loadProviderFromData').bootstrapTable({
        height:"69%",
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:URL + "/providerController/getAllProviderInfo.do",//要请求数据的文件路径
        onRefresh:function(){
            $('#toolbarProvider').children('#btn_rate,#btn_delete').remove();
        },
        onSearch:function(){
            $('#toolbarProvider').children('#btn_rate,#btn_delete').remove();
        },
        onPageChange:function(){
            $('#toolbarProvider').children('#btn_rate,#btn_delete').remove();
        },
        onUncheck:function(){
            $('#toolbarProvider').children('#btn_rate,#btn_delete').remove();
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
        toolbar: '#toolbarProvider',//指定工具栏
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
                field:'pro_id'
            },
            {
                title:'供应商名称',
                field:'pro_name',
            },
            {
                title:'供应商联系人',
                field:'prov_contame',
            },
            {
                title:'创建日期',
                field:'pro_date'
            },
            {
                title:'联系方式',
                field:'pro_phone'
            },
            {
                title:'邮箱',
                field:'pro_email'
            },
            {
                title:'地址',
                field:'pro_address'
            },
            {
                title:'状态',
                field:'pro_state',
                formatter:operateFormatterState
            },
            {
                title:'备注',
                field:'pro_remark',
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
            return '<span style="color:#24ff13">启用</span>';
        }else if(value == 0){
            return '<span style="color:#ff2d3b">不启用</span>';
        }
    }

    var layer ;
    layui.use('layer', function(){
        layer = layui.layer;
    });


    // 添加渠道
    $('#btn_input').click(function () {
        $('#addProvider').modal('show');

    });

    $('#addProvider').on('shown.bs.modal', function (e) {
        $('province').empty();

        // 缺一不可
        $('#province').selectpicker('refresh');
        $('#province').selectpicker('render');

        $.post(URL + "/providerController/provinces.do",
            function(resultJSONObject){
            console.log(resultJSONObject)
                if(resultJSONObject.status === "01"){

                    for(var i = 0; i < resultJSONObject.rows.length;i++){

                        $('#province').append("<option value=" + resultJSONObject.rows[i].provinceID + ">" + resultJSONObject.rows[i].province + "</option>");
                    }
                    // 缺一不可
                }else {

                }
                $('#province').selectpicker('refresh');
                $('#province').selectpicker('render');
            });

    });

    function rowClicked(){
        $('#toolbarProvider').children('#btn_rate,#btn_delete').remove();
        var selectRows =  $('#loadProviderFromData').bootstrapTable('getSelections');
        $('#toolbarProvider').append('<button id="btn_rate" type="button" class="btn btn-info" > <span class="fa fa-edit" aria-hidden="true"></span>信息修改</button>');

        $('#toolbarProvider').append('<button id="btn_delete" type="button" class="btn btn-danger" > <span class="fa fa-edit" aria-hidden="true"></span>删除</button>');

        $("#btn_delete").click(function () {
            var selectRows =  $('#loadProviderFromData').bootstrapTable('getSelections');
            var ftId = selectRows[0].pro_id;
            var isDel=confirm('确定删除吗?')
            if(isDel){
            $.post(URL + "/providerController/deleteProvider.do",
                {
                    id:ftId
                },function(resultJSONObject){
                    var index;
                    if(resultJSONObject.status == "00"){
                        index = layer.msg(resultJSONObject.message, {
                            icon: 16
                            ,shade: 0.6,
                            time: 2000
                        },function () {
                            // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                            $('#loadProviderFromData').bootstrapTable('refresh');
                            //$('#terminalTableFromData').bootstrapTable({
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
            }
        });
        $('#btn_rate').click(function () {

            var selectRows =  $('#loadProviderFromData').bootstrapTable('getSelections');
            $('#rateModal').modal('show');
            var id = selectRows[0].pro_id;
            //alert(id)
            $.post(URL + "/providerController/getProviderById.do",
                {
                    id:id
                },function(resultJSONObject){
                    console.log(resultJSONObject);
                    var index;
                    if(resultJSONObject.status === "00"){
                        var name = selectRows[0].pro_name;
                        //alert(name)
                       $('#upProId').val(resultJSONObject.rows[0].pro_id);
                        $('#upProName').val(resultJSONObject.rows[0].pro_name);
                        $('#upContName').val(resultJSONObject.rows[0].prov_contame);
                        $('#upDate').val(resultJSONObject.rows[0].pro_date);
                        $('#upPhone').val(resultJSONObject.rows[0].pro_phone);
                        $('#upEmail').val(resultJSONObject.rows[0].pro_email);
                        $('#upaddress').val(resultJSONObject.rows[0].pro_address);
                        $('#upState').val(resultJSONObject.rows[0].pro_state);
                        $('#upRemark').val(resultJSONObject.rows[0].pro_remark);
                    }

                });
        });
    }
})();

$('#changeSave').click(function () {
    var upProIds = $('#upProId').val();
    var upProNames =  $('#upProName').val();
    var upContNames = $('#upContName').val();
    var upDates=$('#upDate').val();
    var upPhones = $('#upPhone').val();
    var upEmails = $('#upEmail').val();
    var upAddress=$('#upaddress').val();
    var upStates = $('#upState').val();
    var upRemarks = $('#upRemark').val();
    var isPhone=[/^1[3|4|5|7|8]\d{9}$/]
    //var upStateValue = $('#upState').find("option:selected").text();
    console.log(upProNames === "" +"``")
    if(isNaN(upProNames) || upProNames === "" || upProNames === undefined){
        var index;
        index = layer.msg('供应商名称为空', function(){
            layer.close(index);
        });
        return;
    }
    if(isNaN(upContNames) || upContNames === "" || upContNames === undefined){
        var index;
        index = layer.msg('联系人为空', function(){
            layer.close(index);
        });
        return;
    }
    if(isNaN(upPhones)){
        var index;
        index = layer.msg('手机号码为空', function(){
            layer.close(index);
        });
        return;
    }
    if( upEmails === null || upEmails === "" ){
        var index;
        index = layer.msg('邮箱为空', function(){
            layer.close(index);
        });
        return;
    }
    /*if(isNaN(upAddress) || upAddress === null){
        var index;
        index = layer.msg('地址为空', function(){
            layer.close(index);
        });
        return;
    }*/
    if(isNaN(upRemarks) || upRemarks === undefined || upRemarks === "" || upRemarks.length < 0){
        var index;
        index = layer.msg('备注为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#rateModal').modal('hide');
    $.post(URL + "/providerController/updateProvider.do",
        {
            upProId:upProIds,
            upProName:upProNames,
            upContName:upContNames,
            upDate:upDates,
            upPhone:upPhones,
            upEmail:upEmails,
            upaddress:upAddress,
            upState:upStates,
            upRemark:upRemarks,
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadProviderFromData').bootstrapTable('refresh');
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
    $('#upProId').val(null);
    $('#upProName').val(null);
    $('#upContName').val(null);
    $('#upDate').val(null);
    $('#upPhone').val(null);
    $('#upEmail').val(null);
    $('#upaddress').val(null);
    $('#upState').val(null);
    $('#upRemark').val(null);
});


$('#addProviderMessage').click(function () {
    var addProNames =  $('#addProName').val();
    var addContNames = $('#addContName').val();
    var addPhones = $('#addPhone').val();
    var addEmails = $('#addEmail').val();
    var addresss = $('#address').val();
    var addDates = $('#addDate').val();
    //var addStates = $('#addState').val();
    var addRemarks = $('#addRemark').val();
    var provinces = $('#province').find("option:selected").text();
    var citys = $('#city').find("option:selected").text();
    if(addProNames == NaN || addProNames == "" || addProNames == undefined){
        var index;
        index = layer.msg('供应商名称为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addContNames == NaN || addContNames == "" || addContNames == undefined){
        var index;
        index = layer.msg('联系人为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addPhones == NaN || addPhones.length < 0 || addPhones == undefined){
        var index;
        index = layer.msg('电话号码为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addEmails == NaN || addEmails == undefined || addEmails == "" || addEmails.length < 0){
        var index;
        index = layer.msg('邮箱为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addresss == NaN || addresss.length < 0 || addresss == undefined){
        var index;
        index = layer.msg('详细地址为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addDates == NaN || addDates == undefined || addDates == "" || addDates.length < 0){
        var index;
        index = layer.msg('日期为空', function(){
            layer.close(index);
        });
        return;
    }
    /*if(addStates == NaN || addStates.length < 0 || addStates == undefined){
        var index;
        index = layer.msg('状态信息为空', function(){
            layer.close(index);
        });
        return;
    }*/
    if(addRemarks == NaN || addRemarks == undefined || addRemarks == "" || addRemarks.length < 0){
        var index;
        index = layer.msg('备注为空', function(){
            layer.close(index);
        });
        return;
    }
    /*if(provinces == NaN || provinces.length < 0 || provinces == undefined){
        var index;
        index = layer.msg('省区信息为空', function(){
            layer.close(index);
        });
        return;
    }
    if(citys == NaN || citys == undefined || citys == "" || citys.length < 0){
        var index;
        index = layer.msg('市区信息为空', function(){
            layer.close(index);
        });
        return;
    }*/
    $('#addProvider').modal('hide');
    $.post(URL + "/providerController/addProvider.do",
        {
            addProName:addProNames,
            addContName:addContNames,
            addPhone:addPhones,
            addEmail:addEmails,
            address:addresss,
            addDate:addDates,/*
            addState:addStates,*/
            addRemark:addRemarks,
            province:provinces,
            city:citys
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadProviderFromData').bootstrapTable('refresh');
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
$('#addProvider').on('hidden.bs.modal', function (e) {
    $('#addProName').val(null);
    $('#addContName').val(null);
    $('#addPhone').val(null);
    $('#address').val(null);
    $('#addDate').val(null);
    $('#addState').val(null);
    $('#addRemark').val(null);
    $('#province').val(null);
    //$('#city').val(null);
});
function  provinceSelecteds(obj){
    var provinceIds = obj.options[obj.selectedIndex].value;

    $.post(URL + "/providerController/city.do",{
            provinceId:provinceIds
        },
        function(resultJSONObject){
        console.log(resultJSONObject)
            if(resultJSONObject.status === "00"){
                $('#city').empty();
                for(var i = 0; i < resultJSONObject.rows.length;i++){
                    //console.log(resultJSONObject.rows[i].FACTORY_ID);
                    $('#city').append("<option value=" + resultJSONObject.rows[i].cityid + ">" + resultJSONObject.rows[i].city + "</option>");
                    // console.log(resultJSONObject.rows[i].FACTROY_NAME);

                }
                // 缺一不可
                $('#city').selectpicker('refresh');
                $('#city').selectpicker('render');
            }
        });
}






