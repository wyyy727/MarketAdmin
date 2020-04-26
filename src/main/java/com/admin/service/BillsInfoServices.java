package com.admin.service;

import com.admin.entity.BillInfo;
import com.admin.utils.BillInfoResult;

import java.util.List;
import java.util.Map;

public interface BillsInfoServices {
    public BillInfoResult<List<Map>> getAllbillsInfo(Integer pageSize, Integer colOffset, String search);
    public BillInfoResult<Object> deleteByPrimaryKey(Integer id);

    BillInfoResult<Object> insert(BillInfo billInfo);

    BillInfoResult<List<Map>> getBillNameAndId();
    List<Map> queryId();

    BillInfoResult<List<Map>> finOne(int parseInt);

    BillInfoResult<Object>  updateBillOne(BillInfo billInfo);
}
