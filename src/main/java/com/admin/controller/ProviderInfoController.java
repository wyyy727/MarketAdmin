package com.admin.controller;

import com.admin.entity.ProviderInfo;
import com.admin.service.LocationService;
import com.admin.service.ProviderServices;
import com.admin.utils.LocationMessageResult;
import com.admin.utils.ProviderInfoResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@SuppressWarnings("all")
@Controller
@RequestMapping("/providerController")
public class ProviderInfoController {

    @Autowired
    private ProviderServices providerServices;

    @Resource
    private LocationService locationService;

    @RequestMapping("/provinces.do")
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

    @RequestMapping("/getAllProviderInfo.do")
    @ResponseBody
    public ProviderInfoResult<List<Map>> getAllProviderInfo(HttpServletResponse response, String pageSize, String colOffset, String search){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ProviderInfoResult<List<Map>> result=providerServices.getAllProvider(Integer.parseInt(pageSize),Integer.parseInt(colOffset),search);
        return result;
    }

    @RequestMapping("/getProviderById.do")
    @ResponseBody
    public ProviderInfoResult<List<Map>> getProviderById(HttpServletResponse response, String id){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ProviderInfoResult<List<Map>> result=providerServices.getProviderById(Integer.parseInt(id));
        return result;
    }

    @RequestMapping("/updateProvider.do")
    @ResponseBody
    public ProviderInfoResult<Object> updateProvider(HttpServletResponse response, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ProviderInfo providerInfo=new ProviderInfo();
        providerInfo.setProId(Integer.parseInt(request.getParameter("upProId")));
        providerInfo.setProName(request.getParameter("upProName"));
        providerInfo.setProvContame(request.getParameter("upContName"));
        providerInfo.setProDate(request.getParameter("upDate"));
        providerInfo.setProPhone(request.getParameter("upPhone"));
        providerInfo.setProEmail(request.getParameter("upEmail"));
        providerInfo.setProAddress(request.getParameter("upaddress"));
        providerInfo.setProState(Integer.parseInt(request.getParameter("upState")));
        providerInfo.setProRemark(request.getParameter("upRemark"));
        ProviderInfoResult<Object> result=providerServices.updateProvider(providerInfo);
        return result;
    }

    @RequestMapping("/addProvider.do")
    @ResponseBody
    public ProviderInfoResult<Object> addProvider(HttpServletResponse response, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ProviderInfo providerInfo=new ProviderInfo();
        providerInfo.setProName(request.getParameter("addProName"));
        providerInfo.setProvContame(request.getParameter("addContName"));
        providerInfo.setProDate(request.getParameter("addDate"));
        providerInfo.setProPhone(request.getParameter("addPhone"));
        providerInfo.setProEmail(request.getParameter("addEmail"));
        /*String provice=request.getParameter("province");
        String city=request.getParameter("city");*/
        String address=request.getParameter("address");
        //String addresss=provice+city+address;
        //String addresss=provice+city+address;
        providerInfo.setProAddress(address);
        providerInfo.setProState(1);
        providerInfo.setProRemark(request.getParameter("addRemark"));
        ProviderInfoResult<Object> result=providerServices.insertProvider(providerInfo);
        return result;
    }

    @RequestMapping("/deleteProvider.do")
    @ResponseBody
    public ProviderInfoResult<Object> deleteProvider(HttpServletResponse response, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ProviderInfoResult<Object> result=providerServices.deleteProvider(Integer.parseInt(request.getParameter("id")));
        return result;
    }
}
