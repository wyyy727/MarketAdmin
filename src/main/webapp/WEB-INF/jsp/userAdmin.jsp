<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/jsp; charset=utf-8" />
<title>Insert title here</title>
<link type="text/css" rel="stylesheet" href="<%=request.getContextPath() %>/css/style.css">
<!-- 引入bootstrap -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<!-- jQuery (Bootstrap 的 JavaScript 插件需要引入 jQuery) -->
      <script src="https://code.jquery.com/jquery.js"></script>
      <!-- 包括所有已编译的插件 -->
      <script src="../../js/bootstrap.min.js"></script>
<script type="text/javascript">
function del(id) {
	var isdelete=confirm('是否确认删除');
	if(isdelete){
		window.location="userController/delete?&id="+id;
	}
}
function update(id) {
	window.location="userController/update?&id="+id;
}


</script>
</head><body>

<div class="menu">

<table>
<tbody><tr><td><form method="post" action="getall">
用户名称：<input name="name" class="input-text" type="text" value="${name}">&nbsp;<input class="btn btn-default" value="查 询" type="submit">
</form></td></tr>
</tbody></table>
</div>
<div class="main">

<div class="optitle clearfix">
<em><input value="添加数据" class="input-button" onclick="window.location='userAdd.jsp'" type="button"></em>
		<div class="title">用户管理&gt;&gt;</div>
	</div>
	<div class="content">
<table class="list">
  <tbody><tr>
    <td width="70" height="29"><div class="STYLE1" align="center">编号</div></td>
    <td width="80"><div class="STYLE1" align="center">用户名称</div></td>
    <td width="100"><div class="STYLE1" align="center">性别</div></td>
    <td width="100"><div class="STYLE1" align="center">年龄</div></td>

    <td width="150"><div class="STYLE1" align="center">电话 </div></td>
    <td width="150"><div class="STYLE1" align="center">地址 </div></td>
    <td width="150"><div class="STYLE1" align="center">权限 </div></td>
     <td width="150"><div class="STYLE1" align="center">操作</div></td>
  </tr>
  
  <c:forEach items="${users }" var="e">
  <tr>
    <td height="23"><span class="STYLE1">${e.userid }</span></td>
    <td><span class="STYLE1">${e.username }</span></td>

    <td><span class="STYLE1">
    	${e.sex }
    </span></td>
    <td><span class="STYLE1">${e.age }</span></td>
    <td><span class="STYLE1">${e.phone }</span></td>
    <td><span class="STYLE1">${e.address }</span></td>
    <td><span class="STYLE1">${e.role }
    </span></td>
	<td>
			<input type="button" value="修改" class="btn btn-info" onClick="javascript:update(${e.userid })"></input>
			<input type="button" value="删除" class="btn btn-warning" onClick="javascript:del(${e.userid })"></input>
			<%-- <a href="javascript:del(${e.userid })">删除</a> --%>
			</td>
  </tr></c:forEach>
</tbody></table>
</div>
</div>
<!-- 跳转到首页时传参过程 -->
	<c:url value="getall" var="first">
		<c:param name="pageIndex" value="1"></c:param>
		<!-- 固化参数 -->
		<c:param name="name" value="${name }"></c:param>
		<c:param name="ispay" value="${ispay }"></c:param>
	</c:url>
	<!-- 跳转到上一页时传参过程 -->
	<c:url value="getall" var="forward">
		<c:param name="pageIndex" value="${pageIndex-1 }"></c:param>
		<c:param name="name" value="${name }"></c:param>
		<c:param name="ispay" value="${ispay }"></c:param>
	</c:url>
	<!-- 跳转到下一页时传参过程 -->
	<c:url value="getall" var="next">
		<c:param name="pageIndex" value="${pageIndex+1 }"></c:param>
		<c:param name="name" value="${name }"></c:param>
		<c:param name="ispay" value="${ispay }"></c:param>
	</c:url>
	<!-- 跳转到尾页时传参过程 -->
	<c:url value="getall" var="end">
		<c:param name="pageIndex" value="${totalPage }"></c:param>
		<c:param name="name" value="${name }"></c:param>
		<c:param name="ispay" value="${ispay }"></c:param>
	</c:url> 
	<p class="text-center">共${totalPage }页</p>
	<%-- ${pageIndex<totalPage }
	${pageIndex>1 } --%>
	<P class="text-center">当前是第${pageIndex }页</P>
	<p class="text-center">
	<c:if test="${pageIndex>1 }">
	<a href="${first }">首页</a>
	<a href="${forward }">上一页</a>
	</c:if>
	<c:if test="${pageIndex<totalPage }">
	<a href="${next }">下一页</a>
	<a href="${end }">尾页</a>
	</c:if></P>
	
</body></html>