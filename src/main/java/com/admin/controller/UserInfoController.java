package com.admin.controller;

import com.admin.entity.UserInfo;
import com.admin.service.UserInfoServices;
import com.admin.utils.UserInfoMessageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

//controller层，控制页面之间的相互跳转
@SuppressWarnings("all")
@Controller
@RequestMapping("/userController")
public class UserInfoController {

    //创建services层对象,以调用其中的方法
    @Autowired
    private UserInfoServices userInfoServices;

    @RequestMapping("/checkLogin.do")
    @ResponseBody
    public UserInfoMessageResult<Object> checkLogin(HttpServletResponse response, String admin_name, String admin_password, HttpSession session, HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        UserInfoMessageResult<Object> result=userInfoServices.Login(admin_name, admin_password);
        session.setAttribute("admin_name",admin_name);
        request.getSession().setAttribute("currentLoginName",admin_name);
        return result;
    }
    //
    @RequestMapping("/getAll.do")
    @ResponseBody
    private UserInfoMessageResult<List<Map>> getAll(HttpServletResponse response, HttpServletRequest request, String pageSize, String colOffset, String search){
        response.setHeader("Access-Control-Allow-Origin","*");
        System.out.println(pageSize+""+colOffset);
        UserInfoMessageResult<List<Map>> result=userInfoServices.getAllUser(Integer.parseInt(pageSize),Integer.parseInt(colOffset),search);
        return result;
    }
    @RequestMapping("/loadUserByid.do")
    @ResponseBody
    public UserInfoMessageResult<List<Map>> loadUserByid(HttpServletResponse response,String id){
        response.setHeader("Access-Control-Allow-Origin","*");
        UserInfoMessageResult<List<Map>>  result=userInfoServices.selectByPrimaryKey(Integer.parseInt(id));
        return result;
    }

    @RequestMapping("/addUserMessage.do")
    @ResponseBody
    public UserInfoMessageResult<Object> addUser(HttpServletResponse response,HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        UserInfo userInfo=new UserInfo();
        /*
        adName:addName,
            adPwd:addPwd,
            adReal:addReal,
            adPow:addPow,
            adEmpNo:addPerson,
            adRePwd:addRePwd,
         */
        userInfo.setUserName(request.getParameter("adName"));
        userInfo.setUserPwd(request.getParameter("adPwd"));
        userInfo.setUserRealname(request.getParameter("adReal"));
        userInfo.setUserRepwd(request.getParameter("adRePwd"));
        userInfo.setEmpId(Integer.parseInt(request.getParameter("adEmpNo")));
        userInfo.setUserPower(Integer.parseInt(request.getParameter("adPow")));
        UserInfoMessageResult<Object> result=userInfoServices.insert(userInfo);
        return result;
    }
    @RequestMapping("/upUserMessage.do")
    @ResponseBody
    public UserInfoMessageResult<Object> upUser(HttpServletResponse response,HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        UserInfo userInfo=new UserInfo();
        userInfo.setEmpId(Integer.parseInt(request.getParameter("upNo")));
        userInfo.setUserName(request.getParameter("upName"));
        userInfo.setUserPwd(request.getParameter("uppPwd"));
        userInfo.setUserRealname(request.getParameter("uppReal"));
        userInfo.setUserRepwd(request.getParameter("uppPwd"));
        userInfo.setEmpId(Integer.parseInt(request.getParameter("empId")));
        userInfo.setUserPower(Integer.parseInt(request.getParameter("uppPow")));
        UserInfoMessageResult<Object> result=userInfoServices.updateByPrimaryKeySelective(userInfo);
        return result;
    }
    @RequestMapping("/delUser.do")
    @ResponseBody
    public UserInfoMessageResult<Object> deleteUser(HttpServletResponse response,HttpServletRequest request){
        response.setHeader("Access-Control-Allow-Origin", "*");
        UserInfoMessageResult<Object> result=userInfoServices.deleteByPrimaryKey(Integer.parseInt(request.getParameter("userId")));
        return  result;
    }
}
