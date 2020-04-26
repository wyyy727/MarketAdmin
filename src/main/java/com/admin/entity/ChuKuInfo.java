package com.admin.entity;

import java.util.Date;

public class ChuKuInfo {
    private Integer chuId;

    private Integer chuAmount;

    private Integer billId;

    private Date chuDate;

    private String chuPeo;

    private Integer chuProId;

    private String chuRemark;

    private Integer chuState;

    public Integer getChuId() {
        return chuId;
    }

    public void setChuId(Integer chuId) {
        this.chuId = chuId;
    }

    public Integer getChuAmount() {
        return chuAmount;
    }

    public void setChuAmount(Integer chuAmount) {
        this.chuAmount = chuAmount;
    }

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Date getChuDate() {
        return chuDate;
    }

    public void setChuDate(Date chuDate) {
        this.chuDate = chuDate;
    }

    public String getChuPeo() {
        return chuPeo;
    }

    public void setChuPeo(String chuPeo) {
        this.chuPeo = chuPeo == null ? null : chuPeo.trim();
    }

    public Integer getChuProId() {
        return chuProId;
    }

    public void setChuProId(Integer chuProId) {
        this.chuProId = chuProId;
    }

    public String getChuRemark() {
        return chuRemark;
    }

    public void setChuRemark(String chuRemark) {
        this.chuRemark = chuRemark == null ? null : chuRemark.trim();
    }

    public Integer getChuState() {
        return chuState;
    }

    public void setChuState(Integer chuState) {
        this.chuState = chuState;
    }

    @Override
    public String toString() {
        return "ChuKuInfo{" +
                "chuId=" + chuId +
                ", chuAmount=" + chuAmount +
                ", billId=" + billId +
                ", chuDate=" + chuDate +
                ", chuPeo='" + chuPeo + '\'' +
                ", chuProId=" + chuProId +
                ", chuRemark='" + chuRemark + '\'' +
                ", chuState=" + chuState +
                '}';
    }
}