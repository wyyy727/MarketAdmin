package com.admin.service.impl;

import com.admin.entity.EmpInfo;
import com.admin.dao.EmpInfoMapper;
import com.admin.service.EmpInfoServices;
import com.admin.utils.EmpInfoMessageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//services层的实现类
@Service
public class EmpInfoServicesImpl implements EmpInfoServices {

    @Autowired
    //创建DAO层对象，以此调用DAO层中的方法
    private EmpInfoMapper empInfoMapper;

    @Override
    public EmpInfoMessageResult<Object> deleteByPrimaryKey(Integer empNo) {
        EmpInfoMessageResult<Object> result=new EmpInfoMessageResult<>();
        int res=empInfoMapper.deleteByPrimaryKey(empNo);
        if(res <= 0){
            result.setStatus("Q5");
            result.setMessage("删除失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage(" 删除成功");
        return result;
    }

    @Override
    public EmpInfoMessageResult<Object> insert(EmpInfo record) {
        EmpInfoMessageResult<Object> result=new EmpInfoMessageResult<>();
        int res=empInfoMapper.insert(record);
        if(res > 0){
            result.setStatus("00");
            result.setMessage("添加成功");
            return result;
        }
        result.setStatus("Q5");
        result.setMessage("添加失败");
        return result;

    }

    @Override
    public EmpInfoMessageResult<List<Map>> selectByPrimaryKey(Integer empNo) {
        EmpInfoMessageResult<List<Map>> result=new EmpInfoMessageResult<>();
        List<Map> map=empInfoMapper.selectByPrimaryKey(empNo);
        result.setRows(map);
        result.setStatus("00");
        result.setMessage("成功");
        return result;
    }

    @Override
    public EmpInfoMessageResult<Object> updateByPrimaryKey(EmpInfo record) {
        EmpInfoMessageResult<Object> result=new EmpInfoMessageResult<>();
        int res=empInfoMapper.updateByPrimaryKey(record);
        if(res <= 0){
            result.setStatus("Q5");
            result.setMessage("修改失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("修改成功 ");
        return result;
    }

    @Override
    public EmpInfoMessageResult<List<Map>> getAllEmpInfo(int pageSize, int colOffset, String search) {
        EmpInfoMessageResult<List<Map>> result=new EmpInfoMessageResult<>();
        if(search.length() > 0){
            List<Map> mapSearch=empInfoMapper.getAllEmpInfoSearch(pageSize,colOffset,search);
            int countSearch=empInfoMapper.getEmpInfoCountSearch(search);
            result.setRows(mapSearch);
            result.setTotal(countSearch);
            return result;
        }
        List<Map> map=empInfoMapper.getAllEmpInfo(pageSize,colOffset);
        int count=empInfoMapper.getEmpInfoCount();
        result.setRows(map);
        result.setTotal(count);
        return result;
    }

    @Override
    public EmpInfoMessageResult<List<Map>> getEmpNameAndId() {
        EmpInfoMessageResult<List<Map>> result =new EmpInfoMessageResult<>();
        List<Map> user = empInfoMapper.getEmpNameAndId();
        result.setRows(user);
        result.setStatus("00");
        result.setMessage("成功");
        return result;
    }
}
