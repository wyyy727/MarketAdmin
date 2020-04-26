package com.admin.dao;


import java.util.List;
import java.util.Map;

import com.admin.entity.ProviderInfo;
import org.apache.ibatis.annotations.Param;

public interface ProviderInfoMapper {

    int deleteByPrimaryKey(Integer proId);

    int insert(ProviderInfo record);

    List<Map> selectByPrimaryKey(Integer proId);

    int updateByPrimaryKey(ProviderInfo record);

    //没有条件的获取全部
    List<Map> getAllProviderInfo(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset);

    int getProviderCount();

    //有条件的查询全部
    List<Map> getAllProviderSearch(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset, @Param("search") String search);

    int getAllProCountSearch(@Param("search")String search);

    List<Map> getProviderNameAndId();
}