package com.admin.service.impl;

import com.admin.dao.BillInfoMapper;
import com.admin.entity.BillInfo;
import com.admin.service.BillsInfoServices;
import com.admin.utils.BillInfoResult;
import com.admin.utils.UserInfoMessageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
//services层的实现类
@Service
public class BillsInfoServicesImpl implements BillsInfoServices {

    //创建DAO层对象，以此调用DAO层中的方法
    @Autowired
    private BillInfoMapper billInfoMapper;
    @Override
    public BillInfoResult<List<Map>> getAllbillsInfo(Integer pageSize, Integer colOffset, String search) {
        BillInfoResult<List<Map>> result=new BillInfoResult<>();
        if(search.length()>0){
            List<Map> serachMap=billInfoMapper.getAllbillInfoBySearch(pageSize,colOffset,search);
            int searchCount=billInfoMapper.getbillInfoCountBySearch(search);
            result.setRows(serachMap);
            result.setTotal(searchCount);
        }else{
        List<Map> map=billInfoMapper.getAllbillInfo(pageSize,colOffset);
        int count=billInfoMapper.getbillInfoCount();
        result.setRows(map);
        result.setTotal(count);}
        return result;
    }

    @Override
    public BillInfoResult<Object> deleteByPrimaryKey(Integer id) {
        BillInfoResult<Object> result= new BillInfoResult<>();
        int res=billInfoMapper.deleteByPrimaryKey(id);
        if(res <= 0) {
            result.setStatus("Q5");
            result.setMessage("删除失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("删除成功 ");
        return result;
    }

    @Override
    public BillInfoResult<Object> insert(BillInfo billInfo) {
        BillInfoResult<Object> result= new BillInfoResult<>();
        int res=billInfoMapper.insert(billInfo);
        if(res <= 0) {
            result.setStatus("Q5");
            result.setMessage("增加失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("增加成功");
        return result;
    }

    @Override
    public BillInfoResult<List<Map>> getBillNameAndId() {
        BillInfoResult<List<Map>> result=new BillInfoResult<>();
        List<Map> map=billInfoMapper.getBillNameAndId();
        result.setRows(map);
        result.setStatus("00");
        result.setMessage("成功 ");
        return result;
    }

    @Override
    public List<Map> queryId() {
        List<Map>  list = billInfoMapper.queryId();
        return  list;
    }

    @Override
    public BillInfoResult<List<Map>> finOne(int id) {
        BillInfoResult<List<Map>> result = new BillInfoResult<List<Map>>();
        List<Map> BillInfoByIdResult = billInfoMapper.finOne(id);
        result.setRows(BillInfoByIdResult);
        result.setStatus("00");
        result.setMessage("成功");
        return result;
    }

    @Override
    public BillInfoResult<Object>  updateBillOne(BillInfo billInfo) {
        BillInfoResult<Object> result=new BillInfoResult<>();
        int res=billInfoMapper.updateByPrimaryKey(billInfo);
        if(res > 0){
            result.setStatus("00");
            result.setMessage("修改成功");
            return result;
        }
        result.setStatus("Q5");
        result.setMessage("修改失败");
        return result;
    }
}
