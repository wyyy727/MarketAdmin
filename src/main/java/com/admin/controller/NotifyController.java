package com.admin.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.admin.entity.NotifyPage;
import com.admin.service.NotifyService;
import com.admin.utils.ComMessageResult;
import com.admin.utils.Json;
import com.admin.utils.tools;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/notify")
public class NotifyController {
	@Resource
	private NotifyService notifyService;
	
	/**
	 * 添加
	 * @param response
	 * @param session
	 * @param notifyInfo
	 * @param request
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("add.do")
	public String add(HttpServletResponse response, HttpSession session, NotifyPage notifyInfo, HttpServletRequest request) throws ParseException {
		  response.setHeader("Access-Control-Allow-Origin", "*");
		  ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
		String startDate =request.getParameter("startTime");
		String  endDate = request.getParameter("endTime");
		notifyInfo.setStartDate(startDate);
		notifyInfo.setEndDate(endDate);
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time= df.format(new Date());
		notifyInfo.setnDate(time);
		notifyInfo.setTitle(request.getParameter("title"));
		String content=request.getParameter("noticeContentTextarea");
		notifyInfo.setContent(content);
		notifyInfo.setState(1);
		notifyInfo.setType(1);
		String admin_name = request.getSession().getAttribute("admin_name").toString();
		notifyInfo.setOperator(admin_name);
		notifyInfo.setNoId(tools.genMerNo());
		Json j=  notifyService.add(notifyInfo);
		if(j.getMsg().equals("发布成功")){
			 result.setStatus("00");
				result.setMessage("成功");
			return "redirect:../man/notify/success.html";
		}else{
			 return "redirect:../man/notify/Notifycontent.html";
		}

	}
	
	/**
	 * 查询分页模搜
	 * @param response
	 * @param request
	 * @param pageSize
	 * @param colOffset
	 * @param search
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("/loadnotify.do")
	@ResponseBody
	public ComMessageResult<List<Map>> loadnotify(HttpServletResponse response, HttpServletRequest request, String pageSize, String colOffset, String search) throws ParseException{
		  response.setHeader("Access-Control-Allow-Origin", "*");
		  ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
	        request.getHeader("cookie");
	        Cookie[] cookies = request.getCookies();
	        System.out.println("cookies = " + cookies);
	        if (cookies!=null) {
	            for (int i = 0; i < cookies.length; i++) {
	                Cookie cookie = cookies[i];
	                if (cookie.getName().equals("status")) {
	                    String status = cookie.getValue();
	                    System.out.println("status = " + status);
	                    if(!status.equals("00")) {
	                        result.setStatus("ER");
	                        result.setMessage("登录失效");
	                        return result;
	                    }
	                }
	            }
	        }
	        List<NotifyPage> list = notifyService.queryAll();
	        for(NotifyPage OwnNotify : list){
	        	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        	Date source  = new Date();
	        	Date date = sdf.parse(OwnNotify.getEndDate().toString());
 	        	 Date date1 = sdf.parse(sdf.format(source));
 	        	 int i = date.compareTo(date1);
 	        	if(i<0){
 	        		notifyService.updateState(OwnNotify.getId());
 	        	}
	        }
	        
	        result = notifyService.LoadNotifyListMessage(Integer.parseInt(pageSize), Integer.parseInt(colOffset), search);

	        return result;
	}
	
	/**
	 * 查询一个
	 * @param session
	 * @param id
	 * @return
	 */
	@RequestMapping("/findOne.do")
	public String findPage(HttpSession session, Integer id) {
		NotifyPage notify = notifyService.findById(id);
		session.setAttribute("notify", notify);//用request存转发到页面插件找不到，jsp没法用jstl
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
//		notify.setStartDate(sdf.format(notify.getStartDate()));
		return "redirect:../man/notify/notifyEdit.jsp";
	}
	
	
	/**
	 * 修改
	 * @param id
	 * @param
	 * @param startDate
	 * @param endDate
	 * @param title
	 * @param content
	 * @param response
	 * @return
	 */
	@RequestMapping("/updateNotifyRate.do")
	public String UpdatenotifyRateById(String id,
            String startDate,
           String  endDate,
            String title,
           String content,HttpServletResponse response){
		response.setHeader("Access-Control-Allow-Origin", "*");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 Integer type=1;
			 notifyService.UpdateNotifyRateById(id,type,startDate,endDate,title,sdf.format(new Date()),content);
			return  "redirect:../man/notify/notify.html";
	}
	
	/**
	 * 删除
	 * @param response
	 * @param ID
	 * @return
	 */
	@RequestMapping("/removeNotify.do")
	@ResponseBody
	public ComMessageResult<Object> removeNotify(HttpServletResponse response, String ID){
		 response.setHeader("Access-Control-Allow-Origin", "*");
		 ComMessageResult<Object> result = notifyService.removeNotify(Integer.parseInt(ID));
	        return result;
	}
}
