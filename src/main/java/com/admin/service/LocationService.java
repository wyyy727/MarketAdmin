package com.admin.service;

import com.admin.utils.LocationMessageResult;

import java.util.List;
import java.util.Map;

public interface LocationService {

	 LocationMessageResult<List<Map>> LoadProvinceMessage();

	 LocationMessageResult<List<Map>> LoadCityMessage(int provinceId);
}
