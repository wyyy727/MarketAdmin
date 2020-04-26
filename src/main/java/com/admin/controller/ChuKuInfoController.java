package com.admin.controller;

import com.admin.entity.ChuKuInfo;
import com.admin.service.BillsInfoServices;
import com.admin.service.ChuKuServices;
import com.admin.service.EmpInfoServices;
import com.admin.utils.BillInfoResult;
import com.admin.utils.ChuKuResult;
import com.admin.utils.EmpInfoMessageResult;
import com.admin.utils.tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@SuppressWarnings("all")
@Controller
@RequestMapping("/chuku")
public class ChuKuInfoController {

    @Autowired
    private ChuKuServices chuKuServices;

    @Autowired
    private BillsInfoServices billsInfoServices;

    @Autowired
    private EmpInfoServices empInfoServices;

    @RequestMapping("/getAllChuKu.do")
    @ResponseBody
    public ChuKuResult<List<Map>> getAllChuKu(HttpServletResponse response, String pageSize, String colOffset, String search){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ChuKuResult<List<Map>> result=chuKuServices.getAllChuKuInfo(Integer.parseInt(pageSize),Integer.parseInt(colOffset),search);
        return result;
    }

    @RequestMapping("/addChuKu.do")
    @ResponseBody
    public ChuKuResult<Object> addChuKu(HttpServletResponse response, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ChuKuInfo chuKuInfo=new ChuKuInfo();
        /*
        待续
        addBill:addBillIds,
            addAmount:addAmounts,
            addDate:addDates,
            addPerson:addPersons,
            addPersonId:addPersonIds,
            addRemark:addRemarks,
            addState:addStates
         */
        chuKuInfo.setBillId(Integer.parseInt(request.getParameter("addBill")));
        chuKuInfo.setChuAmount(Integer.parseInt(request.getParameter("addAmount")));
        chuKuInfo.setChuDate(tools.toDate(request.getParameter("addDate")));
        chuKuInfo.setChuPeo(request.getParameter("addPerson"));
        chuKuInfo.setChuProId(Integer.parseInt(request.getParameter("addPersonId")));
        chuKuInfo.setChuRemark(request.getParameter("addRemark"));
        chuKuInfo.setChuState(Integer.parseInt(request.getParameter("addState")));
        ChuKuResult<Object> result=chuKuServices.insertChuKuInfo(chuKuInfo,Integer.parseInt(request.getParameter("addAmount")));
        return result;
    }

    @RequestMapping("/deleteChuKu.do")
    @ResponseBody
    public ChuKuResult<Object> deleteChuKu(HttpServletResponse response, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ChuKuResult<Object> result=chuKuServices.deleteChuKuInfo(Integer.parseInt(request.getParameter("id")),Integer.parseInt(request.getParameter("amount")));
        return result;
    }

    @RequestMapping("/getEmpName.do")
    @ResponseBody
    public EmpInfoMessageResult<List<Map>> getEmpName(HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin","*");
        EmpInfoMessageResult<List<Map>> result=empInfoServices.getEmpNameAndId();
        return result;
    }

    @RequestMapping("/getBillName.do")
    @ResponseBody
    public BillInfoResult<List<Map>> getBillName(HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin","*");
        BillInfoResult<List<Map>> result=billsInfoServices.getBillNameAndId();
        return result;
    }

}
