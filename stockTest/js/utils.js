(function($){
    $.fn.toggleLi = function(options,params){
        options = $.extend({},$.fn.toggleLi.defaults,options || {});
        
        var $this = $(this);
        var opt = $("<ul class='clearfix'></ul>");

        initLi(opt,options.data);

        $this.prepend(opt);
        var index = 0;
        $("ul li").on("click",function(event){
            $("ul li").removeClass("active");
            $(this).addClass("active");
            index = $(this).index();
            $(".canvas").hide();
            $(".canvas").eq(index).show();
        });
    };

    function initLi($el,data){
        var $li;
        $.each(data,function(i,item){
            $li = $("<li></li>");
            if(i==0){
                $li.addClass("active");
            }
            var $a = $("<a></a>");
            $a.attr({"href":"javascrit:void(null)"});
            $a.text(item.name);
            $li.append($a);
            $($el).append($li);
        });
    }

    $.fn.toggleLi.defaults = {
        data:[{name:"分时"}]
    };
})(jQuery);