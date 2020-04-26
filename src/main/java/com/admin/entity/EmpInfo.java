package com.admin.entity;

import java.io.Serializable;
import java.util.Date;

//员工信息表，对应数据库中的emp_info
public class EmpInfo implements Serializable {
    //员工ID
    private Integer empNo;
    //员工姓名
    private String empName;
    //员工性别
    private Integer empSex;
    //员工入职时间
    private Date empJoindate;
    //员工职位
    private String empDuty;
    //员工生日
    private Date empBirthday;
    //员工联系方式
    private String empPhone;
    //员工邮箱
    private String empEmail;

    public Integer getEmpNo() {
        return empNo;
    }

    public void setEmpNo(Integer empNo) {
        this.empNo = empNo;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName == null ? null : empName.trim();
    }

    public Integer getEmpSex() {
        return empSex;
    }

    public void setEmpSex(Integer empSex) {
        this.empSex = empSex;
    }

    public Date getEmpJoindate() {
        return empJoindate;
    }

    public void setEmpJoindate(Date empJoindate) {
        this.empJoindate = empJoindate;
    }

    public String getEmpDuty() {
        return empDuty;
    }

    public void setEmpDuty(String empDuty) {
        this.empDuty = empDuty == null ? null : empDuty.trim();
    }

    public Date getEmpBirthday() {
        return empBirthday;
    }

    public void setEmpBirthday(Date empBirthday) {
        this.empBirthday = empBirthday;
    }

    public String getEmpPhone() {
        return empPhone;
    }

    public void setEmpPhone(String empPhone) {
        this.empPhone = empPhone == null ? null : empPhone.trim();
    }

    public String getEmpEmail() {
        return empEmail;
    }

    public void setEmpEmail(String empEmail) {
        this.empEmail = empEmail == null ? null : empEmail.trim();
    }

    @Override
    public String toString() {
        return "EmpInfo{" +
                "empNo=" + empNo +
                ", empName='" + empName + '\'' +
                ", empSex='" + empSex + '\'' +
                ", empJoindate=" + empJoindate +
                ", empDuty='" + empDuty + '\'' +
                ", empBirthday=" + empBirthday +
                ", empPhone='" + empPhone + '\'' +
                ", empEmail='" + empEmail + '\'' +
                '}';
    }
}