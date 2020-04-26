(function() {
    var admin_name = get_cookie("admin_name");
    if(admin_name  == "" || admin_name == undefined || admin_name.length <= 0){
        top.location.href = "zt_login.html";
    }
    $('#loadRuKuInfoFromData').bootstrapTable({
        height:"69%",
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:URL + "/ruku/getAllRuKu.do",//要请求数据的文件路径
        onRefresh:function(){
            $('#toolbarRuKuInfo').children('#btn_delete').remove();
        },
        onSearch:function(){
            $('#toolbarRuKuInfo').children('#btn_delete').remove();
        },
        onPageChange:function(){
            $('#toolbarRuKuInfo').children('#btn_delete').remove();
        },
        onUncheck:function(){
            $('#toolbarRuKuInfo').children('#btn_delete').remove();
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
        toolbar: '#toolbarRuKuInfo',//指定工具栏
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
                field:'ru_id'
            },
            {
                title:'入库商品名称',
                field:'bill_name',
            },
            {
                title:'入库数量',
                field:'ru_amount',
            },
            {
                title:'入库日期',
                field:'ru_date',
                formatter: function (value, row, index) {
                    return changeDateFormat(value)
                }
            },
            {
                title:'操作人',
                field:'ru_peo'
            },
            {
                title:'状态',
                field:'ru_state',
                formatter:operateFormatterState
            },
            {
                title:'备注',
                field:'ru_remark'
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
            return '<span style="color:#ff2d3b">废除</span>';
        }
    }

    var layer ;
    layui.use('layer', function(){
        layer = layui.layer;
    });


    // 添加入库
    $('#btn_input').click(function () {
        $('#addRuKu').modal('show');

    });

    $('#addRuKu').on('shown.bs.modal', function (e) {
        $('#addBill').empty();
        $('#addPerson').empty();
        // 缺一不可
        $('#addBill').selectpicker('refresh');
        $('#addPerson').selectpicker('render');
        $('#addBill').selectpicker('refresh');
        $('#addPerson').selectpicker('render');

        $.post(URL + "/ruku/getBillName.do",
            function(resultJSONObject){
                if(resultJSONObject.status == "00"){

                    for(var i = 0; i < resultJSONObject.rows.length;i++){

                        $('#addBill').append("<option value=" + resultJSONObject.rows[i].bill_id + ">" + resultJSONObject.rows[i].bill_name + "</option>");
                    }
                    // 缺一不可
                }else {

                }
                $('#addBill').selectpicker('refresh');
                $('#addBill').selectpicker('render');
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

    function rowClicked(){
        $('#toolbarRuKuInfo').children('#btn_delete').remove();
        var selectRows =  $('#loadRuKuInfoFromData').bootstrapTable('getSelections');
        //$('#toolbarRuKuInfo').append('<button id="btn_rate" type="button" class="btn btn-default" > <span class="fa fa-edit" aria-hidden="true"></span>信息修改</button>');
        $('#toolbarRuKuInfo').append('<button id="btn_delete" type="button" class="btn btn-danger" > <span class="fa fa-edit" aria-hidden="true"></span>删除</button>');
        $("#btn_delete").click(function () {
            var selectRows =  $('#loadRuKuInfoFromData').bootstrapTable('getSelections');
            var ruIds = selectRows[0].ru_id;
            var amounts = selectRows[0].ru_amount;
            //alert(ftId)
            var isDel=confirm('确认删除吗 ? ')
            if(isDel) {
                $.post(URL + "/ruku/deleteRuKu.do",
                    {
                        ruId: ruIds,
                        amount: amounts
                    }, function (resultJSONObject) {
                        var index;
                        if (resultJSONObject.status == "00") {
                            index = layer.msg(resultJSONObject.message, {
                                icon: 16
                                , shade: 0.6,
                                time: 2000
                            }, function () {
                                // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                                $('#loadRuKuInfoFromData').bootstrapTable('refresh');
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
        /*$('#btn_rate').click(function () {

            var selectRows =  $('#loadRuKuInfoFromData').bootstrapTable('getSelections');
            /!*if(selectRows.length <= 0){
                var index;
                index = layer.msg('请先选择一行', function(){
                    layer.close(index);
                });
                return;
            }*!/
            $('#rateModal').modal('show');
            var id = selectRows[0].PW_ID;
            //alert(id)
            $.post(URL + "/passWay/loadPassWayById.do",
                {
                    id:id
                },function(resultJSONObject){
                    console.log(resultJSONObject);
                    var index;
                    if(resultJSONObject.status == "00"){
                        var name = selectRows[0].PW_NAME;
                        //alert(name)
                       $('#rateValue2').val(resultJSONObject.rows[0].PW_ID);
                        $('#min2').val(resultJSONObject.rows[0].PW_STATE);
                        $('#max2').val(resultJSONObject.rows[0].PW_ALLMONEY);
                        $('#tradfee2').val(resultJSONObject.rows[0].PW_NAME);
                        $('#start2').val(resultJSONObject.rows[0].PW_SINGLEMONEY);
                        $('#end2').val(resultJSONObject.rows[0].PW_REMARK);
                    }
                });
        });*/
    }
})();
/*
$('#changeSave').click(function () {
    var id = $('#rateValue2').val();
    var pwName =  $('#tradfee2').val();
    var single = $('#start2').val();
    var state=$('#min2').val();
    var maxmoney = $('#max2').val();
    var remark = $('#end2').val();
    //var tradingName = $('#trading').find("option:selected").text();
    if(pwName == NaN || pwName == "" || pwName == undefined){
        var index;
        index = layer.msg('供应商名称为空', function(){
            layer.close(index);
        });
        return;
    }
    if(single == NaN || single == "" || single == undefined){
        var index;
        index = layer.msg('单笔限额为空', function(){
            layer.close(index);
        });
        return;
    }
    if(maxmoney == NaN || maxmoney.length < 2 || maxmoney == undefined){
        var index;
        index = layer.msg('限额为空', function(){
            layer.close(index);
        });
        return;
    }
    if(remark == NaN || remark == undefined || remark == "" || remark.length < 0){
        var index;
        index = layer.msg('备注为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#rateModal').modal('hide');
    $.post(URL + "/passWay/upPassWayMessage.do",
        {
            id:id,
            pwName:pwName,
            single:single,
            state:state,
            maxmoney:maxmoney,
            remark:remark,
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadRuKuInfoFromData').bootstrapTable('refresh');
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
});*/

$('#addRuKuMessage').click(function () {
    var addBillIds =  $('#addBill').val();
    var addBillNames = $('#addBill').find("option:selected").text();
    var addAmounts = $('#addAmount').val();
    var addDates = $('#addDate').val();
    var addPersonIds = $('#addPerson').val();
    var addPersons = $('#addPerson').find("option:selected").text();
    var addRemarks = $('#addRemark').val();
    var addStates = $('#addState').val();
    if(addBillNames == NaN || addBillNames == "" || addBillNames == undefined){
        var index;
        index = layer.msg('商品名称为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addAmounts == NaN || addAmounts == "" || addAmounts == undefined){
        var index;
        index = layer.msg('入库数量为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addDates == NaN || addDates.length < 0 || addDates == undefined){
        var index;
        index = layer.msg('入库时间为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addPersons == NaN || addPersons == undefined || addPersons == "" || addPersons.length < 0){
        var index;
        index = layer.msg('操作人为空', function(){
            layer.close(index);
        });
        return;
    }
    if(addRemarks == NaN || addRemarks == undefined || addRemarks == "" || addRemarks.length < 0){
        var index;
        index = layer.msg('备注为空', function(){
            layer.close(index);
        });
        return;
    }
    $('#addRuKu').modal('hide');
    $.post(URL + "/ruku/addRuKu.do",
        {
            addBill:addBillIds,
            addAmount:addAmounts,
            addDate:addDates,
            addPerson:addPersons,
            addPersonId:addPersonIds,
            addRemark:addRemarks,
            addState:addStates
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#loadRuKuInfoFromData').bootstrapTable('refresh');
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

$('#addRuKu').on('hidden.bs.modal', function (e) {
    $('#addBill').val(null);
    $('#addAmount').val(null);
    $('#addDate').val(null);
    $('#addPerson').val(null);
    $('#addRemark').val(null);
    $('#addState').val(null);
});








