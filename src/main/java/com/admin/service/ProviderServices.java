package com.admin.service;

import com.admin.entity.ProviderInfo;
import com.admin.utils.ProviderInfoResult;

import java.util.List;
import java.util.Map;

public interface ProviderServices {

    ProviderInfoResult<Object> insertProvider(ProviderInfo providerInfo);

    ProviderInfoResult<Object> deleteProvider(Integer proId);

    ProviderInfoResult<Object> updateProvider(ProviderInfo providerInfo);

    ProviderInfoResult<List<Map>> getProviderById(Integer proId);

    ProviderInfoResult<List<Map>> getAllProvider(int pageSize, int colOffset, String search);

    ProviderInfoResult<List<Map>> getProviderNameAndId();

}
