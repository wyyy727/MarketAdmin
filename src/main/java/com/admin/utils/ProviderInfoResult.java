package com.admin.utils;

public class ProviderInfoResult<T> {
    private T rows;
    private Integer total;
    private String status;
    private String message;

    public T getRows() {
        return rows;
    }

    public void setRows(T rows) {
        this.rows = rows;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "UserInfoMessageResult{" +
                "rows=" + rows +
                ", total=" + total +
                ", status='" + status + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
