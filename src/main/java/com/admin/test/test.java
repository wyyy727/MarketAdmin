package com.admin.test;

import com.admin.dao.ChuKuInfoMapper;
import com.admin.dao.EmpInfoMapper;
import com.admin.entity.ChuKuInfo;
import com.admin.entity.NotifyPage;
import com.admin.service.*;
import com.admin.utils.EmpInfoMessageResult;
import com.admin.utils.LocationMessageResult;
import com.admin.utils.ProviderInfoResult;
import com.admin.utils.UserInfoMessageResult;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext.xml"})
public class test {

    @Autowired
    private UserInfoServices userInfoServices;

    @Autowired
    private LocationService locationService;

    @Autowired
    private NotifyService notifyService;

    @Autowired
    private EmpInfoServices empInfoServices;

    @Autowired
    private EmpInfoMapper empInfoMapper;

    @Autowired
    private ProviderServices providerServices;

    @Autowired
    private ChuKuInfoMapper chuKuInfoMapper;


    @Test
    public void getUserByIdTest(){

        UserInfoMessageResult<List<Map>> user = userInfoServices.selectByPrimaryKey(1010);
        System.err.println(user.toString());
       // System.out.println(map);
    }
    @Test
    public void getUserByIdTesst(){

        LocationMessageResult<List<Map>> user = locationService.LoadProvinceMessage();
        System.err.println(user.toString());
        // System.out.println(map);
    }
    @Test
    public void getNotifyByIdTest(){

        NotifyPage user = notifyService.findById(65);
        System.err.println(user.toString());
        // System.out.println(map);
    }
    @Test
    public void getEmpNameAndId(){

        EmpInfoMessageResult<List<Map>> user = empInfoServices.getEmpNameAndId();
        System.err.println(user.toString());
        // System.out.println(map);
    }
    @Test
    public void getEmpNameAndIds(){

        List<Map> user = empInfoMapper.getEmpNameAndId();
        System.err.println(user.toString());
        // System.out.println(map);
    }
    @Test
    public void getEmpNameAndIdss(){

        ProviderInfoResult<List<Map>> user = providerServices.getProviderNameAndId();
        System.err.println(user.toString());
        // System.out.println(map);
    }
    @Test
    public void getEmpNameAndIdsss(){

        ChuKuInfo user = chuKuInfoMapper.getChuKuById(7);
        System.err.println(user.getChuAmount());
        // System.out.println(map);
    }
}
