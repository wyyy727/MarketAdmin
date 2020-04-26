package com.admin.service;

import com.admin.entity.EmpInfo;
import com.admin.utils.EmpInfoMessageResult;

import java.sql.Date;
import java.util.List;
import java.util.Map;

//services层
public interface EmpInfoServices {

    //根据员工ID删除一个用户对象
    EmpInfoMessageResult<Object> deleteByPrimaryKey(Integer empNo);
    //添加一个员工对象
    EmpInfoMessageResult<Object> insert(EmpInfo record);
    //根据员工ID获取一个员工对象
    EmpInfoMessageResult<List<Map>> selectByPrimaryKey(Integer empNo);
    //更新一个员工的信息（修改员工信息）
    EmpInfoMessageResult<Object> updateByPrimaryKey(EmpInfo record);
    //通过各种查询条件获取全部的员工对象
    EmpInfoMessageResult<List<Map>> getAllEmpInfo(int pageSize, int colOffset, String search);

    EmpInfoMessageResult<List<Map>> getEmpNameAndId();

}
