package com.admin.controller;

import com.admin.entity.BillInfo;
import com.admin.entity.ProviderInfo;
import com.admin.entity.UserInfo;
import com.admin.service.BillsInfoServices;
import com.admin.service.EmpInfoServices;
import com.admin.service.ProviderServices;
import com.admin.utils.*;
import com.fasterxml.jackson.core.JsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/billsInfoController")
public class BillsInfoController {

    @Autowired
    private BillsInfoServices billsInfoServices;

    @Autowired
    private ProviderServices providerServices;

    @RequestMapping("/loadBills.do")
    @ResponseBody
    public BillInfoResult<List<Map>> loadBills(HttpServletResponse response, HttpServletRequest request, String pageSize, String colOffset, String search){
        response.setHeader("Access-Control-Allow-Origin", "*");
        BillInfoResult<List<Map>> result=billsInfoServices.getAllbillsInfo(Integer.parseInt(pageSize),Integer.parseInt(colOffset),search);
        return result;
    }

    @RequestMapping("/getProviderNameAndId.do")
    @ResponseBody
    public ProviderInfoResult<List<Map>> getProviderNameAndId(){
        ProviderInfoResult<List<Map>> map=providerServices.getProviderNameAndId();
        return map;
    }

    @RequestMapping("/deleteBills.do")
    @ResponseBody
    public BillInfoResult<Object> deleteBills(HttpServletResponse response, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        BillInfoResult<Object> result=billsInfoServices.deleteByPrimaryKey(Integer.parseInt(request.getParameter("id")));
        return  result;
    }

    @RequestMapping("/addBills.do")
    @ResponseBody
    public BillInfoResult<Object> addBills(HttpServletResponse response,HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        BillInfo billInfo=new BillInfo();
        billInfo.setBillName(request.getParameter("bill_name"));
        billInfo.setBillPrice(Double.parseDouble(request.getParameter(  "bill_price")));
        billInfo.setBillPerson(request.getParameter("addPerson"));
        billInfo.setBillAmount(Integer.parseInt(request.getParameter("bill_amount")));
        billInfo.setBillMoney(Double.parseDouble(request.getParameter( "bill_money")));
        billInfo.setProviderName(request.getParameter("addProvider"));
        billInfo.setProviderId(Integer.parseInt(request.getParameter("provider_id")));
        billInfo.setBillState("1");
        billInfo.setBillCompany(Integer.parseInt(request.getParameter("bill_company")));
        billInfo.setBillRemark(request.getParameter("bill_remark"));
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateString = formatter.format(new Date());
            billInfo.setBillTime(formatter.parse(dateString));
        }catch (Exception e){
            e.printStackTrace();
        }
        BillInfoResult<Object> result=billsInfoServices.insert(billInfo);
        return result;
    }

    @RequestMapping("/queryId.do")
    @ResponseBody
    public BillInfoResult<List<Map>>  queryId(){
        BillInfoResult<List<Map>> result = new BillInfoResult<List<Map>>();
        List<Map> list = billsInfoServices.queryId();
        result .setRows(list);
        System.out.println(list.size()+"========");
        return  result;
    }

    @RequestMapping("/finOne.do")
    @ResponseBody
    public BillInfoResult<List<Map>>  finOne(HttpServletResponse response,String id){
        response.setHeader("Access-Control-Allow-Origin", "*");
        BillInfoResult<List<Map>> result = billsInfoServices.finOne(Integer.parseInt(id));
        return result;
    }

    @RequestMapping("/updateBillOne.do")
    @ResponseBody
    public BillInfoResult<Object> updateBillOne(HttpServletResponse response,HttpServletRequest request) {
        BillInfo billInfo1=new BillInfo();
        /*
        billId:bill_id,
            billName:bill_name,
            billPrice:bill_price,
            billPerson:addPersonNames,
            billAmount:bill_amount,
            billMoney:bill_money,
            billCompany:bill_company,
            billRemark:bill_remark,
            billPersonId:addPersonIds,
            billProviderId:addProviderIds,
            billProviderName:addProviderNames
         */
        billInfo1.setBillId(Integer.parseInt(request.getParameter("billId")));
        billInfo1.setBillName(request.getParameter("billName"));
        billInfo1.setBillPrice(Double.parseDouble(request.getParameter("billPrice")));
        billInfo1.setBillPerson(request.getParameter("billPerson"));
        billInfo1.setBillAmount(Integer.parseInt(request.getParameter("billAmount")));
        billInfo1.setBillMoney(Double.parseDouble(request.getParameter("billMoney")));
        billInfo1.setBillCompany(Integer.parseInt(request.getParameter("billCompany")));
        billInfo1.setBillRemark(request.getParameter("billRemark"));
        billInfo1.setProviderId(Integer.parseInt(request.getParameter("billPersonId")));
        billInfo1.setProviderName(request.getParameter("billProviderName"));
        billInfo1.setBillState(request.getParameter("upState"));
        BillInfoResult<Object> result =billsInfoServices.updateBillOne(billInfo1);
        return result;
     }



    }
