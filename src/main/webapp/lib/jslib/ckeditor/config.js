/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	
	config.language = 'zh-cn';//语言设置
	config.width = '1000px';//宽度
	config.height = '400px';//高度
	config.toolbar = 'Basic';//工具栏：一般有 Full/Basic 两种
	config.toolbarCanCollapse = true; //工具栏是否可以被收缩
	config.font_names='宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;'+ config.font_names; //添加中文字体
	config.resize_maxHeight = 1000; //改变大小的最大高度 
	config.resize_maxWidth = 1250; //改变大小的最大宽度
	config.resize_minHeight = 400; //改变大小的最小高度
	config.resize_minWidth = 600; //改变大小的最小宽度
	config.removePlugins='elementspath'; //去掉状态栏的标签
	config.resize_enabled = false; // 是否取消 “拖拽以改变尺寸”功能
	config.toolbar_Basic = [
	                        //加粗                          斜体，                下划线                         穿过线                    下标字                                 上标字
	                        ['Bold','-','Italic','-','Underline','-','Strike','-','Subscript','-','Superscript'],
							//   左对齐                              居中对齐                                   右对齐                                两端对齐
							['JustifyLeft','-','JustifyCenter','-','JustifyRight','-','JustifyBlock'],
							//   水平线                     		表情                      特殊字符                          分页符				全屏
							['HorizontalRule','-','Smiley','-','SpecialChar','-','PageBreak','-','Maximize'],
							//样式                   格式          字体         字体大小
							['Styles','Format','Font','FontSize'],
							//文本颜色     	    背景颜色
							['TextColor','BGColor']
	                       ];
};



/*
	Define changes to default configuration here. For example:
	config.filebrowserBrowseUrl = '../ckfinder/ckfinder.html';   
	config.filebrowserImageBrowseUrl = '../ckfinder/ckfinder.html?type=Images';   
	config.filebrowserFlashBrowseUrl = '../ckfinder/ckfinder.html?type=Flash';   
	config.filebrowserUploadUrl = '/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Files';   
	config.filebrowserImageUploadUrl = '/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images';   
	config.filebrowserFlashUploadUrl = '/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Flash' ;

	config.toolbar_Full = [
	                       ['Source','-','Save','NewPage','Preview','-','Templates'],
	                       ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
	                       ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
	                       ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
	                       '/',
	                       ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
	                       ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
	                       ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
	                       ['Link','Unlink','Anchor'],
	                       ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
	                       '/',
	                       ['Styles','Format','Font','FontSize'],
	                       ['TextColor','BGColor']
                       	  ];
*/