(function() {



    var admin_name = get_cookie("admin_name");
    if(admin_name  == "" || admin_name == undefined || admin_name.length <= 0){
        top.location.href = "zt_login.html";
    }
    $('#loadBillsFromData').bootstrapTable({
        height:"69%",
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:URL + "/billsInfoController/loadBills.do",//要请求数据的文件路径
        onRefresh:function(){
            $('#toolbarpassWay').children('#btn_rate,#btn_delete,#btn_enable').remove();
        },
        onSearch:function(){
            $('#toolbarpassWay').children('#btn_rate,#btn_delete,#btn_enable').remove();
        },
        onPageChange:function(){
            $('#toolbarpassWay').children('#btn_rate,#btn_delete,#btn_enable').remove();
        },
        onUncheck:function(){
            $('#toolbarpassWay').children('#btn_rate,#btn_delete,#btn_enable').remove();
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
        toolbar: '#toolbarpassWay',//指定工具栏
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
                field:'bill_id'
            },
            {
                title:'用户名称',
                field:'bill_name',
            },
            {
                title:'单位',
                field:'bill_company',
                formatter:operateFormatterStates
            },
            {
                title:'商品价格',
                field:'bill_price'
            },
            {
                title:'建立时间',
                field:'bill_time',
                formatter: function (value, row, index) {
                    return changeDateFormat(value)
                }
            },
            {
                title:'供应商名称',
                field:'pro_name'
            }
            ,
            {
                title:'状态',
                field:'bill_state',
                formatter:operateFormatterState
            }
            ,
            {
                title:'操作人',
                field:'bill_person'
            }
            ,
            {
                title:'备注',
                field:'bill_remark'
            }
            ,
            {
                title:'库存量',
                field:'bill_amount',
            }
            ,
            {
                title:'总金额',
                field:'bill_money'
            }
            ,
            {
                title:'供应商id',
                field:'provider_id'
            }],

        responseHandler:function(res){
            //在ajax获取到数据，渲染表格之前，修改数据源
            console.log(res);

            return res;
        }
    });
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

    //=======================================END
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
            return '<span style="color:#24ff13">正常</span>';
        }else if(value == 0){
            return '<span style="color:#ff2d3b">失效</span>';
        }
    }
    function operateFormatterStates(value,row,index){
        if(value == 1){
            return '<span>个</span>';
        }else if(value == 2){
            return '<span>箱</span>';
        }else if(value == 3){
            return '<span>瓶</span>';
        }else if(value == 4){
            return '<span>带</span>';
        }else if(value == 5){
            return '<span>台</span>';
        }
    }

    var layer ;
    layui.use('layer', function(){
        layer = layui.layer;
    });


    // 添加渠道
    $('#btn_input').click(function () {
        var bill_name = $('#bill_name').val("");
        var bill_price =  $('#bill_price').val("");
        var addPerson = $('#addPerson').val("");
        var bill_amount=$('#bill_amount').val("");
        var bill_money = $('#bill_money').val("");
        var addProvider = $('#addProvider').val("");
        var provider_id = $('#provider_id').text("");
        var bill_company = $('#bill_company').val("");
        var bill_remark = $('#bill_remark').val("");
        $('#addPassWay').modal('show');

    });

    $('#addPassWay').on('shown.bs.modal', function (e) {
         $('#addPerson').empty();
        $('#addProvider').empty();
        // // 缺一不可
         $('#addPerson').selectpicker('refresh');
         $('#addPerson').selectpicker('render');
        $('#addProvider').selectpicker('refresh');
        $('#addProvider').selectpicker('render');

        $.post(URL + "/billsInfoController/getProviderNameAndId.do",
            function(resultJSONObject){
                if(resultJSONObject.status == "00"){

                    for(var i = 0; i < resultJSONObject.rows.length;i++){

                        $('#addProvider').append("<option value=" + resultJSONObject.rows[i].pro_id + ">" + resultJSONObject.rows[i].pro_name + "</option>");
                    }
                    // 缺一不可
                }else {

                }
                $('#addProvider').selectpicker('refresh');
                $('#addProvider').selectpicker('render');
            });
         $.post(URL + "/ruku/getEmpName.do",
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
    $('#rateModal').on('shown.bs.modal', function (e) {
        $('#addPerson1').empty();
        $('#addProvider1').empty();
        // // 缺一不可
        $('#addPerson1').selectpicker('refresh');
        $('#addPerson1').selectpicker('render');
        $('#addProvider1').selectpicker('refresh');
        $('#addProvider1').selectpicker('render');

        $.post(URL + "/billsInfoController/getProviderNameAndId.do",
            function(resultJSONObject){
                if(resultJSONObject.status == "00"){

                    for(var i = 0; i < resultJSONObject.rows.length;i++){

                        $('#addProvider1').append("<option value=" + resultJSONObject.rows[i].pro_id + ">" + resultJSONObject.rows[i].pro_name + "</option>");
                    }
                    // 缺一不可
                }else {

                }
                $('#addProvider1').selectpicker('refresh');
                $('#addProvider1').selectpicker('render');
            });
        $.post(URL + "/ruku/getEmpName.do",
            function(resultJSONObject){
                if(resultJSONObject.status == "00"){

                    for(var i = 0; i < resultJSONObject.rows.length;i++){

                        $('#addPerson1').append("<option value=" + resultJSONObject.rows[i].emp_no + ">" + resultJSONObject.rows[i].emp_name + "</option>");
                    }
                    // 缺一不可
                }else {

                }
                $('#addPerson1').selectpicker('refresh');
                $('#addPerson1').selectpicker('render');
            });

    });

    function rowClicked(){
        $('#toolbarpassWay').children('#btn_rate').remove();
        $('#toolbarpassWay').children('#btn_delete').remove();
        var selectRows =  $('#loadPassWayFromData').bootstrapTable('getSelections');
        $('#toolbarpassWay').append('<button id="btn_rate" type="button" class="btn btn-info" > <span class="fa fa-edit" aria-hidden="true"></span>信息修改</button>');
        $('#toolbarpassWay').append('<button id="btn_delete" type="button" class="btn btn-danger" > <span class="fa fa-edit" aria-hidden="true"></span>删除商品</button>');

        $('#btn_rate').click(function () {

            var selectRows =  $('#loadBillsFromData').bootstrapTable('getSelections');
            /*if(selectRows.length <= 0){
                var index;
                index = layer.msg('请先选择一行', function(){
                    layer.close(index);
                });
                return;
            }*/
            $('#rateModal').modal('show');
            var id = selectRows[0].bill_id;
            //alert(id)
            $.post(URL + "/billsInfoController/finOne.do",
                {
                    id:id
                },function(resultJSONObject){
                    if(resultJSONObject.status == "00"){
                        //alert(name)
                        $('#bill_id').val(resultJSONObject.rows[0].bill_id);
                         $('#bill_name1').val(resultJSONObject.rows[0].bill_name);
                         $('#bill_price1').val(resultJSONObject.rows[0].bill_price);
                         $('#bill_person1').val(resultJSONObject.rows[0].addPerson);
                         $('#bill_amount1').val(resultJSONObject.rows[0].bill_amount);
                         $('#bill_money1').val(resultJSONObject.rows[0].bill_money);
                         //$('#provider_name1').val(resultJSONObject.rows[0].addProvider);
                         $('#addPerson1').val(resultJSONObject.rows[0].provider_id);
                         $('#bill_company1').val(resultJSONObject.rows[0].bill_company);
                         $('#upState').val(resultJSONObject.rows[0].bill_state);
                         $('#bill_remark1').val(resultJSONObject.rows[0].bill_remark);

                    }

                });
        });

        $('#btn_delete').click(function () {

            var selectRows =  $('#loadBillsFromData').bootstrapTable('getSelections');
            
            var id = selectRows[0].bill_id;
            //alert(id)
            var isDel=confirm('你确定要删除吗?')
            if(isDel){
            $.post(URL + "/billsInfoController/deleteBills.do",
                {
                    id:id
                },function(resultJSONObject){
                    var index;
                    if(resultJSONObject.status == "00"){
                        index = layer.msg(resultJSONObject.message, {
                            icon: 16
                            ,shade: 0.6,
                            time: 2000
                        },function () {
                            $('#loadBillsFromData').bootstrapTable('refresh');
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
                });}
        });

    }
})();

$('#addPBillsMessage').click(function () {
    var bill_names = $('#bill_name').val();
    var bill_prices =  $('#bill_price').val();
    var bill_amount=$('#bill_amount').val();
    var addPersonIds =  $('#addPerson').val();
    var addPersonNames = $('#addPerson').find("option:selected").text();
    var bill_money = $('#bill_money').val();
    var bill_company = $('#bill_company').val();
    var bill_companys = $('#bill_company').find("option:selected").text();
    var bill_remark = $('#bill_remark').val();
    var addProviderIds =  $('#addProvider').val();
    var addProviderNames = $('#addProvider').find("option:selected").text();
    if(bill_names == NaN || bill_names == "" || bill_names == undefined){
        var index;
        index = layer.msg('商品名称为空', function(){
            layer.close(index);
        });
        return;
    }
    if(bill_prices == NaN || bill_prices == "" || bill_prices == undefined){
        var index;
        index = layer.msg('商品单价为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addPersonIds == NaN || addPersonIds=="" || addPersonIds == undefined){
        var index;
        index = layer.msg('操作人为空', function(){
            layer.close(index);
        });
        return;
    }
    if(bill_amount == NaN || bill_amount == undefined || bill_amount == "" || bill_amount.length < 0){
        var index;
        index = layer.msg('库存为空', function(){
            layer.close(index);
        });
        return;
    }
    if(bill_money == NaN || bill_money == undefined || bill_money == "" || bill_money.length < 0){
        var index;
        index = layer.msg('总价为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addProviderNames == NaN || addProviderNames == undefined || addProviderNames == "" || addProviderNames.length < 0){
        var index;
        index = layer.msg('供应商名为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addProviderIds == NaN || addProviderIds == undefined || addProviderIds == "" || addProviderIds.length < 0){
        var index;
        index = layer.msg('供应商id为空', function(){
            layer.close(index);
        });
        return;
    }
    /*if(state == NaN || state == undefined || state == "" || state.length < 0){
        var index;
        index = layer.msg('状态为空', function(){
            layer.close(index);
        });
        return;
    }*/
    if(bill_remark == NaN || bill_remark == undefined || bill_remark == "" || bill_remark.length < 0){
        var index;
        index = layer.msg('备注为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#addPassWay').modal('hide');
    $.post(URL + "/billsInfoController/addBills.do",
        {
            bill_name:bill_names,
            bill_price:bill_prices,
            addPerson:addPersonNames,
            bill_amount:bill_amount,
            bill_money:bill_money,
            addProvider:addProviderNames,
            provider_id:addProviderIds,
            bill_company:bill_company,
            bill_remark:bill_remark,
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadBillsFromData').bootstrapTable('refresh');
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
    $('#min2').val(null);
    $('#max2').val(null);
    $('#tradfee2').val(null);
    $('#dedupro2').val(null);
    $('#start2').val(null);
    $('#end2').val(null);
});

function fuzhi(e){
    if(e=="请选择代理商id"){
        $("#addProvider").val("");
    }else{
        $("#addProvider").val(e);
    }

}

$('#changeSave').click(function () {
    var bill_id = $('#bill_id').val();
    var bill_name = $('#bill_name1').val();
    var bill_price =  $('#bill_price1').val();
    var bill_amount=$('#bill_amount1').val();
    var bill_money = $('#bill_money1').val();
    var upStates = $('#upState').val();
    var bill_company = $('#bill_company1').val();
    var bill_remark = $('#bill_remark1').val();
    var addPersonIds =  $('#addPerson1').val();
    var addPersonNames = $('#addPerson1').find("option:selected").text();
    var addProviderIds =  $('#addProvider1').val();
    var addProviderNames = $('#addProvider1').find("option:selected").text();
    //var tradingName = $('#trading').find("option:selected").text();
    if(bill_name == NaN || bill_name == "" || bill_name == undefined){
        var index;
        index = layer.msg('商品名称为空', function(){
            layer.close(index);
        });
        return;
    }
    if(bill_price == NaN || bill_price == "" || bill_price == undefined){
        var index;
        index = layer.msg('商品单价为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addPersonIds == NaN || addPersonIds=="" || addPersonIds == undefined){
        var index;
        index = layer.msg('操作人为空', function(){
            layer.close(index);
        });
        return;
    }
    if(bill_amount == NaN || bill_amount == undefined || bill_amount == "" || bill_amount.length < 0){
        var index;
        index = layer.msg('库存为空', function(){
            layer.close(index);
        });
        return;
    }
    if(bill_money == NaN || bill_money == undefined || bill_money == "" || bill_money.length < 0){
        var index;
        index = layer.msg('总价为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addProviderIds == NaN || addProviderIds == undefined || addProviderIds == "" || addProviderIds.length < 0){
        var index;
        index = layer.msg('供应商名为空', function(){
            layer.close(index);
        });
        return;
    }

    if(bill_company == NaN || bill_company == undefined || bill_company == "" || bill_company.length < 0){
        var index;
        index = layer.msg('商品单价为空', function(){
            layer.close(index);
        });
        return;
    }
    if(bill_remark == NaN || bill_remark == undefined || bill_remark == "" || bill_remark.length < 0){
        var index;
        index = layer.msg('备注为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#rateModal').modal('hide');
    $.post(URL + "/billsInfoController/updateBillOne.do",
        {
            billId:bill_id,
            billName:bill_name,
            billPrice:bill_price,
            billPerson:addPersonNames,
            billAmount:bill_amount,
            billMoney:bill_money,
            billCompany:bill_company,
            billRemark:bill_remark,
            billPersonId:addPersonIds,
            billProviderId:addProviderIds,
            billProviderName:addProviderNames,
            upState:upStates
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadBillsFromData').bootstrapTable('refresh');
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






