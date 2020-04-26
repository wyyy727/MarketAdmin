<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<script type="text/javascript" src="../../lib/jslib/ckeditor/ckeditor.js" charset="utf-8"></script>
<link id="ckeditorTheme" rel="stylesheet" href="../../lib/jslib/ckeditor/themes/ckeditor.css" type="text/css">
<link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" href="../../lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../lib/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="../../lib/layui/css/layui.css">

    <link rel="stylesheet" href="../../mycss/mycss.css">
    <link rel="stylesheet" href="../../mycss/animate.css">
<script src="../../lib/jslib/My97DatePicker/WdatePicker.js"></script>
<script src="../../lib/layui/lay/modules/laydate.js"></script>
<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title="" style="overflow: auto;padding: 3px;">
		<form id="nofiyAddForm" method="post" action="${pageContext.request.contextPath}/notify/updateNotifyRate.do">
		<center>
			<table class="grid" >
				<tr>
					<th><div class="form-group">公告标题:</div></th>
					<td><div class="form-group"><input id="title"  name="title"  class="form-control input-sm" style="width: 200px;"  data-options="required:true" type="text" value="${notify.title}" required="required">
						<input type="hidden"  value="${notify.id}" name = "id"></div>
					</td>
					<%--<th><div class="form-group">受众:</div></th>
					<td><div class="form-group"><select id="search_epType"  class="form-control input-sm" style="width: 200px;"  class="easyui-combobox" editable="false" name="type"  value="${notify.type}"
							style="width: 150px;">
							<option value="99">全部</option>
							<option value="1">商户</option>
							<option value="2">代理商</option>
						</select></div></td>--%>
				</tr>
				<tr>
					<th><div class="form-group">生效日期:</div></th>
					<td><div class="form-group"><input  name="startDate"  class="form-control input-sm" style="width: 200px;"  value="${notify.startDate}"  id="startDate" data-options="required:true"  type="text" ></div></td> 
					<th><div class="form-group">截止日期:</div></th>
					<td><div class="form-group"><input  name="endDate"  class="form-control input-sm" style="width: 200px;"  value="${notify.endDate}"   id="endDate"  type="text" ></div> </td>
				</tr>
				<tr>
				<th><span>*</span>公告内容:
				
				</th>
				<td colspan="3"  >
					<textarea id="noticeContentTextarea1" cols="65" rows="20" name="content">
					${notify.content}
					</textarea>
					<script type="text/javascript">
						var editor ;  
                        if(!CKEDITOR.instances.noticeContentTextarea){  //判定noticeContentTextarea是否存在  
                             editor= CKEDITOR.replace("noticeContentTextarea1",{width:'98%', height:500}); 
                        }else{  
                             addCkeditor("noticeContentTextarea1");  
                        }  
                        CKEDITOR.instances["noticeContentTextarea1"].on("instanceReady", function () {
							this.document.on("keyup", editorKeyUp);
						});
	                    function addCkeditor(id){  
	                        var editor2 = CKEDITOR.instances[id];  
	                        if(editor2) editor2.destroy(true);//销毁编辑器 content2,然后新增一个  
	                            editor = CKEDITOR.replace(id,{width:'98%', height:500});  
	                    }  
					</script>
				</td>
			</tr>
			<tr>
				<td align="right">&nbsp;</td>
                <td colspan="3" align="center">
                    <input   id="submit1" class="btn btn-primary" type="submit" value="修改"  >
                     <a href="../notify/notify.html"    class="btn btn-default" >返回</a></td>
			</tr> 
		</table>
		</center>
		</form>
	</div>
</div>
<script src="../../lib/jQuery/jquery.min.js"></script>
<script src="../../lib/bootstrap/js/bootstrap.js"></script>
<script src="../../lib/bootstrap-table/bootstrap-table.js"></script>
<script src="../../lib/bootstrap-table/bootstrap-table-mobile.js"></script>
<script src="../../lib/bootstrap-table/bootstrap-table-zh-CN.js"></script>
<script src="../../lib/layui/layui.js"></script>
<script src="../../lib/bootstrap-select/js/bootstrap-select.js"></script>
<script src="../../lib/bootstrap-select/js/i18n/defaults-zh_CN.js"></script>
<script src="../../lib/bootstrap-fileinput/fileinput.js"></script>
<script src="../../lib/bootstrap-fileinput/piexif.js"></script>
<script src="../../lib/bootstrap-fileinput/purify.js"></script>
<script src="../../lib/bootstrap-fileinput/sortable.js"></script>
<script src="../../lib/bootstrap-fileinput/zh.js"></script>

 <script src="../../myjs/addNotify.js"></script>