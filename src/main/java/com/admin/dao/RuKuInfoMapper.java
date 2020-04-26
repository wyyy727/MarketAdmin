package com.admin.dao;


import java.util.List;
import java.util.Map;

import com.admin.entity.RuKuInfo;
import org.apache.ibatis.annotations.Param;

public interface RuKuInfoMapper {

    int deleteByPrimaryKey(Integer ruId);

    int insert(RuKuInfo record);

    int updateByPrimaryKey(RuKuInfo record);

    List<Map> selectByPrimaryKey(Integer ruId);

    List<Map> getAllRuKuInfo(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset);

    int getRuKuCount();

    List<Map> getAllRuKuInfoSearch(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset, @Param("search") String search);

    int getRuKuCountSearch(@Param("search") String search);

    RuKuInfo getRuKuInfoById(Integer RuID);
}