package com.admin.dao;

import java.util.List;
import java.util.Map;

import com.admin.entity.UserInfo;
import org.apache.ibatis.annotations.Param;

public interface UserInfoMapper {

    //删除一个用户对象
    int deleteByPrimaryKey(int userId);
    //添加一个用户对象
    int insert(UserInfo record);
    //通过userID获取一个用户对象
    List<Map> selectByPrimaryKey(int userId);
    //更新一个用户对象
    int updateByPrimaryKey(UserInfo record);
    //获取全部user对象没有条件
    List<Map> getAllUser(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset);
    //获取全部用户个数没有条件
    int getUserInfoCount();
    List<Map> getAllUserBySearch(@Param("pageSize") int pageSize, @Param("colOffset") int colOffset, @Param("search") String search);
    //获取全部用户个数没有条件
    int getUserInfoCountBySearch(@Param("search") String search);

    int Login(@Param("admin_name") String admin_name, @Param("admin_password") String admin_password);

    UserInfo getUserByName(@Param("name")String name);
}