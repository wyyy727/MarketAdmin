/**
 * 表单验证
 * @author tmp
 * @date   2018.11.21
 */
	$.extend($.fn.validatebox.defaults.rules, {
	//基本信息:
		//代理商号:纯数字
		amnumber : {
	    	validator : function(value) {
	    		return /^[0-9]+$/gi.test(value);
	    	},
	        message: '请输入数字!'
	    },
		//商户名称:中文
	    amname : {
	    	validator : function(value) {
	    		return /^[\u4e00-\u9fa5]+$/gi.test(value);
	    	},
	        message: '只能输入中文!'
	    },
		//验证手机号
	    phone : {
	        validator : function(value) {
	            return /^[1][3,4,5,7,8][0-9]{9}$/gi.test(value);
	        },
	        message : '电话号码格式不正确!'
	    },	
		//验证固定电话
//		amPhone : {
//			validator : function(value) {
//				if (value.length>9) {
//					return /^[0][1-9]{2,3}-[0-9]{5,10}$/gi.test(value);//有区号
//				}else{
//					return /^[1-9]{1}[0-9]{5,8}$/gi.test(value);//没有区号
//				}
//			},
//			message : '固定号码格式不正确！'
//		},
		//商户联系人:验证姓名,中文2-4个汉字
		person : {
	    	validator : function(value) {
	    		return /^[\u4e00-\u9fa5]{2,4}?$/gi.test(value);
	    	},
	        message: '请输入姓名(2-4个中文汉字)'
	    },
		//详细地址:中文+数字
	    address : {
		        validator : function(value) {
		            return /^[\u4e00-\u9fa5_0-9]+$/gi.test(value);
		        },
		        message : '只能输入中文或数字!'
		},	
		//身份证号	input  validType="idcared"	IdCard.js校验

		});	
	
	
	
	
	
	