package com.admin.entity;

import java.util.Date;

public class BillInfo {
    private Integer billId;

    private String billName;

    private Integer billCompany;

    private Double billPrice;

    private Date billTime;

    private String providerName;

    private String billState;

    private String billPerson;

    private String billRemark;

    private Integer billAmount;

    private Double billMoney;

    private Integer providerId;

    public Integer getBillId() {
        return billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public String getBillName() {
        return billName;
    }

    public void setBillName(String billName) {
        this.billName = billName == null ? null : billName.trim();
    }

    public Integer getBillCompany() {
        return billCompany;
    }

    public void setBillCompany(Integer billCompany) {
        this.billCompany = billCompany;
    }

    public Double getBillPrice() {
        return billPrice;
    }

    public void setBillPrice(Double billPrice) {
        this.billPrice = billPrice;
    }

    public Date getBillTime() {
        return billTime;
    }

    public void setBillTime(Date billTime) {
        this.billTime = billTime;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName == null ? null : providerName.trim();
    }

    public String getBillState() {
        return billState;
    }

    public void setBillState(String billState) {
        this.billState = billState == null ? null : billState.trim();
    }

    public String getBillPerson() {
        return billPerson;
    }

    public void setBillPerson(String billPerson) {
        this.billPerson = billPerson == null ? null : billPerson.trim();
    }

    public String getBillRemark() {
        return billRemark;
    }

    public void setBillRemark(String billRemark) {
        this.billRemark = billRemark == null ? null : billRemark.trim();
    }

    public Integer getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(Integer billAmount) {
        this.billAmount = billAmount;
    }

    public Double getBillMoney() {
        return billMoney;
    }

    public void setBillMoney(Double billMoney) {
        this.billMoney = billMoney;
    }

    public Integer getProviderId() {
        return providerId;
    }

    public void setProviderId(Integer providerId) {
        this.providerId = providerId;
    }
}