
//var layer ;
//layui.use('layer', function(){
//    layer = layui.layer;
//});
//
//
//
//
//$(function() {
//	$('#nofiyAddForm').form({
//		url : '../../notify/add.do',
//		onSubmit : function() {
//			progressLoad();
//			var isValid = $(this).form('validate');
//			if (!isValid) {
//				progressClose();
//			}
//			return isValid;
//		},
//		success : function(result) {
//			result = $.parseJSON(result);
//			progressClose();
//			if (result.success) {
//				parent.$.messager.alert('提示', result.msg, 'info');
//				$('#nofiyAddForm input').val('');
//			} else {
//				parent.$.messager.alert('错误', result.msg, 'error');
//			}
//		}
//	});
//	});

 
//执行一个laydate实例
laydate.render({
	  elem: '#startDate'
		  ,theme: 'molv'
			  ,type: 'datetime'
}); 

//执行一个laydate实例
laydate.render({
	  elem: '#endDate'
		  ,theme: 'molv'
			  ,type: 'datetime'
}); 
 


//$('#submit1').click(function () {
//    var title = $('#title').val();
//    var type = $('#search_epType').val();
//    var startDate = $('#startDate').val();
//    var endDate = $('#endDate').val();
////   var content1 = $('textarea[name="content1"]').val()
////    var content1=$('#content1').val();
//    alert(content1)
//    if(title == NaN || title == undefined || title == ""){
//        var index;
//        index = layer.msg('请输入标题', function(){
//            layer.close(index);
//        });
//        return;
//    }
//    if(startDate == NaN || startDate == undefined || startDate == ""){
//        var index;
//        index = layer.msg('请输入生效日期', function(){
//            layer.close(index);
//        });
//        return;
//    }
//    if(endDate == NaN || endDate == undefined || endDate == ""){
//        var index;
//        index = layer.msg('请输入截止日期', function(){
//            layer.close(index);
//        });
//        return;
//    }
//    if(content1== NaN || content1 == undefined || content1 == ""){
//        var index;
//        index = layer.msg('请输入公告内容', function(){
//            layer.close(index);
//        });
//        return;
//    }
//    
//    
//    
//    $.post( "../../notify/add.do",
//        {
//    	title:title,
//    	type:type,
//    	startDate1:startDate,
//    	endDate1:endDate,
//    	content:content1
//        },function(resultJSONObject){
//             $.ajaxSettings.async = true;
//            var index;
//            if(resultJSONObject.status == "00"){
//                set_cookie("admin_name",admin_name);// 设置cookie 1小时
////                alert(get_cookie("status"));
//                index = layer.msg(resultJSONObject.message, {
//                    icon: 16
//                    ,shade: 0.6,
//                    time: 2000
//                },function () {
//                    window.location.href = "index.html";
//                });
//            }else{
//                layer.msg(resultJSONObject.message, {
//                    icon: 9
//                    ,shade: 0.6,
//                    time: 2000
//                });
//            }
//
//        });
//
//
//});