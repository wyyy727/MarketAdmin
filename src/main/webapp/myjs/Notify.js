 


function qwe(id) {
		$("#deleteHaulId").val(id)
		$("#delcfmOverhaul").modal('show');
	}

$("#deleteHaulBtn").click(function() {
	 
	// ajax异步删除
	$.ajax({
	    url:URL + "/notify/removeNotify.do",
	    type:'POST', //GET
	    async:true,    //或false,是否异步
	    data:{
	    	ID:$("#deleteHaulId").val()
	    },
	    timeout:5000,    //超时时间
	    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
	    success:function(resultJSONObject){
	    	  var index;
              if (resultJSONObject.status == "00") {
                  index = layer.msg(resultJSONObject.message, {
                      icon: 16
                      , shade: 0.6,
                      time: 2000
                  }, function () {
                	  $('#delcfmOverhaul').modal('hide');
                      $('#NotifyTableFromData').bootstrapTable('refresh');
                      layer.close(index);
                  });
              } else {
                  layer.msg(resultJSONObject.message, {
                      icon: 9
                      , shade: 0.6,
                      time: 2000
                  });
              }
	    }
	})   
});


(function() {
	 
//	  window.operateEvents = {
//		        'click .remove': function (e, value, row, index) {
//		            $.post(URL + "/notify/removeNotify.do",
//		                {ID: row['ID']},
//		                function (resultJSONObject) {
//		                    var index;
//		                    if (resultJSONObject.status == "00") {
//		                        index = layer.msg(resultJSONObject.message, {
//		                            icon: 16
//		                            , shade: 0.6,
//		                            time: 2000
//		                        }, function () {
//		                            $('#NotifyTableFromData').bootstrapTable('refresh');
//		                            layer.close(index);
//		                        });
//		                    } else {
//		                        layer.msg(resultJSONObject.message, {
//		                            icon: 9
//		                            , shade: 0.6,
//		                            time: 2000
//		                        });
//		                    }
//		                });
//		        }
//		    };
	
	
    var admin_name = get_cookie("admin_name");
    if(admin_name  == "" || admin_name == undefined || admin_name.length <= 0){
        top.location.href = "zt_login.html";
    }
    $('#NotifyTableFromData').bootstrapTable({
        height:"69%",
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:URL + "/notify/loadnotify.do",//要请求数据的文件路径
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
        pageList:[2,10,20,30],//分页步进值
        showRefresh:true,//刷新按钮
        showColumns:true,
        search:true,
        clickToSelect: true,//是否启用点击选中行
        toolbar: '#toolbarNotify',//指定工具栏
        locale:'zh-CN',//中文支持
        singleSelect: true, //开启单选
        //onClickRow:rowClicked,
        //  onCheck:rowClicked,
         columns:[
            // {
            //     checkbox: true
            // },
            {
                title:'ID',
                field:'ID'
            },
            {
            	field:'NOID',
                title:'编号',
                formatter: function(value, row, index) {
		        	var str = '&nbsp;';
					str += '<a style="color:blue" href="../../notify/findOne.do?id='+row.ID+'"   >'+value+'</a>';
					return str;
		        }
            },
            {
                title:'标题',
                field:'TITLE',
            },
           /* {
                title:'受众',
                field:'TYPE',
                formatter:typefangfa
                
            },*/
            {
                title:'发布日期',
                field:'NDATE',
            },
            {
                title:'生效日期',
                field:'STARTDATE',
            },
            {
                title:'截止日期',
                field:'ENDDATE'
            },
            {
                title:'状态',
                field:'STATE',
                formatter:typestate
            },
            {
                title:'发布者',
                field:'OPERATOR',
            } 
           , {
                field: 'operate',
                title: '操作',
                align: 'center',
//                events: operateEvents,
                formatter: aFormatter
            }
            ],

        responseHandler:function(res){
            //在ajax获取到数据，渲染表格之前，修改数据源
            console.log(res);
            return res;
        }
    });
    function typefangfa(value,row,index){
        if(value == 99){
            return '<span style="color:#ffbe00"> 全部</span>';
            //return '<i class="fa fa-lock" style="color:red"></i>'
        }else if(value == 1){
            return '<span style="color:#08ac2c"> 商户</span>';
            //return '<i class="fa fa-unlock" style="color:green"></i>'
        }else{
        	return '<span style="color:#08ac2c"> 代理商</span>';
        }
    }

    function typestate(value,row,index){
        if(value == 0){
            return '<span style="color:#ffbe00"> 失效</span>';
            //return '<i class="fa fa-lock" style="color:red"></i>'
        }else if(value == 1){
            return '<span style="color:#08ac2c"> 有效</span>';
            //return '<i class="fa fa-unlock" style="color:green"></i>'
        }
    }
    

    //请求服务数据时所传参数
    function queryParams(params){
        return{
            //每页多少条数据
            pageSize: params.limit,
            //请求第几页
            colOffset:params.offset,
            search:params.search
        }
    }

    var layer ;
    layui.use('layer', function(){
        layer = layui.layer;
    });

    function aFormatter(value, row, index) {
		return [
			'<a href=\"javascript:void(0)\"  onclick="qwe('+row.ID+')"  class=\"btn btn-danger\ ">删除</a> '
		].join("")
	}

})();
$("#btn_percent").click(function () {
    var selectRows =  $('#NotifyTableFromData').bootstrapTable('getSelections');
    $('#rateModal').modal('show');
    $('#business_no_rate').html('代理商名称: ' + selectRows[0].AGENT_DEFINITION);
    var businessman_id = selectRows[0].AGENT_ID;
    $.post(URL + "/notify/findOne.do",
        {
            id: row.ID
        },function(resultJSONObject){

//            if(resultJSONObject.status == "00"){
//                $('#rateValue2').val(resultJSONObject.rows[0].RATE_VALUE);
//                $('#min2').val(resultJSONObject.rows[0].RATE_MIN_MONEY);
//                $('#max2').val(resultJSONObject.rows[0].RATE_MAX_MONEY);
//                $('#tradfee2').val(resultJSONObject.rows[0].RATE_TRAD_FEE);
//                $('#start2').val(resultJSONObject.rows[0].RATE_BEGIN_TIME);
//                $('#end2').val(resultJSONObject.rows[0].RATE_END_TIME);
//            }
        });
});


$('#changeSave').click(function () {
	var gg = $('#gg').val();
    var bh = $('#bh').val();
    var ry = $('#ry').val();
   var sz = $('#search_epType').val();
   var sx = $('#sx').val();
   var  jz= $('#jz').val();
    var bt= $('#bt').val();
   var fb= $('#fb').val();
    var  noticeContentTextarea= $('#noticeContentTextarea').val();
    if(gg == NaN || gg == undefined || gg == ""){
        var index;
        index = layer.msg('请输入公告', function(){
            layer.close(index);
        });
        return;
    }
    if(bh == NaN || bh == undefined || bh == ""){
        var index;
        index = layer.msg('请输入编号', function(){
            layer.close(index);
        });
        return;
    }
    if(ry == NaN || ry == undefined || ry == ""){
        var index;
        index = layer.msg('请输入发布人员', function(){
            layer.close(index);
        });
        return;
    }
    if(sx == NaN || sx == undefined || sx == ""){
        var index;
        index = layer.msg('请输入生效日期', function(){
            layer.close(index);
        });
        return;
    }
    if(jz == NaN || jz == undefined || jz == ""){
        var index;
        index = layer.msg('请输入截止日期', function(){
            layer.close(index);
        });
        return;
    }
    if(bt == NaN || bt == undefined || bt == ""){
        var index;
        index = layer.msg('请输入公告标题', function(){
            layer.close(index);
        });
        return;
    }
    if(fb== NaN || fb == undefined || fb == ""){
        var index;
        index = layer.msg('请输入发布时间', function(){
            layer.close(index);
        });
        return;
    }
//    if(noticeContentTextarea == NaN || noticeContentTextarea == undefined || noticeContentTextarea == ""){
//        var index;
//        index = layer.msg('请输入公告内容', function(){
//            layer.close(index);
//        });
//        return;
//    }
	 $('#rateModal').modal('hide');
	 
	 $.post("../../notify/updateNotifyRate.do",
	            {

	                id:gg,
	                noid:bh,
	                operator:ry,
	                type:sz,
	                startdate:sx,
	                endstart:jz,
	                title:bt,
	                nodate:fb,
	                content:noticeContentTextarea
	            },function(resultJSONObject){

	                var index;
	                if(resultJSONObject.status == "00"){
	                    index = layer.msg(resultJSONObject.message, {
	                        icon: 16
	                        ,shade: 0.6,
	                        time: 2000
	                    },function () {
	                        $('#NotifyTableFromData').bootstrapTable('refresh');
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



