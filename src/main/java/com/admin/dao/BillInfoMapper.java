package com.admin.dao;


import java.util.List;
import java.util.Map;

import com.admin.entity.BillInfo;
import org.apache.ibatis.annotations.Param;

public interface BillInfoMapper {

    int deleteByPrimaryKey(Integer billId);

    int insert(BillInfo record);

    BillInfo selectByPrimaryKey(Integer billId);

    int updateByPrimaryKey(BillInfo record);

    List<Map> getAllbillInfo(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset);
    List<Map> getAllbillInfoBySearch(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset, @Param("search") String search);
    int getbillInfoCount();
    int getbillInfoCountBySearch(@Param("search") String search);

    int updateBillAmount(@Param("billId") int billId, @Param("amount") Integer amount);

    List<Map> getBillNameAndId();
    List<Map> queryId();

    List<Map> finOne(int id);

    int updateBillOne(BillInfo billInfo);
}