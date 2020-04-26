package com.admin.service;

import com.admin.entity.ChuKuInfo;
import com.admin.utils.ChuKuResult;

import java.util.List;
import java.util.Map;

public interface ChuKuServices {

    ChuKuResult<List<Map>> getAllChuKuInfo(int pageSize, int colOffset, String search);

    ChuKuResult<List<Map>> getChuKuById(Integer chuId);

    ChuKuResult<Object> insertChuKuInfo(ChuKuInfo chuKuInfo,Integer amount);

    ChuKuResult<Object> deleteChuKuInfo(Integer id,Integer amount);

    ChuKuResult<Object> updateChuKuInfo();

}
