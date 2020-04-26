
(function() {
    var admin_name = get_cookie("admin_name");
    if(admin_name  == "" || admin_name == undefined || admin_name.length <= 0){
        top.location.href = "zt_login.html";
    }
    $('#terminalTableFromData').bootstrapTable({
        height:"69%",
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:URL + "/terminal/loadTerminalMessage.do",//要请求数据的文件路径
        onRefresh:function(){
            $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink,#btn_change,#btn_recovery,#btn_out,#btn_undo,#btn_broke').remove();
        },
        onSearch:function(){
            $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink,#btn_change,#btn_recovery,#btn_out,#btn_undo,#btn_broke').remove();
        },
        onPageChange:function(){
            $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink,#btn_change,#btn_recovery,#btn_out,#btn_undo,#btn_broke').remove();
        },
        onUncheck:function(){
            $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink,#btn_change,#btn_recovery,#btn_out,#btn_undo,#btn_broke').remove();
        },
        //striped: true, //是否显示行间隔色
        dataField: "rows",//bootstrap table 可以前端分页也可以后端分页，这里
        //我们使用的是后端分页，后端分页时需返回含有total：总记录数,这个键值好像是固定的
        //rows： 记录集合 键值可以修改  dataField 自己定义成自己想要的就好
        pageNumber: 1, //初始化加载第一页，默认第一页
        pagination:true,//是否分页
        queryParamsType:'limit',//查询参数组织方式
        sidePagination:'server',//指定服务器端分页
        queryParams:queryParamsTerminal,//请求服务器时所传的参数
        pageSize:10,//单页记录数
        pageList:[5,10,20,30],//分页步进值
        showRefresh:true,//刷新按钮
        showColumns:true,
        search:true,
        clickToSelect: true,//是否启用点击选中行
        toolbar: '#toolbar',//指定工具栏
        locale:'zh-CN',//中文支持
        singleSelect: true, //开启单选
        //onClickRow:rowClicked,
        onCheck:rowCheckedTerminal,
        columns:[
            {
                checkbox: true
            },
            {
                title:'终端ID',
                field:'TERMINAL_ID'
            },
            {
                title:'终端状态',
                field:'TERMINAL_STATE',
                //列数据格式化
                formatter:operateFormatterTerminal
            },
            {
                title:'厂商名称',
                field:'FACTORY_NAME'
            },
            {
                title:'机具型号',
                field:'TERMINAL_MODEL'
            },
            {
                title:'机具序列号',
                field:'TERMINAL_SN'
            },
            {
                title:'终端号',
                field:'TERMINAL_NO'
            },
            {
                title:'装机状态',
                field:'BUSINESSMAN_ID',
                formatter:business_state
            },
            {
                title:'所属代理商名称',
                field:'AGENT_DEFINITION'
            },
            {
                title:'启用|停用 状态',
                field:'ENABLEORDISABLE',
                formatter:operateFormatterTerminal1
            },
            {
                title:'加入时间',
                field:'INPUT_TIME'
            }],

        responseHandler:function(res){
            //在ajax获取到数据，渲染表格之前，修改数据源
            //console.log(res);

            return res;
        }
    });










    // $('#btn_edit').click(function () {
    //   var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
    //   if (selectRows.length <= 0) {
    //         var index;
    //         index = layer.msg('请先选择一行', function(){
    //            layer.close(index);
    //           });
    //   }else{
    //         var MAC_NUMBER = selectRows[0].MAC_NUMBER;
    //         var MAC_SN = selectRows[0].MAC_SN;
    //         $('.modal').modal('show');
    //          $('.modal').on('shown.bs.modal', function (e) {
    //
    //             $('#terminalNo').html(MAC_NUMBER);
    //             $('#snNo').html(MAC_SN);
    //
    //         });
    //   }
    // });







})();


//三个参数，value代表该列的值
function operateFormatterTerminal(value,row,index){
    if(value == 0){
        return '闲置库存';
        //return '<i class="fa fa-lock" style="color:red"></i>'
    }else if(value == 1){
        return '已出库';
        //return '<i class="fa fa-unlock" style="color:green"></i>'
    }
}

function business_state(value,row,index){
    if(value == 0){
        return '未装机';
        //return '<i class="fa fa-lock" style="color:red"></i>'
    }else
        return '已装机';

}

//三个参数，value代表该列的值
function operateFormatterTerminal1(value,row,index){
    if(value == 0){
        return '已停用';
        //return '<i class="fa fa-lock" style="color:red"></i>'
    }else if(value == 1){
        return '已启用';
        //return '<i class="fa fa-unlock" style="color:green"></i>'
    }
}

//请求服务数据时所传参数
function queryParamsTerminal(params){
    return{
        //每页多少条数据
        pageSize: params.limit,
        //请求第几页
        colOffset:params.offset,
        search: params.search
    }
}
var layer ;
layui.use('layer', function(){
    layer = layui.layer;
});
// 终端入库
$('#btn_input').click(function () {
    $('#terminalModal').modal('show');

});

$('#terminalModal').on('shown.bs.modal', function (e) {
    $.post(URL + "/factory/loadFactory.do",
        function(resultJSONObject){
            if(resultJSONObject.status == "00"){

                for(var i = 0; i < resultJSONObject.rows.length;i++){
                    //console.log(resultJSONObject.rows[i].FACTORY_ID);
                    $('#selectpicker01').append("<option value=" + resultJSONObject.rows[i].FACTORY_ID + ">" + resultJSONObject.rows[i].FACTORY_NAME + "</option>");
                    // console.log(resultJSONObject.rows[i].FACTROY_NAME);
                }
                // 缺一不可
                $('#selectpicker01').selectpicker('refresh');
                $('#selectpicker01').selectpicker('render');
                $('#selectpicker02').selectpicker('refresh');
                $('#selectpicker02').selectpicker('render');
            }
        });
});

$('#terminalModal').on('hidden.bs.modal', function (e) {

    $("#mac_sn").val(null);
    $("#mac_detail").val(null);

    $('#selectpicker02').empty();
    $('#selectpicker01').empty();
    $('#selectpicker01').selectpicker('refresh');
    $('#selectpicker01').selectpicker('render');
    $('#selectpicker02').selectpicker('refresh');
    $('#selectpicker02').selectpicker('render');

});

$('#saveKeysTerminal').click(function () {

    var factory_name = $("#selectpicker01").find("option:selected").text();
    var factory_model = $("#selectpicker02").find("option:selected").text();
    // alert("factory_name = " + factory_name);
    var mac_sn = $("#mac_sn").val();
    var mac_detail = $("#mac_detail").val();

    if(factory_name == NaN || factory_name == undefined || factory_name.length == 0){
        var index;
        index = layer.msg('请选择厂商', function(){
            layer.close(index);
        });
        return;
    }else if(factory_model == NaN || factory_model == undefined || factory_model == 0){
        var index;
        index = layer.msg('请选择型号', function(){
            layer.close(index);
        });
        return;
    }else if( mac_sn == NaN || mac_sn == undefined || mac_sn.length <= 0){
        var index;
        index = layer.msg('请输入序列号', function(){
            layer.close(index);
        });
        return;
    }

    $.post(URL + "/inputTerminal/inputTerminal.do",
        {
            factory_name:factory_name,
            terminal_sn:mac_sn,
            terminal_model:factory_model,
            // terminal_introduce:mac_detail
        },function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    $('#terminalTableFromData').bootstrapTable('refresh');
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

    $("#mac_sn").val(null);
    $("#mac_detail").val(null);
    $('#selectpicker02').empty();
    $('#selectpicker01').empty();
    $('#selectpicker01').selectpicker('refresh');
    $('#selectpicker01').selectpicker('render');
    $('#selectpicker02').selectpicker('refresh');
    $('#selectpicker02').selectpicker('render');
    $('#terminalModal').modal('hide');



});
function rowCheckedTerminal(){
    var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');

    $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink,#btn_change,#btn_recovery,#btn_out,#btn_undo,#btn_broke').remove();
    var terminalState = selectRows[0].TERMINAL_STATE; // 终端状态 0 闲置库存 1 已装机
    var enableOrDisable = selectRows[0].ENABLEORDISABLE;   // 0、停用 1、正常  2、未使用
    //alert(terminalState + " " + enableOrDisable);
    var teriminal_id = selectRows[0].TERMINAL_ID;
    var businessman_id = selectRows[0].BUSINESSMAN_ID;
    if(enableOrDisable == 0){

        $('#toolbar').append('<button id="btn_enable" type="button" class="btn btn-default" > <span class="fa fa-key" aria-hidden="true"></span> 启用</button>');
    }else if(enableOrDisable == 1){

        $('#toolbar').append('<button id="btn_stop" type="button" class="btn btn-default" > <span class="fa fa-stop" aria-hidden="true"></span> 停用</button>');
    }
    $('#toolbar').append(' ');
     if(terminalState == 1 && businessman_id == 0){
        $('#toolbar').append('<button id="btn_change" type="button" class="btn btn-default" > <span class="fa fa-exchange" aria-hidden="true"></span> 变更代理商</button>');
         $('#toolbar').append(' ');
        $('#toolbar').append('<button id="btn_recovery" type="button" class="btn btn-default" > <span class="fa fa-recycle" aria-hidden="true"></span> 回收</button>');
    }else if(terminalState == 1 && businessman_id != 0){
         $('#toolbar').append('<button id="btn_undo" type="button" class="btn btn-default" > <span class="fa fa-undo" aria-hidden="true"></span> 撤机</button>');
     }
    else if(terminalState == 0){
        $('#toolbar').append('<button id="btn_out" type="button" class="btn btn-default" > <span class="fa fa-sign-out" aria-hidden="true"></span> 出库</button>');
         $('#toolbar').append(' ');
        $('#toolbar').append('<button id="btn_broke" type="button" class="btn btn-default" > <span class="fa fa-chain-broken" aria-hidden="true"></span> 报废</button>');
    }

    $('#btn_out').click(function () {
        $('#outputModal').modal('show');
    });
    
    $('#btn_change').click(function () {
        $('#agentChangeModal').modal('show');
    });

    // 终端回收
    $('#btn_recovery').click(function () {
        var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
        var teriminal_id = selectRows[0].TERMINAL_ID;
        $.post(URL + "/terminal/terminalCallback.do",
            {
                terminal_id:teriminal_id
            },function(resultJSONObject){
                var index;
                if(resultJSONObject.status == "00"){
                    index = layer.msg(resultJSONObject.message, {
                        icon: 16
                        ,shade: 0.6,
                        time: 2000
                    },function () {
                        // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                        $('#terminalTableFromData').bootstrapTable('refresh');
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
    });

    $('#btn_undo').click(function () {

        var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
        var teriminal_id = selectRows[0].TERMINAL_ID;
        var teriminal_no = selectRows[0].TERMINAL_NO;
        $.post(URL + "/terminal/terminalWeaning.do",
            {
                terminal_no:teriminal_no,
                terminal_id:teriminal_id
            },function(resultJSONObject){
                var index;
                if(resultJSONObject.status == "00"){
                    index = layer.msg(resultJSONObject.message, {
                        icon: 16
                        ,shade: 0.6,
                        time: 2000
                    },function () {
                        // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                        $('#terminalTableFromData').bootstrapTable('refresh');
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
    });

    $("#btn_enable").click(function () {
        var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
        var teriminal_id = selectRows[0].TERMINAL_ID;
        $.post(URL + "/stateUpdate/stateUpdate.do",
            {
                enableordisable:1,
                terminal_id:teriminal_id
            },function(resultJSONObject){
                var index;
                if(resultJSONObject.status == "00"){
                    index = layer.msg(resultJSONObject.message, {
                        icon: 16
                        ,shade: 0.6,
                        time: 2000
                    },function () {
                        // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                        $('#terminalTableFromData').bootstrapTable('refresh');
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
    });

    $("#btn_broke").click(function () {
        var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
        var teriminal_id = selectRows[0].TERMINAL_ID;
        $.post(URL + "/stateUpdate/broken.do",
            {
                terminal_id:teriminal_id
            },function(resultJSONObject){
                var index;
                if(resultJSONObject.status == "00"){
                    index = layer.msg(resultJSONObject.message, {
                        icon: 16
                        ,shade: 0.6,
                        time: 2000
                    },function () {
                        // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                        $('#terminalTableFromData').bootstrapTable('refresh');
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
    });

    $("#btn_stop").click(function () {
        var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
        var teriminal_id = selectRows[0].TERMINAL_ID;
        $.post(URL + "/stateUpdate/stateUpdate.do",
            {
                enableordisable:0,
                terminal_id:teriminal_id
            },function(resultJSONObject){
                var index;
                if(resultJSONObject.status == "00"){
                    index = layer.msg(resultJSONObject.message, {
                        icon: 16
                        ,shade: 0.6,
                        time: 2000
                    },function () {
                        // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                        $('#terminalTableFromData').bootstrapTable('refresh');
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
    })



}



function selectOnChange1(obj){
    //获取被选中的option标签选项
    // var value = obj.options[obj.selectedIndex].text;
    factory_id = obj.options[obj.selectedIndex].value;

    $.post(URL + "/factory/loadFactoryModel.do",{
        factory_id:factory_id
    },
        function(resultJSONObject){
            if(resultJSONObject.status == "00"){
                $('#selectpicker02').empty();
                for(var i = 0; i < resultJSONObject.rows.length;i++){
                    //console.log(resultJSONObject.rows[i].FACTORY_ID);
                    $('#selectpicker02').append("<option value=" + resultJSONObject.rows[i].TERMINAL_MODEL + ">" + resultJSONObject.rows[i].TERMINAL_MODEL + "</option>");
                    // console.log(resultJSONObject.rows[i].FACTROY_NAME);
                }
                // 缺一不可
                $('#selectpicker02').selectpicker('refresh');
                $('#selectpicker02').selectpicker('render');
            }
        });
}

function selectOnChange2(obj){
    //获取被选中的option标签选项
    // var value = obj.options[obj.selectedIndex].text;
    // factory_model = obj.options[obj.selectedIndex].value;


}




$('#btn_batchinput').click(function () {
    $('#batchInputModal').modal('show');
});

$('#btn_batchout').click(function () {
    $('#batchOutputModal').modal('show');
});

$('#excelFile').fileinput(
    {
        showUpload:false,
        showClose: true,
        showZoom:false,
        showBrowse:true,
        uploadAsync:true,//默认异步上传
        initialPreviewAsData: true,
        uploadUrl: 'http://127.0.0.1:8080/inputTerminal/batchInputTerminal.do',
        // resizeImage:true,
        showRemove:true,

        enctype: 'multipart/form-data',
        allowedFileExtensions:['xls', 'xlsx'],
        language: 'zh', //设置语言
        showCaption: true,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式
        // initialCaption: "请选择上传一张身份证正面图片",
        dropZoneEnabled: true,
        showPreview: true,
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        previewFileIconSettings: {
            // 'docx': '<i ass="fa fa-file-word-o text-primary"></i>',
            'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>'
            // 'pptx': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            // 'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
            // 'pdf': '<i class="fa fa-file-archive-o text-muted"></i>',
            // 'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
        },
        layoutTemplates:{
            footer :'',//footer置为空
        }

    });

// $("#fileUpload").fileupload({
//     url: "/WealthManagement/WFC/FileUpload.aspx",
//     dataType: 'json',
//     add: function (e, data) {
//         var fileName = data.files[0].name;
//         var fileType = fileName.substr(fileName.lastIndexOf(".") + 1);
//         // 可以通过data.files[0].size获取文件大小
//
//         $.blockUI({
//             message: $("#downloadMsg")
//         });
//         title = fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.lastIndexOf('.'));
//         $("#fileUpload").fileupload(
//             'option',
//             'formData',
//             {'title': title, 'validDate': '', 'windcode': pageBaseInfo.Windcode}
//         ); // 传参不能放在初始化语句中，否则只能传递参数的初始化值
//         data.submit();
//     },
//     progress: function (e, data) {
//         var progress = parseInt(data.loaded / data.total * 100, 10);
//         $("#downloadMsg").html('已上传' + progress + '%');
//         if (progress == '100') {
//             $("#downloadMsg").html('处理中...');
//         }
//     },
//     done: function (e, data) {
//         var res = data.result.Response;
//         if (res && res.Status == 0) {
//             //  更新文件列表
//             updateFundFiles();
//         }
//         else {
//             alert(res ? res.Message : "上传失败，请重试！");
//         }
//         $.unblockUI();
//     }
// })

$('#import').click(function () {

    $('#batchInputModal').modal('hide');

});

$('#batchInputModal').on('hidden.bs.modal', function (e) {
    $("#import").attr('disabled',true);
    // $('#terminalBatch').remove('#batch01');
    $('#terminalBatchInput').children('#batch01').remove();
});

$('#batchOutputModal').on('hidden.bs.modal', function (e) {
    $("#importBatchOutput").attr('disabled',true);
    // $('#terminalBatch').remove('#batch01');
    $('#terminalBatchOutput').children('#batch02').remove();
});
// 批量入库
layui.use('upload', function(){
    var upload = layui.upload;

    //执行上传
    var uploadInst = upload.render({
        elem: '#upload' //绑定元素
        ,url: URL + '/inputTerminal/batchInputTerminal.do' //上传接口
        ,method: 'POST'
        ,accept: 'file'
        ,exts:'xls|xlsx'
        ,auto:false
        ,bindAction:'#import'
        ,size: 1024
        ,choose: function(obj){
            obj.preview(function(index, file, result){

                $('#terminalBatchInput').append('<span id="batch01" class="layui-inline layui-upload-choose">' + file.name + '</span>');
                 //<span class="layui-inline layui-upload-choose">终端入库.xls</span>


            });
            //$('#import').removeClass('btnunable');
            $('#import').removeAttr("disabled");
        }
        // ,before: function(obj){
        //     layer.load();
        // }
        ,done: function(res){//上传完毕回调
            // layer.closeAll('loading');
            $('#terminalTableFromData').bootstrapTable('refresh');
            layer.msg(res.message);

        }
        ,error: function(){//请求异常回调
            // layer.closeAll('loading');
            layer.msg('网络异常，请稍后重试！');
        }
    });
});


$('#importBatchOutput').click(function () {

    $('#batchOutputModal').modal('hide');

});


// 批量出库
layui.use('upload', function(){
    var upload = layui.upload;

    //执行上传
    var uploadInst = upload.render({
        elem: '#uploadBatchOutput' //绑定元素
        ,url: URL + '/inputTerminal/batchOutputTerminal.do' //上传接口
        ,method: 'POST'
        ,accept: 'file'
        ,exts:'xls|xlsx'
        ,auto:false
        ,bindAction:'#importBatchOutput'
        ,size: 1024
        ,choose: function(obj){
            obj.preview(function(index, file, result){

                $('#terminalBatchOutput').append('<span id="batch02" class="layui-inline layui-upload-choose">' + file.name + '</span>');
                //<span class="layui-inline layui-upload-choose">终端入库.xls</span>


            });
            //$('#import').removeClass('btnunable');
            $('#importBatchOutput').removeAttr("disabled");
        }
        // ,before: function(obj){
        //     layer.load();
        // }
        ,done: function(res){//上传完毕回调
            // layer.closeAll('loading');
            $('#terminalTableFromData').bootstrapTable('refresh');
            layer.msg(res.message);

        }
        ,error: function(){//请求异常回调
            // layer.closeAll('loading');
            layer.msg('网络异常，请稍后重试！');
        }
    });
});

$('#agentChangeModal').on('shown.bs.modal', function (e) {
    // $('#agentSelect').empty();
    // $('#selectpicker01').selectpicker('refresh');
    // $('#selectpicker01').selectpicker('render');

    // var agent_id
    $.post(URL + "/terminal/loadAgent.do",
        function(resultJSONObject){
            if(resultJSONObject.status == "00"){

                for(var i = 0; i < resultJSONObject.rows.length;i++){
                    //console.log(resultJSONObject.rows[i].FACTORY_ID);
                    $('#agentChangeSelect').append("<option value=" + resultJSONObject.rows[i].AGENT_ID + ">" + resultJSONObject.rows[i].AGENT_DEFINITION + "</option>");
                    // console.log(resultJSONObject.rows[i].FACTROY_NAME);
                }
                // 缺一不可
                $('#agentChangeSelect').selectpicker('refresh');
                $('#agentChangeSelect').selectpicker('render');
            }
        });
});

$('#agentChangeModal').on('hidden.bs.modal', function (e) {

    $('#agentChangeSelect').empty();
    $('#agentChangeSelect').selectpicker('refresh');
    $('#agentChangeSelect').selectpicker('render');

});

$('#outputModal').on('shown.bs.modal', function (e) {
    // $('#agentSelect').empty();
    // $('#selectpicker01').selectpicker('refresh');
    // $('#selectpicker01').selectpicker('render');

    // var agent_id
    $.post(URL + "/terminal/loadAgent.do",
        function(resultJSONObject){
            if(resultJSONObject.status == "00"){

                for(var i = 0; i < resultJSONObject.rows.length;i++){
                    //console.log(resultJSONObject.rows[i].FACTORY_ID);
                    $('#agentSelect').append("<option value=" + resultJSONObject.rows[i].AGENT_ID + ">" + resultJSONObject.rows[i].AGENT_DEFINITION + "</option>");
                    // console.log(resultJSONObject.rows[i].FACTROY_NAME);
                }
                // 缺一不可
                $('#agentSelect').selectpicker('refresh');
                $('#agentSelect').selectpicker('render');
            }
        });
});


$('#outputModal').on('hidden.bs.modal', function (e) {

    $('#agentSelect').empty();
    $('#selectpicker01').selectpicker('refresh');
    $('#selectpicker01').selectpicker('render');

});

$('#output').click(function () {
    var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
    // var teriminal_id = selectRows[0].TERMINAL_ID;
    var teriminal_sn = selectRows[0].TERMINAL_SN;
    var agent_id = $('#agentSelect').selectpicker('val');
    $('#outputModal').modal('hide');
    $.post(URL + "/terminal/terminalUpdateAgent.do",
        {
            agent_id:agent_id,
            terminal_sn:teriminal_sn
        },
        function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg(resultJSONObject.message, {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                    $('#terminalTableFromData').bootstrapTable('refresh');
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
});

function agentChangeSelected(obj){
    var agent_name = obj.options[obj.selectedIndex].text;

    var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
    var agent_name_col = selectRows[0].AGENT_DEFINITION;

    if(agent_name == agent_name_col){
        $("#change").attr('disabled',true);
    }
    else
        $("#change").removeAttr("disabled");
}

$('#change').click(function () {
    var selectRows =  $('#terminalTableFromData').bootstrapTable('getSelections');
    var teriminal_sn = selectRows[0].TERMINAL_SN;
    var agent_id = $('#agentChangeSelect').selectpicker('val');
   // alert("agent_id = " + agent_id );
    $('#agentChangeModal').modal('hide');
    $.post(URL + "/terminal/terminalUpdateAgent.do",
        {
            agent_id:agent_id,
            terminal_sn:teriminal_sn
        },
        function(resultJSONObject){
            var index;
            if(resultJSONObject.status == "00"){
                index = layer.msg("变更成功", {
                    icon: 16
                    ,shade: 0.6,
                    time: 2000
                },function () {
                    // $('#toolbar').children('#btn_enable,#btn_stop,#btn_unlink').remove();
                    $('#terminalTableFromData').bootstrapTable('refresh');
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
});

