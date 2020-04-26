package com.admin.service.impl;

import com.admin.entity.UserInfo;
import com.admin.dao.UserInfoMapper;
import com.admin.service.UserInfoServices;
import com.admin.utils.UserInfoMessageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserInfoServicesImpl implements UserInfoServices {

    //创建dao层对象,以调用dao层方法
    @Autowired
    private UserInfoMapper userInfoMapper;
    //登陆验证功能


    @Override
    public UserInfoMessageResult<Object> Login(String admin_name, String admin_password) {
        UserInfoMessageResult<Object> result=new UserInfoMessageResult<>();
        int res = userInfoMapper.Login(admin_name, admin_password);
        if(res <= 0) {
            result.setStatus("Q5");
            result.setMessage("用户名密码错误");
            return result;
        }
        result.setStatus("00");
        result.setMessage("登录成功");
        return result;
    }

    @Override
    public UserInfoMessageResult<List<Map>> getAllUser(int pageSize, int colOffset, String search) {
        UserInfoMessageResult<List<Map>> result=new UserInfoMessageResult<>();
        if(search.length()>0){
            List<Map> serachMap=userInfoMapper.getAllUserBySearch(pageSize,colOffset,search);
            int searchCount=userInfoMapper.getUserInfoCountBySearch(search);
            result.setRows(serachMap);
            result.setTotal(searchCount);
        }
        List<Map> map=userInfoMapper.getAllUser(pageSize,colOffset);
        int count=userInfoMapper.getUserInfoCount();
        result.setRows(map);
        result.setTotal(count);
        return result;
    }

    @Override
    public UserInfoMessageResult<Object> deleteByPrimaryKey(Integer userId) {
        UserInfoMessageResult<Object> result= new UserInfoMessageResult<>();
        int res=userInfoMapper.deleteByPrimaryKey(userId);
        if(res <= 0) {
            result.setStatus("Q5");
            result.setMessage("删除失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("删除成功");
        return result;
    }

    @Override
    public UserInfoMessageResult<Object> insert(UserInfo record) {
        UserInfoMessageResult<Object> result= new UserInfoMessageResult<>();
        System.err.println(record);
        int res=userInfoMapper.insert(record);
        if(res > 0) {
            result.setStatus("00");
            result.setMessage("添加成功");
            return result;
        }
        result.setStatus("Q5");
        result.setMessage("添加失败");
        return result;
    }

    @Override
    public UserInfoMessageResult<List<Map>> selectByPrimaryKey(Integer userId) {
        UserInfoMessageResult<List<Map>> result=new UserInfoMessageResult<>();
        List<Map> map=userInfoMapper.selectByPrimaryKey(userId);
        result.setRows(map);
        result.setStatus("00");
        result.setMessage("成功");
        return result;
    }

    @Override
    public UserInfoMessageResult<Object> updateByPrimaryKeySelective(UserInfo record) {
        UserInfoMessageResult<Object> result = new UserInfoMessageResult<>();
        int res=userInfoMapper.updateByPrimaryKey(record);
        if(res <= 0) {
            result.setStatus("Q5");
            result.setMessage("修改失败");
            return result;
        }
        result.setStatus("00");
        result.setMessage("修改成功");
        return result;
    }


}
