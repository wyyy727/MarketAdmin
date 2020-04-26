package com.admin.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import com.admin.service.LocationService;
import com.admin.utils.LocationMessageResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
@RequestMapping("/location")
public class LoadLocationController {
	@Resource
	private LocationService locationService;

	@RequestMapping("/province.do")
	@ResponseBody
	public LocationMessageResult<List<Map>> LoadProvince(HttpServletResponse response){
		response.setHeader("Access-Control-Allow-Origin", "*");
		LocationMessageResult<List<Map>> result = locationService.LoadProvinceMessage();
		return result;
	}


	@RequestMapping("/city.do")
	@ResponseBody
	public LocationMessageResult<List<Map>> Loadcity(HttpServletResponse response,String provinceId){
		response.setHeader("Access-Control-Allow-Origin", "*");
		LocationMessageResult<List<Map>> result = locationService.LoadCityMessage(Integer.parseInt(provinceId));
		return result;
	}
}
