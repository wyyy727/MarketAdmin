package com.admin.dao;

import java.util.List;
import java.util.Map;

import com.admin.entity.EmpInfo;
import org.apache.ibatis.annotations.Param;


public interface EmpInfoMapper {
    //根据员工ID删除一个用户对象
    int deleteByPrimaryKey(Integer empNo);
    //添加一个员工对象
    int insert(EmpInfo record);
    //根据员工ID获取一个员工对象
    List<Map> selectByPrimaryKey(Integer empNo);
    //更新一个员工的信息（修改员工信息）
    int updateByPrimaryKey(EmpInfo record);
    List<Map> getAllEmpInfo(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset);
    //获取全体员工个数
    int getEmpInfoCount();
    List<Map> getAllEmpInfoSearch(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset, @Param("search") String search);
    //获取全体员工个数
    int getEmpInfoCountSearch(@Param("search") String search);

    List<Map> getEmpNameAndId();
}