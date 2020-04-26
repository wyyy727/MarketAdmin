package com.admin.dao;


import java.util.List;
import java.util.Map;

import com.admin.entity.ChuKuInfo;
import org.apache.ibatis.annotations.Param;

public interface ChuKuInfoMapper {

    int deleteByPrimaryKey(Integer chuId);

    int insert(ChuKuInfo record);


    List<Map> selectByPrimaryKey(Integer chuId);


    int updateByPrimaryKey(ChuKuInfo record);

    List<Map> getAllChuKuInfo(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset);

    int getChuKuCount();

    List<Map> getAllChuKuInfoSearch(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset,@Param("search") String search);

    int getChuKuCountSearch(@Param("search") String search);

    ChuKuInfo getChuKuById(@Param("chuId") Integer chuId);
}