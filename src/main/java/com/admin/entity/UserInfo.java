package com.admin.entity;

//用户表
public class UserInfo {

    private Integer empId;
    //用户ID
    private Integer userId;
    //用户姓名
    private String userName;
    //密码
    private String userPwd;
    //二次密码
    private String userRepwd;
    //用户真实姓名
    private String userRealname;
    //用户权限
    private Integer userPower;
    //下面是set和get方法，可以用来设置对象的属性或者获取对象的属性
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd == null ? null : userPwd.trim();
    }

    public String getUserRepwd() {
        return userRepwd;
    }

    public void setUserRepwd(String userRepwd) {
        this.userRepwd = userRepwd == null ? null : userRepwd.trim();
    }

    public String getUserRealname() {
        return userRealname;
    }

    public void setUserRealname(String userRealname) {
        this.userRealname = userRealname == null ? null : userRealname.trim();
    }

    public Integer getUserPower() {
        return userPower;
    }

    public void setUserPower(Integer userPower) {
        this.userPower = userPower;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userPwd='" + userPwd + '\'' +
                ", userRepwd='" + userRepwd + '\'' +
                ", userRealname='" + userRealname + '\'' +
                ", empID='" + empId + '\'' +
                ", userPower=" + userPower +
                '}';
    }
}