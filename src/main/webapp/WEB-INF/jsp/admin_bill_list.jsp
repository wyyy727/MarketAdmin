<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<link type="text/css" rel="stylesheet" href="<%=request.getContextPath() %>/css/style.css" />
<script type="text/javascript">
function del(id) {
	var isdelete=confirm('是否确认删除');
	if(isdelete){
		window.location="delete?&id="+id;
	}
}
function update(id) {
	window.location="update?&id="+id;
}


</script>
</head>
<body>
<div class="menu">
	<form method="get" action="billController/getall">
		商品名称：<input type="text" name="name" class="input-text" />&nbsp;&nbsp;&nbsp;&nbsp;
		是否付款：<select name="ispay">
			<option value="">请选择</option>
			<option value="yes">已付款</option>
			<option value="no">未付款</option>
		</select>&nbsp;&nbsp;&nbsp;&nbsp;
		<input type="submit" name="submit" value="组合查询" class="button" />
	</form>
</div>
<div class="main">
	<div class="optitle clearfix">
		<em><input type="button" name="button" value="添加数据" class="input-button" onclick="location.href='modify.jsp'" /></em>
		<div class="title">账单管理&gt;&gt;</div>
	</div>
	<div class="content">
		<table class="list">
			<tr>
				<td>账单编号</td>
				<td>商品名称</td>
				<td>商品数量</td>
				<td>交易金额</td>
				<td>是否付款</td>
				<td>供应商名称</td>
				<td>商品描述</td>
				<td>账单时间</td>
				<td>操作</td>
			</tr>
			<c:forEach items="${bills }" var="e">
			<tr>
				<td>${e.billid }</td>
				<td>${e.name }</td>
				<td>${e.number }</td>
				<td>${e.money }</td>
				<td>${e.ispay }</td>
				<td>${e.providername }</td>
				<td>${e.describe }</td>
				<td>${e.billtime }</td>
				<td>
				<a href="javascript:update(${e.billid })">修改</a>
				<a href="javascript:del(${e.billid })">删除</a>
			</td>
			</tr>
			</c:forEach>
		</table>
	</div>
</div>
<!-- 跳转到首页时传参过程 -->
	<c:url value="getall" var="first">
		<c:param name="pageIndex" value="1"></c:param>
		<!-- 固化参数 -->
		<c:param name="name" value="${name }"></c:param>
	</c:url>
	<!-- 跳转到上一页时传参过程 -->
	<c:url value="getall" var="forward">
		<c:param name="pageIndex" value="${pageIndex-1 }"></c:param>
		<c:param name="name" value="${name }"></c:param>
	</c:url>
	<!-- 跳转到下一页时传参过程 -->
	<c:url value="getall" var="next">
		<c:param name="pageIndex" value="${pageIndex+1 }"></c:param>
		<c:param name="name" value="${name }"></c:param>
	</c:url>
	<!-- 跳转到尾页时传参过程 -->
	<c:url value="getall" var="end">
		<c:param name="pageIndex" value="${totalPage }"></c:param>
		<c:param name="name" value="${name }"></c:param>
	</c:url> 
	共${totalPage }页<br>
	当前是第${pageIndex }页<br>
	<%-- <c:if test="${pageIndex>1 }"> --%>
	<a href="${first }">首页</a>
	<a href="${forward }">上一页</a>
	<%-- </c:if> --%>
	<%-- <c:if test="${pageIndex<totalPage }"> --%>
	<a href="${next }">下一页</a>
	<a href="${end }">尾页</a>
	<%-- </c:if> --%>
</body>
</html>
