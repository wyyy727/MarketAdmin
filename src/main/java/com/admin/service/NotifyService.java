package com.admin.service;

import com.admin.entity.NotifyPage;
import com.admin.utils.ComMessageResult;
import com.admin.utils.Json;

import java.util.List;
import java.util.Map;


public interface NotifyService {

	public Json add(NotifyPage notifyInfo);

	public ComMessageResult<List<Map>> LoadNotifyListMessage(int parseInt, int parseInt2, String search);

	public   NotifyPage findById(Integer id) ;

	public ComMessageResult<List<Map>> LoadNotifyMessageById(Integer id);

	public ComMessageResult<Object> UpdateNotifyRateById(String id, Integer type, String startdate, String endstart,
                                                         String title, String nodate, String content);

	public void updateState(Integer ownId);

	public List<NotifyPage> queryAll();

	public ComMessageResult<Object> removeNotify(int parseInt);

	

}
