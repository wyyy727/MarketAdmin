package com.admin.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.admin.dao.LocationDao;
import com.admin.service.LocationService;
import com.admin.utils.LocationMessageResult;
import org.springframework.stereotype.Service;


@Service("locationService")
public class LocationServiceImpl implements LocationService {
	@Resource
	private LocationDao locationDao;
	public LocationMessageResult<List<Map>> LoadProvinceMessage() {
		// TODO Auto-generated method stub
		LocationMessageResult<List<Map>> result = new LocationMessageResult<List<Map>>();
		List<Map> provinceListResult = locationDao.LoadProvince();
		result.setStatus("01");
		result.setMessage("加载成功");
		result.setRows(provinceListResult);

		return result;
	}

	public LocationMessageResult<List<Map>> LoadCityMessage(int provinceId) {
		LocationMessageResult<List<Map>> result = new LocationMessageResult<List<Map>>();
		List<Map> cityListResult = locationDao.LoadCity(provinceId);
		result.setStatus("00");
		result.setMessage("加载成功");
		result.setRows(cityListResult);

		return result;
	}



}
