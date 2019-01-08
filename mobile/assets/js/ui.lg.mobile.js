var lgmobile = function(){
    var common = {
        init : function(){
            common.checkbox();
            common.datepicker();
            common.tab();
            common.accordion();
            common.pageCtr();
            common.nav();
            common.cleave();
        },
        cleave : function(){
            $("[data-cleave]").each(function(){
                if ($(this).data("cleave") === "date") {
                    var cleave = new Cleave($(this), {
                        date: true,
                        datePattern: ['y', 'm', 'd']
                    });
                }
            });
        },
        checkbox : function(){
            $("input[type=checkbox]").each(function(){
                if ($(this).closest(".checkbox").length) return;
                var $this = $(this);
                var $wrap = $this.wrap("<span class='checkbox'></span>").closest(".checkbox");
                $this.on("change", function(){
                    common.checkboxView($this, $this.prop("checked"));
                }).change();
                if ($this.hasClass("favorites")) {
                    $wrap.addClass("favorites");
                }
                common.hover(this);
            });
        },
        checkboxView : function(obj, state){
            var $wrap = obj.closest(".checkbox");
            if (state){
                $wrap.addClass("checked");
            } else {
                $wrap.removeClass("checked");
            }
            common.disabled(obj[0]);
        },
        hover : function(obj){
            if (obj.hasAttribute("disabled")) return;
            if (!$(obj).closest("label").length){
                $(obj).on("mouseenter focusin", function(){
                    $(obj).parent().addClass("hover");
                }).on("mouseleave focusout", function(){
                    $(obj).parent().removeClass("hover");
                });
            }
            try {
                var $target = $(obj).closest("label").length ? $(obj).closest("label") : $("label[for="+$(obj).attr("id")+"]");
                $target.on("mouseenter focusin", function(){
                    $(obj).parent().addClass("hover");
                }).on("mouseleave focusout", function(){
                    $(obj).parent().removeClass("hover");
                });
            } catch (e) {}
        },
        disabled : function(obj){
            if (obj.hasAttribute("disabled")){
                $(obj).parent().addClass("disabled");
                //$(obj).closest("label").addClass("disabled");
                //$("label[for="+$(obj).attr("id")+"]").addClass("disabled");
            }
        },
        datepicker : function(){

            $.datepicker.regional['ko'] = {
                showOn: "both",
                closeText: '닫기',
                prevText: '이전달',
                nextText: '다음달',
                currentText: '오늘',
                monthNames: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
                monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
                dayNames: ['일','월','화','수','목','금','토'],
                dayNamesShort: ['일','월','화','수','목','금','토'],
                dayNamesMin: ['일','월','화','수','목','금','토'],
                weekHeader: '주',
                dateFormat: 'yy.mm.dd',
                firstDay: 0,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: '년',
                //showOn: "button",
                //buttonText: "날짜선택"
            };
            $.datepicker.setDefaults($.datepicker.regional['ko']);
            $("[data-datepicker]").each(function (){
                var $this = $(this);
                var max = $this.data("maxdate");
                var min = $this.data("mindate");
                var cleave = new Cleave($this, {
                    date: true,
                    datePattern: ['Y', 'm', 'd']
                });
                console.log(max);
                $this.datepicker({maxDate:max, minDate:min});
                if ($this.closest(".ipt-daterange").length){
                    var minMax = $this.nextAll("[data-datepicker]").length ? "minDate" : "maxDate";
                    var $siblingsIpt = $this.siblings("[data-datepicker]");
                    $this.off("change.date").on("change.date", function() {
                        var getDate = $(this).datepicker("getDate");
                        $siblingsIpt.datepicker( "option", minMax, getDate );
                    });
                }
                $(window).off("resize.datepicker").on("resize.datepicker", function(){
                    $this.datepicker("hide");
                });
            });
        },
        tab: function () {
            $(".tab-list li").each(function(){
                var $this = $(this);
                if ($this.hasClass("active")) {tab($this)}
                $("a", $this).off('click.tab').on('click.tab', function(e){
                    e.preventDefault();
                    if (!$this.hasClass('disabled')) {tab($this)}
                });
            });
            function tab($li){
                var $taget = $($("a", $li).attr("href"));
                $li.addClass('active').siblings("li").removeClass('active');
                $taget.show().siblings(".contents > .inner").hide();
            }
        },
        accordion: function () {
            $("[data-accordion-item]").each(function(){
                var speed = 400;
                var $this = $(this);
                var item = "data-accordion-item";
                var anchor = "data-accordion-anchor";
                var target = "data-accordion-target";
                function render($el, state, speed){
                    var $anchor = $("["+anchor+"]", $el);
                    var $target = $("["+target+"]", $el);
                    if (state){
                        $anchor.attr(anchor, "");
                        $target.attr(target, "");
                        $target.stop().slideUp(speed);
                    } else {
                        $anchor.attr(anchor, "active");
                        $target.attr(target, "active");
                        $target.stop().slideDown(speed);
                    }
                }
                $("["+anchor+"]", $this).off('click.accordion').on('click.accordion', function(e){
                    e.preventDefault();
                    var state = $(this).attr(anchor) === "active";
                    render($this, state, speed);
                    if($this.attr(item) === 'toggle'){
                        render($this.siblings("["+item+"=toggle]"), true, speed);
                    }
                });
            });
        },
        queryString : function(){
            var a = window.location.search.substr(1).split('&');
            if (a == "") return;
            var b = {};
            for (var i = 0; i < a.length; i++) {
                var p=a[i].split('=');
                //console.log(p)
                if (p.length != 2) continue;
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        },
        pageCtr : function(){
            if (!common.queryString()) return;
            var pram = common.queryString();
            if (pram['modal']){
                common.modalOpen($("#" + pram['modal']) , 0);
            }
            if (pram['tab']){
                $("[href='#"+pram['tab']+"']").trigger("click");
            }
        },
        nav : function(){
            $('.btn-nav').each(function () {
                $(this).off('click.nav').on('click.nav', function () {
                    $('.nav-wrap').addClass("active");
                    $('.wrap').addClass("nav-open");
                })
            });
            $('.btn-close').each(function () {
                $(this).off('click.close').on('click.close', function () {
                    $('.nav-wrap').removeClass("active");
                    $('.wrap').removeClass("nav-open");
                })
            });
        }
    };
    return common;
}();
$(function(){
    lgmobile.init();
});

