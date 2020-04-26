package com.admin.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class tools {
	//���ַ���ת��Ϊ�������
	public static Date toDate(String dateStr){
		Date date=null;
		SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(dateStr!=null&&dateStr.length()>0){
			try {
				date=sdf.parse(dateStr);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return date;
	}
	public static String genMerNo(){
		Random random = new Random();
		int ends =300000000+ random.nextInt(99);
		return 	String.format("%02d",ends);//如果不足两位，前面补0
	}
}
