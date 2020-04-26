package com.admin.dao;

import com.admin.entity.NotifyPage;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface NotifyDao {

	void insertOne(NotifyPage pageInfo);

	int UpdateNotifyRate(String id, Integer type, String startdate, String endstart,
						 String title, String nodate, String content);
	 //
	 int TotalNotifyListSearchCount(String search);
	//
	List<Map> LoadNotifyListMessage(@Param("pageSize") int pageSize,@Param("colOffset")int colOffset);
//
    int TotalNotifyListCount();

	List<Map> LoadNotifyListSearchMessage(@Param("pageSize")int pageSize, @Param("colOffset")int colOffset,@Param("search")String search);

	NotifyPage findById(Integer id);

	List<Map> LoadNotifyMessageById(Integer id);

	void updateState(Integer ownId);

	List<NotifyPage> queryAll();

	int removeNotify(int parseInt);

}
