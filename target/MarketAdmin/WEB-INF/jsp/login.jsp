<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统登录 - 超市账单管理系统</title>
<link type="text/css" rel="stylesheet" href="/static/css/style.css" />
</head>
<body class="blue-style">
<div id="login">
	<div class="icon"></div>
	<div class="login-box">
		<form method="post" action="userController/checkLogin">
			<dl>
				<dt>用户名：</dt>
				<dd><input type="text" name="name" class="input-text" /></dd>
				<dt>密　码：</dt>
				<dd><input type="password" name="pwd" class="input-text" /></dd>
			</dl>
			<div class="buttons">
				<input type="submit" value="登录系统" class="input-button" />
				<input type="reset" value="重　　填" class="input-button" />
			</div>
		</form>
	</div>
</div>
</body>
</html>
