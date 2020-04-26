package com.admin.service;

import com.admin.entity.UserInfo;
import com.admin.utils.UserInfoMessageResult;

import java.util.List;
import java.util.Map;

public interface UserInfoServices{

    //登陆验证操作
    UserInfoMessageResult<Object> Login(String admin_name, String admin_password);

    //获取全部user对象
    UserInfoMessageResult<List<Map>> getAllUser(int pageSize, int colOffset, String search);

    //删除一个用户对象
    UserInfoMessageResult<Object> deleteByPrimaryKey(Integer userId);

    //添加一个用户对象
    UserInfoMessageResult<Object> insert(UserInfo record);

    //通过userID获取一个用户对象
    UserInfoMessageResult<List<Map>> selectByPrimaryKey(Integer userId);

    //更新一个用户对象
    UserInfoMessageResult<Object> updateByPrimaryKeySelective(UserInfo record);




}
