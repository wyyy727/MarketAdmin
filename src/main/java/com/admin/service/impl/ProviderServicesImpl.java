package com.admin.service.impl;

import com.admin.dao.ProviderInfoMapper;
import com.admin.entity.ProviderInfo;
import com.admin.service.ProviderServices;
import com.admin.utils.ProviderInfoResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProviderServicesImpl implements ProviderServices {

    @Autowired
    private ProviderInfoMapper providerInfoMapper;

    @Override
    public ProviderInfoResult<Object> insertProvider(ProviderInfo providerInfo) {
        ProviderInfoResult<Object> result = new ProviderInfoResult<>();
        int res=providerInfoMapper.insert(providerInfo);
        if(res <= 0){
            result.setStatus("Q5");
            result.setMessage("添加失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("添加成功");
        return result;
    }

    @Override
    public ProviderInfoResult<Object> deleteProvider(Integer proId) {
        ProviderInfoResult<Object> result=new ProviderInfoResult<>();
        int res=providerInfoMapper.deleteByPrimaryKey(proId);
        if(res <= 0){
            result.setStatus("Q5");
            result.setMessage("删除失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("删除成功");
        return result;
    }

    @Override
    public ProviderInfoResult<Object> updateProvider(ProviderInfo providerInfo) {
        ProviderInfoResult<Object> result=new ProviderInfoResult<>();
        int res=providerInfoMapper.updateByPrimaryKey(providerInfo);
        if(res <= 0){
            result.setStatus("Q5");
            result.setMessage("修改失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage(" 修改成功");
        return result;
    }

    @Override
    public ProviderInfoResult<List<Map>> getProviderById(Integer proId) {
        ProviderInfoResult<List<Map>> result=new ProviderInfoResult<>();
        List<Map> map=providerInfoMapper.selectByPrimaryKey(proId);
        result.setRows(map);
        result.setStatus("00");
        result.setMessage("成功");
        return result;
    }

    @Override
    public ProviderInfoResult<List<Map>> getAllProvider(int pageSize, int colOffset, String search) {
        ProviderInfoResult<List<Map>> result=new ProviderInfoResult<>();
        if(search.length() > 0){
            List<Map> mapSearch=providerInfoMapper.getAllProviderSearch(pageSize,colOffset,search);
            int countSearch=providerInfoMapper.getAllProCountSearch(search);
            result.setRows(mapSearch);
            result.setTotal(countSearch);
            return result;
        }
        List<Map> maps=providerInfoMapper.getAllProviderInfo(pageSize,colOffset);
        int count=providerInfoMapper.getProviderCount();
        result.setRows(maps);
        result.setTotal(count);
        return result;
    }

    @Override
    public ProviderInfoResult<List<Map>> getProviderNameAndId() {
        ProviderInfoResult<List<Map>> result=new ProviderInfoResult<>();
        List<Map> map = providerInfoMapper.getProviderNameAndId();
        result.setRows(map);
        result.setStatus("00");
        result.setMessage("成功");
        return result;
    }
}
