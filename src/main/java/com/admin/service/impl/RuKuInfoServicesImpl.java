package com.admin.service.impl;

import com.admin.dao.BillInfoMapper;
import com.admin.dao.RuKuInfoMapper;
import com.admin.entity.BillInfo;
import com.admin.entity.RuKuInfo;
import com.admin.service.RuKuInfoServices;
import com.admin.utils.RuKuResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class RuKuInfoServicesImpl implements RuKuInfoServices {

    @Autowired
    private RuKuInfoMapper ruKuInfoMapper;

    @Autowired
    private BillInfoMapper billInfoMapper;

    @Override
    public RuKuResult<List<Map>> getAllRuKuInfo(int pageSize, int colOffset, String search) {
        RuKuResult<List<Map>> ruKuResult=new RuKuResult<>();
        if(search.length() > 0){
            List<Map> mapSearch=ruKuInfoMapper.getAllRuKuInfoSearch(pageSize,colOffset,search);
            int countSearch=ruKuInfoMapper.getRuKuCountSearch(search);
            ruKuResult.setRows(mapSearch);
            ruKuResult.setTotal(countSearch);
            return ruKuResult;
        }
        List<Map> map=ruKuInfoMapper.getAllRuKuInfo(pageSize,colOffset);
        int count=ruKuInfoMapper.getRuKuCount();
        ruKuResult.setRows(map);
        ruKuResult.setTotal(count);
        return ruKuResult;
    }

    @Override
    public RuKuResult<List<Map>> getRuKuInFoById(Integer id) {
        RuKuResult<List<Map>> result=new RuKuResult<>();
        List<Map> map=ruKuInfoMapper.selectByPrimaryKey(id);
        result.setStatus("00");
        result.setMessage("成功");
        result.setRows(map);
        return result;
    }

    @Override
    public RuKuResult<Object> insertRuKuInfo(RuKuInfo ruKuInfo, int count) {
        RuKuResult<Object> result=new RuKuResult<>();
        int billId=ruKuInfo.getBillId();
        BillInfo billInfo = billInfoMapper.selectByPrimaryKey(billId);
        int oldAmount=billInfo.getBillAmount();
        int newAmount=count+oldAmount;
        int res=billInfoMapper.updateBillAmount(billId,newAmount);
        if(res > 0){
            ruKuInfoMapper.insert(ruKuInfo);
            result.setStatus("00");
            result.setMessage("添加成功");
            return  result;
        }
        result.setStatus("Q5");
        result.setMessage("添加失败");
        return result;
    }

    @Override
    public RuKuResult<Object> deleteRuKu(Integer ruId,Integer amount) {
        RuKuResult<Object> result=new RuKuResult<>();
        //System.out.println(id);
        //System.out.println(amount);
        RuKuInfo chuInfo = ruKuInfoMapper.getRuKuInfoById(ruId);
        //System.out.println(chuInfo.toString());
        Integer billId = chuInfo.getBillId();
        //System.out.println(billId);
        Integer oldAmount = billInfoMapper.selectByPrimaryKey(billId).getBillAmount();
        //System.out.println(oldAmount);
        Integer newAmount = oldAmount - amount;
        //System.out.println(newAmount);
        int res=billInfoMapper.updateBillAmount(billId,newAmount);
        if(res > 0){
            ruKuInfoMapper.deleteByPrimaryKey(ruId);
            result.setStatus("00");
            result.setMessage("删除成功");
            return result;
        }
        result.setStatus("Q5");
        result.setMessage("删除失败");
        return result;
    }

    @Override
    public RuKuResult<Object> updateRuKu() {
        return null;
    }
}
