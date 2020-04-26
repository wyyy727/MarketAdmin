package com.admin.controller;

import com.admin.dao.BillInfoMapper;
import com.admin.dao.EmpInfoMapper;
import com.admin.entity.RuKuInfo;
import com.admin.service.BillsInfoServices;
import com.admin.service.EmpInfoServices;
import com.admin.service.RuKuInfoServices;
import com.admin.utils.BillInfoResult;
import com.admin.utils.EmpInfoMessageResult;
import com.admin.utils.RuKuResult;
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
@RequestMapping("/ruku")
public class RuKuInfoController {

    @Autowired
    private RuKuInfoServices ruKuInfoServices;

    @Autowired
    private BillsInfoServices billsInfoServices;

    @Autowired
    private EmpInfoServices empInfoServices;

    @RequestMapping("/getAllRuKu.do")
    @ResponseBody
    public RuKuResult<List<Map>> getAllRuKu (HttpServletResponse response, String pageSize, String colOffset, String search){
        response.setHeader("Access-Control-Allow-Origin", "*");
        RuKuResult<List<Map>> result=ruKuInfoServices.getAllRuKuInfo(Integer.parseInt(pageSize),Integer.parseInt(colOffset),search);
        return result;
    }

    @RequestMapping("/addRuKu.do")
    @ResponseBody
    public RuKuResult<Object> addRuKu(HttpServletResponse response, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        /*
        addBill:addBillIds,
            addAmount:addAmounts,
            addDate:addDates,
            addPerson:addPersons,
            addPersonId:addPersonIds,
            addRemark:addRemarks,
            addState:addStates
         */
        RuKuInfo ruKuInfo=new RuKuInfo();
        ruKuInfo.setBillId(Integer.parseInt(request.getParameter("addBill")));
        ruKuInfo.setRuAmount(Integer.parseInt(request.getParameter("addAmount")));
        ruKuInfo.setRuDate(tools.toDate(request.getParameter("addDate")));
        ruKuInfo.setRuPeo(request.getParameter("addPerson"));
        ruKuInfo.setRuPeoId(Integer.parseInt(request.getParameter("addPersonId")));
        ruKuInfo.setRuRemark(request.getParameter("addRemark"));
        ruKuInfo.setRuState(Integer.parseInt(request.getParameter("addState")));
        Integer amount=Integer.parseInt(request.getParameter("addAmount"));
        RuKuResult<Object> result=ruKuInfoServices.insertRuKuInfo(ruKuInfo,amount);
        return result;
    }

    @RequestMapping("/deleteRuKu.do")
    @ResponseBody
    public RuKuResult<Object> deleteRuKu(HttpServletResponse response, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        RuKuResult<Object> result=ruKuInfoServices.deleteRuKu(Integer.parseInt(request.getParameter("ruId")),Integer.parseInt(request.getParameter("amount")));
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
