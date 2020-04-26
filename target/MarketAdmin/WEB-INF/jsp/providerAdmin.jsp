<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Insert title here</title>
<script type="text/javascript">
function doit(flag,id)
{
	if(flag=="del")
	{
		if(confirm("确认删除吗？")!=true)
			return;
	}
	window.location = "provider.do?id="+id+"&flag="+flag;
}
</script>
<link type="text/css" rel="stylesheet" href="<%=request.getContextPath() %>/css/style.css">
<!-- 引入bootstrap -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<!-- jQuery (Bootstrap 的 JavaScript 插件需要引入 jQuery) -->
      <script src="https://code.jquery.com/jquery.js"></script>
      <!-- 包括所有已编译的插件 -->
      <script src="../../js/bootstrap.min.js"></script>
</head>
<body>
<div class="menu">

<table>
<tbody><tr><td><form method="post" action="providerGetAll">
供应商名称：<input name="name" class="input-text" type="text"> &nbsp;&nbsp;&nbsp;&nbsp;供应商描述：<input name="describe" class="input-text" type="text">&nbsp;&nbsp;&nbsp;&nbsp;<input value="组 合 查 询" type="submit">
</form></td></tr>
</tbody></table>
</div>
<div class="main">
<div class="optitle clearfix">
<em><input value="添加数据" class="input-button" onclick="window.location='providerAdd.jsp'" type="button"></em>
		<div class="title">供应商管理&gt;&gt;</div>
	</div>

	<div class="content">
<table class="list">
  <tbody><tr>
    <td width="70" height="29"><div class="STYLE1" align="center">编号</div></td>
    <td width="80"><div class="STYLE1" align="center">供应商名称</div></td>
    <td width="100"><div class="STYLE1" align="center">供应商描述</div></td>
    <td width="100"><div class="STYLE1" align="center">联系人</div></td>

    <td width="100"><div class="STYLE1" align="center">电话</div></td>
    <td width="100"><div class="STYLE1" align="center">地址</div></td>
    <td width="100"><div class="STYLE1" align="center">传真</div></td>
  </tr>
  
  <c:forEach items="${providers }" var="e">
  <tr>
   <td height="23"><span class="STYLE1">${e.providerid }</span></td>
    <td><span class="STYLE1">${e.name }</span></td>

    <td><span class="STYLE1">
    	${e.describe }
    </span></td>
    <td><span class="STYLE1">${e.contact }</span></td>
    <td><span class="STYLE1">${e.phone }</span></td>
    <td><span class="STYLE1">${e.address }</span></td>
    <td><span class="STYLE1">${e.fax }
    </span></td>
	<td>		
				<input type="button" value="修改" class="btn btn-info" onClick="javascript:update(${e.userid })"></input>
			    <input type="button" value="删除" class="btn btn-warning" onClick="javascript:del(${e.userid })"></input>
				<%-- <a href="javascript:update(${e.providerid })">修改</a>
				<a href="javascript:del(${e.providerid })">删除</a> --%>
			</td>
  </tr>
  </c:forEach>
  
</tbody></table>
	</div>
</div>
<!-- 跳转到首页时传参过程 -->
	<c:url value="GetAlll" var="first">
		<c:param name="pageIndex" value="1"></c:param>
		<!-- 固化参数 -->
		<c:param name="name" value="${name }"></c:param>
		<c:param name="describe" value="${describe }"></c:param>
	</c:url>
	<!-- 跳转到上一页时传参过程 -->
	<c:url value="GetAll" var="forward">
		<c:param name="pageIndex" value="${pageIndex-1 }"></c:param>
		<c:param name="name" value="${name }"></c:param>
		<c:param name="describe" value="${describe }"></c:param>
	</c:url>
	<!-- 跳转到下一页时传参过程 -->
	<c:url value="GetAll" var="next">
		<c:param name="pageIndex" value="${pageIndex+1 }"></c:param>
		<c:param name="name" value="${name }"></c:param>
		<c:param name="describe" value="${describe }"></c:param>
	</c:url>
	<!-- 跳转到尾页时传参过程 -->
	<c:url value="GetAll" var="end">
		<c:param name="pageIndex" value="${totalPage }"></c:param>
		<c:param name="name" value="${name }"></c:param>
		<c:param name="describe" value="${describe }"></c:param>
	</c:url> 
	共${totalPage }页<%-- 
	${pageIndexs<totalPage }
	${pageIndexs>1 } --%>
	${pageIndex }
	<%-- <c:if test="${pageIndex>1 }"> --%>
	<a href="${first }">首页</a>
	<a href="${forward }">上一页</a>
	<%-- </c:if> --%>
	<%-- <c:if test="${pageIndex<totalPage }"> --%>
	<a href="${next }">下一页</a>
	<a href="${end }">尾页</a>
	<%-- </c:if> --%>
</body></html>