package com.admin.service.impl;

import com.admin.dao.BillInfoMapper;
import com.admin.dao.ChuKuInfoMapper;
import com.admin.entity.BillInfo;
import com.admin.entity.ChuKuInfo;
import com.admin.service.ChuKuServices;
import com.admin.utils.ChuKuResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class ChuKuServicesImpl implements ChuKuServices {

    @Autowired
    private ChuKuInfoMapper chuKuInfoMapper;

    @Autowired
    private BillInfoMapper billInfoMapper;

    @Override
    public ChuKuResult<List<Map>> getAllChuKuInfo(int pageSize, int colOffset, String search) {
        ChuKuResult<List<Map>> result=new ChuKuResult<>();
        if(search.length() > 0){
            List<Map> mapSearch = chuKuInfoMapper.getAllChuKuInfoSearch(pageSize, colOffset, search);
            int countSearch = chuKuInfoMapper.getChuKuCountSearch(search);
            result.setRows(mapSearch);
            result.setTotal(countSearch);
            return result;
        }
        List<Map> map = chuKuInfoMapper.getAllChuKuInfo(pageSize, colOffset);
        int count= chuKuInfoMapper.getChuKuCount();
        result.setRows(map);
        result.setTotal(count);
        return result;
    }

    @Override
    public ChuKuResult<List<Map>> getChuKuById(Integer chuId) {
        ChuKuResult<List<Map>> result=new ChuKuResult<>();
        List<Map> map = chuKuInfoMapper.selectByPrimaryKey(chuId);
        result.setRows(map);
        result.setStatus("00");
        result.setMessage("成功");
        return result;
    }

    @Override
    public ChuKuResult<Object> insertChuKuInfo(ChuKuInfo chuKuInfo, Integer amount) {
        ChuKuResult<Object> result=new ChuKuResult<>();
        BillInfo billInfo = billInfoMapper.selectByPrimaryKey(chuKuInfo.getBillId());
        Integer oldAmount = billInfo.getBillAmount();
        if(amount > oldAmount){
            result.setStatus("Q5");
            result.setMessage("出库数量大于库存数量");
            return result;
        }else{
            int res=chuKuInfoMapper.insert(chuKuInfo);
            if (res > 0){
                int newAmount = oldAmount - amount;
                Integer billId = chuKuInfo.getBillId();
                int res1=billInfoMapper.updateBillAmount(billId,newAmount);
                if(res1 > 0){
                    result.setStatus("00");
                    result.setMessage("添加成功");
                    return result;
                }else{
                    result.setStatus("Q5");
                    result.setMessage("添加失败");
                    return result;
                }
            }
            }
        result.setStatus("Q5");
        result.setMessage("添加失败");
        return result;
    }

    @Override
    public ChuKuResult<Object> deleteChuKuInfo(Integer id, Integer amount) {
        ChuKuResult<Object> result=new ChuKuResult<>();
        //System.out.println(id);
        //System.out.println(amount);
        ChuKuInfo chuInfo = chuKuInfoMapper.getChuKuById(id);
        //System.out.println(chuInfo.toString());
        Integer billId = chuInfo.getBillId();
        //System.out.println(billId);
        Integer oldAmount = billInfoMapper.selectByPrimaryKey(billId).getBillAmount();
        //System.out.println(oldAmount);
        Integer newAmount = oldAmount + amount;
        //System.out.println(newAmount);
        int res=billInfoMapper.updateBillAmount(billId,newAmount);
        //System.out.println(res);
        if(res > 0){
            chuKuInfoMapper.deleteByPrimaryKey(id);
            result.setStatus("00");
            result.setMessage("删除成功");
            return result;
        }
        result.setStatus("Q5");
        result.setMessage("删除失败");
        return result;
    }

    @Override
    public ChuKuResult<Object> updateChuKuInfo() {
        return null;
    }
}
