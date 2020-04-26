package com.admin.controller;

import com.admin.entity.EmpInfo;
import com.admin.service.EmpInfoServices;
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
@RequestMapping("/empinfoController")
public class EmpInfoController {

    @Autowired
    private EmpInfoServices empInfoServices;

    @RequestMapping("/index")
    public String empindex(){
        return "empIndex";
    }

    @RequestMapping("/getAllEmpInfo.do")
    @ResponseBody
    public EmpInfoMessageResult<List<Map>> getAllEmpInfo(HttpServletResponse response,String pageSize, String colOffset, String search){
        response.setHeader("Access-Control-Allow-Origin", "*");
        EmpInfoMessageResult<List<Map>> result=empInfoServices.getAllEmpInfo(Integer.parseInt(pageSize),Integer.parseInt(colOffset),search);
        return result;
    }

    @RequestMapping("/getAllEmpInfoById.do")
    @ResponseBody
    public EmpInfoMessageResult<List<Map>> getAllEmpInfoById(HttpServletResponse response, String id){
        response.setHeader("Access-Control-Allow-Origin", "*");
        EmpInfoMessageResult<List<Map>> result=empInfoServices.selectByPrimaryKey(Integer.parseInt(id));
        return result;
    }

    @RequestMapping("/addEmpInfo.do")
    @ResponseBody
    public EmpInfoMessageResult<Object> addEmpInfo(HttpServletResponse response,HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        EmpInfo empInfo=new EmpInfo();
        empInfo.setEmpName(request.getParameter("newNames"));
        empInfo.setEmpSex(Integer.parseInt(request.getParameter("newSexs")));
        empInfo.setEmpDuty(request.getParameter("newDutys"));
        empInfo.setEmpPhone(request.getParameter("newPhones"));
        empInfo.setEmpEmail(request.getParameter("newEmails"));
        empInfo.setEmpJoindate(tools.toDate(request.getParameter("newJoins")));
        empInfo.setEmpBirthday(tools.toDate(request.getParameter("newBirths")));
        EmpInfoMessageResult<Object> result=empInfoServices.insert(empInfo);
        return result;
    }

    @RequestMapping("/updateEmpInfo.do")
    @ResponseBody
    public EmpInfoMessageResult<Object> updateEmpInfo(HttpServletResponse response,HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        EmpInfo empInfo=new EmpInfo();
        /*
        upNames:upName,
            upSexs:upSex,
            upJoins:upJoin,
            upDutys:upDuty,
            upBirths:upBirth,
            upPhones:upPhone,
            upEmails:upEmail,
            empNos:empNo
         */
        empInfo.setEmpNo(Integer.parseInt(request.getParameter("empNos")));
        empInfo.setEmpName(request.getParameter("upNames"));
        empInfo.setEmpSex(Integer.parseInt(request.getParameter("upSexs")));
        empInfo.setEmpDuty(request.getParameter("upDutys"));
        empInfo.setEmpPhone(request.getParameter("upPhones"));
        empInfo.setEmpEmail(request.getParameter("upEmails"));
        empInfo.setEmpJoindate(tools.toDate(request.getParameter("upJoins")));
        empInfo.setEmpBirthday(tools.toDate(request.getParameter("upBirths")));
        EmpInfoMessageResult<Object> result=empInfoServices.updateByPrimaryKey(empInfo);
        return result;
    }

    @RequestMapping("/deleteEmpInfo.do")
    @ResponseBody
    public EmpInfoMessageResult<Object> deleteEmpInfo(HttpServletResponse response,HttpServletRequest request,String id){
        response.setHeader("Access-Control-Allow-Origin", "*");
        EmpInfoMessageResult<Object> result=empInfoServices.deleteByPrimaryKey(Integer.parseInt(id));
        return result;
    }
}
