(function($){
	// 文字高亮
	$.fn.highlight = function(options){
		debug(this)
		let opts = $.extend({},$.fn.highlight.defaults,options)
		return this.each(function(){
			let $this = $(this);
			let o = $.meta ? $.extend({},opts,$this.data()) : opts;
			$this.css({
				backgroundColor:o.background,
				color:o.foreground
			})
			let markup = $this.html();
			markup = $.fn.highlight.format(markup);
			$this.html(markup);
		});
	};
	function debug($obj){
		if(window.console && window.console.log){
			window.console.log("highlight selection count: "+$obj.size())
		}
	}
	$.fn.highlight.format = function(txt){
		return '<strong">'+txt+'</strong>';
	}

	$.fn.highlight.defaults = {
		foreground:"red",
		background:"yellow"
	};

	$.fn.extend({
		alertWhileClick:function(){
			$(this).click(function(){
				if(!$(this).val()){
					return;
				}
				alert($(this).val())
			});
		},
		showWin:function(){
			// console.log(1)
			$(this).on("click",function(){
				$(".motai").fadeIn();
			});
		}	
	});
	// 选择器select标签
	$.fn.combobox = function(options,params){
		options = $.extend({}, $.fn.combobox.defaults,options || {});
		$this = $(this);
		let opt = $("<option></option>");
		opt.attr("value","");
		opt.text(options.placeholder);
		$this.append(opt);
		// 初始化数据
		initData($this,options.data);

		function initData($this,data){
			$.each(data,function(i,item){
				let opt = $("<option></option>");
				opt.attr("value",item[options.valueFiled]);
				opt.text(item[options.textFiled]);
				$this.append(opt);
			});
		}
	};
	$.fn.combobox.defaults = {
		placeholder:"请选择",
		valueFiled:"value",
		textFiled:"text",
		data:[{"text":"option1","value":"value1"},{"text":"option2","value":"value2"},{"text":"option3","value":"value3"}]
	};
	// 模拟的选择器
	$.fn.selectList = function(options,params){
		options = $.extend({},$.fn.selectList.defaults,options||{});

		let $this = $(this);

		let lab = $("<input>");
		lab.attr({"type":"text","placeholder":options.placeholder,"readonly":"readonly"});
		$this.append(lab);
		let opts = $("<ul class='selectList'></ul>");
		// opts.addClass("selectList")
		// 选项插入
		let data = options.data;
		// 判断传过来的数据是否有data，如果没有走ajax
		if(data){
			init(data);
		}else{
			if(!options.url) return;
			$.getJSON(options.url,options.params,function(data){
				init(data);
			});
		}

		function init(data){
			$.each(data,function(i,items){
				let item = $("<li></li>");
				item.attr("data-id",items[options.textFiled]);
				item.text(items[options.valueFiled]);
				opts.append(item);
				item.on("click",function(event){
					// 选中状态和赋值
					// $(event.target).addClass("selected");
					lab.attr({"value":$(event.target).text(),"data-id":$(event.target).data("id")});
					// item.removeClass("selected");
					opts.slideUp();
				});
			});
		}

		opts.hide();
		$this.append(opts);
		
		lab.on("click",function(){
			if( opts.css("display") == "none" ){
				opts.slideDown();
			}else{
				opts.slideUp();
			}
		});
	};
	$.fn.selectList.defaults = {
		url:null,
		data:null,
		params:null,
		placeholder : "请选择",
		textFiled : "text",
		valueFiled : "value",
		data:[{"text":"id1","value":"value1"},{"text":"id2","value":"value2"},{"text":"id3","value":"value3"}]
	}
	$(document).on("click",function(event){ 
		event.stopPropagation();
		if($(event.target).parent().hasClass("selector")){
			return;
		}
		$(".selectList").slideUp();
		return false;
	})
// 模态窗口
	$.fn.openWin = function(options,params){
		options = $.extend({},$.fn.openWin.defaults,options||{});
		var $this = $(this);
		$this.height($("body").height());
		$this.width($("body").width());
		var htmlStr = $("<div class='alertBox'></div>");
		var mtTitle = $("<h2 class='mtTitle'>"+options.title+"</h2>");
		var btnT = $("<button class='closeWin'>"+options.btn2+"</button>");
		var container = $("<div style='height:300px;'></div>")
		htmlStr.append(mtTitle,container,btnT);
		$this.append(htmlStr);
		btnT.on("click",function(e){
			e.stopPropagation();
			$this.hide();
			$this.fadeOut();
			return false;
		});
	};
	$.fn.openWin.defaults = {
		title:"模态窗口",
		btn2:"关闭"
	};
})(jQuery);