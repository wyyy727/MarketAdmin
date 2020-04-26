package com.admin.entity;

import java.util.Date;

public class RuKuInfo {
    private Integer ruId;

    private Integer ruAmount;

    private Integer billId;

    private Date ruDate;

    private String ruPeo;

    private Integer ruPeoId;

    private String ruRemark;

    private Integer ruState;

    public Integer getRuId() {
        return ruId;
    }

    public void setRuId(Integer ruId) {
        this.ruId = ruId;
    }

    public Integer getRuAmount() {
        return ruAmount;
    }

    public void setRuAmount(Integer ruAmount) {
        this.ruAmount = ruAmount;
    }

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Date getRuDate() {
        return ruDate;
    }

    public void setRuDate(Date ruDate) {
        this.ruDate = ruDate;
    }

    public String getRuPeo() {
        return ruPeo;
    }

    public void setRuPeo(String ruPeo) {
        this.ruPeo = ruPeo == null ? null : ruPeo.trim();
    }

    public Integer getRuPeoId() {
        return ruPeoId;
    }

    public void setRuPeoId(Integer ruPeoId) {
        this.ruPeoId = ruPeoId;
    }

    public String getRuRemark() {
        return ruRemark;
    }

    public void setRuRemark(String ruRemark) {
        this.ruRemark = ruRemark == null ? null : ruRemark.trim();
    }

    public Integer getRuState() {
        return ruState;
    }

    public void setRuState(Integer ruState) {
        this.ruState = ruState;
    }
}