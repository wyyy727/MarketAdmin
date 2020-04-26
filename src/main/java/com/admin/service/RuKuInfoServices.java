package com.admin.service;

import com.admin.entity.RuKuInfo;
import com.admin.utils.RuKuResult;

import java.util.List;
import java.util.Map;

public interface RuKuInfoServices {

    RuKuResult<List<Map>> getAllRuKuInfo(int pageSize, int colOffset, String search);

    RuKuResult<List<Map>> getRuKuInFoById(Integer id);

    RuKuResult<Object> insertRuKuInfo(RuKuInfo ruKuInfo,int count);

    RuKuResult<Object> deleteRuKu(Integer ruId,Integer amount);

    RuKuResult<Object> updateRuKu();

}
