package com.admin.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

public class NotifyPage {
	/**
	 * ID
	 */
	private Integer  id;
	/**
	 * 编号
	 */
	private String noId;
	/**
	 * 标题
	 */
	private String  title;
	/**
	 * 内容
	 */
	private String  content;
	
	/**
	 * 受众  99全部    1商户  2代理
	 */
	private Integer  types;
	
	/**
	 * 发布时间
	 */
	private String  nDate;
	
	/**
	 * 开始时间
	 */
	private String  startDate;
	
	/**
	 * 结束时间
	 */
	private String endDate;
	/**
	 * 状态
	 */
	private Integer  state;
	/**
	 * 操作人
	 */
	private String operator;
	
	public static String tranTypeName(Integer type){
		if(type==null){
			return "";
		}
		if(type.intValue() == 99){
			return "全部";
		}
		if(type.intValue() == 1){
			return "商户";
		}
		if(type.intValue() == 2){
			return "代理";
		}
		return "";
	}
	/**
	 * 获取状态名称
	 * @param
	 * @return
	 */
	public static String tranStateName(Date endDate){
		
		if(endDate == null){
			return "永久有效";
		}
		Date d = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		if(sdf.format(endDate).compareTo(sdf.format(d))  >=0 ){
			return "正常";
		}else{
			return "失效";
		}
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNoId() {
		return noId;
	}
	public void setNoId(String noId) {
		this.noId = noId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getType() {
		return types;
	}
	public void setType(Integer type) {
		this.types = type;
	}
	public String getnDate() {
		return nDate;
	}
	public void setnDate(String nDate) {
		this.nDate = nDate;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public NotifyPage() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "NotifyPage{" +
				"id=" + id +
				", noId='" + noId + '\'' +
				", title='" + title + '\'' +
				", content='" + content + '\'' +
				", type=" + types +
				", nDate='" + nDate + '\'' +
				", startDate='" + startDate + '\'' +
				", endDate='" + endDate + '\'' +
				", state=" + state +
				", operator='" + operator + '\'' +
				'}';
	}
}
