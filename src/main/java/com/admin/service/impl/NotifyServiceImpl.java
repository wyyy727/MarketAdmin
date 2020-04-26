package com.admin.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;

import com.admin.dao.NotifyDao;
import com.admin.entity.NotifyPage;
import com.admin.service.NotifyService;
import com.admin.utils.ComMessageResult;
import com.admin.utils.Json;
import org.springframework.stereotype.Service;

@Service("notifyService")
public class NotifyServiceImpl implements NotifyService {
	
	@Resource
	private NotifyDao notifyDao;
	
	@Override
	public Json add(NotifyPage pageInfo) {
		Json j = new Json();

		if(pageInfo.getType() == null){
			pageInfo.setType(99);  //如果为空,即是全部
		}
		if(pageInfo.getStartDate() ==null ||"".equals(pageInfo.getStartDate())){
			j.setMsg("生效日期不能为空!");
			j.setSuccess(false);
			return j;
		}
		if(pageInfo.getEndDate() ==null ||"".equals(pageInfo.getEndDate())){
			j.setMsg("生效日期不能为空!");
			j.setSuccess(false);
			return j;
		}
		if(pageInfo.getTitle() ==null ||"".equals(pageInfo.getTitle())){
			j.setMsg("标题不能为空!");
			j.setSuccess(false);
			return j;
		}
		if(pageInfo.getContent() ==null ||"".equals(pageInfo.getContent())){
			j.setMsg("公告内容不能为空!");
			j.setSuccess(false);
			return j;
		}
		  /*SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		pageInfo.setnDate(sdf.format(date));*/
		/*pageInfo.setOperator(admin_name);*/
		/*pageInfo.setNoId(genMerNo());*/
		notifyDao.insertOne(pageInfo);
		j.setMsg("发布成功");
		j.setSuccess(true);
		return j;
	}


	@Override
	public ComMessageResult<List<Map>> LoadNotifyListMessage(int pageSize, int colOffset, String search) {
		ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
	        if(search.length() > 0) {
//				search = "%" + search;
//				search = search + "%";
	            List<Map> listNotifyListSearch = notifyDao.LoadNotifyListSearchMessage(pageSize, colOffset, search);
	            int totalSearchCount = notifyDao.TotalNotifyListSearchCount(search);
	            result.setRows(listNotifyListSearch);
	            result.setTotal(totalSearchCount);

	        }else {
	            List<Map> listNotifyList = notifyDao.LoadNotifyListMessage(pageSize, colOffset);
	            int totalSearchCount = notifyDao.TotalNotifyListCount();
	            result.setRows(listNotifyList);
	            result.setTotal(totalSearchCount);
	        }
	        return result;
	}

	@Override
	public NotifyPage findById(Integer id) {
		// TODO Auto-generated method stub
		return notifyDao.findById(id);
	}

	@Override
	public ComMessageResult<List<Map>> LoadNotifyMessageById(Integer id) {
		ComMessageResult<List<Map>> result = new ComMessageResult<List<Map>>();
		List<Map> agentMsgByIdResult = notifyDao.LoadNotifyMessageById(id);
		result.setRows(agentMsgByIdResult);
		result.setStatus("00");
		result.setMessage("成功");
		return result;
	}

	@Override
	public ComMessageResult<Object> UpdateNotifyRateById(String id,
			Integer type, String startdate, String endstart,
			String title, String nodate, String content) {
		
		ComMessageResult<Object> result = new ComMessageResult<Object>();
		if(content ==null ||"".equals(content)){
			result.setMessage("修改失败");
			result.setStatus("Q5");
			return result;
		}
		
		int res = notifyDao.UpdateNotifyRate(id,type,startdate,endstart,title,nodate,content);
		if(res <= 0) {
			result.setMessage("修改失败");
			result.setStatus("Q5");
			return result;
		}
		result.setMessage("修改成功");
		result.setStatus("00");
		return result;
	}

	@Override
	public void updateState(Integer ownId) {
		// TODO Auto-generated method stub
		notifyDao.updateState(ownId);
	}

	@Override
	public List<NotifyPage> queryAll() {
		// TODO Auto-generated method stub
		return notifyDao.queryAll();
	}

	@Override
	public ComMessageResult<Object> removeNotify(int parseInt) {
		// TODO Auto-generated method stub
		 
		ComMessageResult<Object> result = new ComMessageResult<Object>();
        int res = notifyDao.removeNotify(parseInt);
        if (res <= 0) {
            result.setStatus("Q5");
            result.setMessage("删除失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("删除成功");
        return result;
	}
}
