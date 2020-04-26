package com.admin.entity;

import java.util.Date;

public class ProviderInfo {
    private Integer proId;

    private String proName;

    private String provContame;

    private String proDate;

    private String proPhone;

    private String proEmail;

    private String proAddress;

    private Integer proState;

    private String proRemark;

    public Integer getProId() {
        return proId;
    }

    public void setProId(Integer proId) {
        this.proId = proId;
    }

    public String getProName() {
        return proName;
    }

    public void setProName(String proName) {
        this.proName = proName == null ? null : proName.trim();
    }

    public String getProvContame() {
        return provContame;
    }

    public void setProvContame(String provContame) {
        this.provContame = provContame == null ? null : provContame.trim();
    }

    public String getProDate() {
        return proDate;
    }

    public void setProDate(String proDate) {
        this.proDate = proDate;
    }

    public String getProPhone() {
        return proPhone;
    }

    public void setProPhone(String proPhone) {
        this.proPhone = proPhone == null ? null : proPhone.trim();
    }

    public String getProEmail() {
        return proEmail;
    }

    public void setProEmail(String proEmail) {
        this.proEmail = proEmail == null ? null : proEmail.trim();
    }

    public String getProAddress() {
        return proAddress;
    }

    public void setProAddress(String proAddress) {
        this.proAddress = proAddress == null ? null : proAddress.trim();
    }

    public Integer getProState() {
        return proState;
    }

    public void setProState(Integer proState) {
        this.proState = proState;
    }

    public String getProRemark() {
        return proRemark;
    }

    public void setProRemark(String proRemark) {
        this.proRemark = proRemark == null ? null : proRemark.trim();
    }
}