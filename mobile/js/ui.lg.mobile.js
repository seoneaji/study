// var stickyItem = [];
// var toastPopFade;
// var mySwiper = [];
// var modalArr = [];
var funding = function(){
    var common = {
        init : function(){
            common.checkbox();
            common.radio();
            common.file();
            common.select();
            common.textarea();
            common.datepicker();
            common.tab();
            common.accordion();
            common.modal();
            common.modalSize();
            common.pageCtr();
            // common.scroll();
            // common.cleave();
            // common.sticky();
            // common.swiper();
            // common.utilAlarm();
            // common.linkToggle();
            // common.bgGray();
            // common.countUp();
            // common.topBtn();
            // common.iptUnit();
            // common.windowsClose();
            // common.autoFocus();
        },
        autoFocus : function(){
            $("[data-auto-focus] input[type=text]").each(function(){
                var maxLength = $(this).attr("maxlength");
                var nextIpt = $(this).nextAll("input")[0];
                var prevIpt = $(this).prevAll("input")[0];
                $(this).off().on("keyup", function(e){
                    if (maxLength <= $(this).val().length && ( $(nextIpt).length && e.keyCode >= 48 && e.keyCode < 57 || e.keyCode >= 96 && e.keyCode < 105) ) {
                        $(nextIpt).focus()//.select();
                    } else if ( $(this).val().length == 0 && e.keyCode == 8 ) {
                        $(prevIpt).focus()//.select();
                    }
                });
            });
        },
        iptUnit : function(){
            $(".ipt-unit").each(function(){
                var $ipt = $("> input", this);
                var $unit = $("> span", this);
                $ipt.css("padding-right", $unit.outerWidth());
            });
        },
        topBtn : function(){
            $(".btn-top").each(function(){
                var btn = $(this);
                btn.off("click.topBtn").on("click.topBtn" ,function(){
                    $("html, body").animate({
                        scrollTop : 0
                    },500 , "easeInOutCubic");
                    return false;
                });

                $(window).off("scroll.topBtn").on("scroll.topBtn", function(){
                    var top = $(window).scrollTop();
                    var footerOfset = $("footer").offset().top;
                    var winHeight = $(window).height();
                    btn.css("bottom" , Math.max(top + winHeight - footerOfset  + 40, 40));
                }).scroll();
            });
        },
        countUp : function(){
            var options = {
                useEasing : true,
                useGrouping : true,
                separator : ',',
                decimal : '.'
            };
            $(".main-header-list strong, .main-header-txt .num, .user-state-box strong, .matching-num .num, .deal-list .num").each(function(){
                $(this).attr("data-count",$(this).html());
                var val = $(this).data("count");
                var num = new CountUp(this, 0, common.uncomma(val), 0, 2, options);
                //var num = new CountUp(this, 0, val, 0, 2, options);
                //var num = new CountUp(this, Math.max(val - 1001, 0), val, 0, 2, options);
                if (!num.error) {
                    num.start();
                } else {
                    console.error(num.error)
                }
            });
        },
        bgGray : function(){
            $(window).off("resize.bg").on("resize.bg", function(){
                $("#container > .bg-gray").each(function(){
                    $(this).css("min-height" , $(window).height() - $(this).offset().top - $("footer").outerHeight());
                });
            }).resize();
        },
        utilAlarm : function(){
            var $alarmBtn = $(".util-nav .alarm > a, .util-nav .alarm .btn-alarm-close");
            var $alarmPop = $(".util-nav .alarm .alarm-pop");
            $alarmBtn.off("click.utilAlarm").on("click.utilAlarm", function(){
                $alarmPop.fadeToggle(300).toggleClass("open");
            });
            $(document).off("click.utilAlarm").on("click.utilAlarm", function(e){
                if ( $alarmPop.is(":visible") && !$(e.target).closest("li.alarm").length) {
                    $alarmPop.fadeOut(300);
                }
            });
        },
        validation : function(objId){
            var $obj = $("#"+objId);
            $("html, body").animate({scrollTop : $obj.offset().top + ($obj.outerHeight() / 2) - ($(window).height() / 2)}, 300);
            $obj.focus();
        },
        swiper : function(){
            $(".swiper").each(function(idx){
                $(this).attr("data-swiper-idx", idx);
                var slidesPerView = this.hasAttribute("data-slides-per-view") ? $(this).attr("data-slides-per-view") * 1 : "auto";
                var slidesPerGroup = this.hasAttribute("data-slides-per-Group") ? $(this).attr("data-slides-per-Group") * 1 : "auto";
                var slidesNext = $(this).find('.swiper-button-next').length ? $(this).find('.swiper-button-next') : null;
                var slidesPrev = $(this).find('.swiper-button-prev').length ? $(this).find('.swiper-button-prev') : null;
                var slidesPagination = $(this).find('.swiper-pagination').length ? $(this).find('.swiper-pagination') : null;
                //if ($(this).find(".swiper-slider").length => slidesPerView) return;
                mySwiper[idx] = new Swiper($(this).find(".swiper-container"), {
                    speed: 400,
                    spaceBetween: 25,
                    slidesPerView: slidesPerView,
                    slidesPerGroup: slidesPerGroup,
                    pagination: {
                        el: slidesPagination,
                        type: 'fraction'
                    },
                    navigation: {
                        nextEl: slidesNext,
                        prevEl: slidesPrev
                    }
                });
                $(this).find("li").off("focusin").on("focusin", function(){ // todo 소스 다듬기
                    var liIdx = $(this).index();
                    $(mySwiper[idx].$wrapperEl).closest(".swiper-container").scrollLeft(0);
                    mySwiper[idx].slideTo(Math.floor(liIdx), 0);
                });
            });
        },
        sticky : function(){
            var stickyItem = [];
            $("[data-sticky]").each(function(){
                var $this = $(this);
                $this.height($this.children().height());
                stickyItem.push({
                    "obj" : $this,
                    "children" : $this.children(),
                    "start" : $this.offset().top
                });
            });
            $.each(stickyItem, function(i){
                stickyItem[i]["end"] = (stickyItem[i + 1] !== undefined) ? stickyItem[i + 1].start - $(stickyItem[i].obj).outerHeight() : 999999999999;
            });
            $(window).off("scroll.sticky").on("scroll.sticky", function(){
                if ($("html").hasClass("open-modal")) return;
                var winScrollTop = $(this).scrollTop();
                var winScrollLeft = $(this).scrollLeft();
                $.each(stickyItem, function(i, item){
                    if (item.start > winScrollTop ){
                        $(item.obj).attr("data-sticky", "");
                        $(item.children).css({"top": "0"});
                    } else if (item.start <= winScrollTop && item.end > winScrollTop ){
                        $(item.obj).attr("data-sticky", "fixed");
                        $(item.children).css({"top": "0px"});
                    } else if (item.end < winScrollTop){
                        $(item.obj).attr("data-sticky", "absolute");
                        $(item.children).css({"top": item.end + "px"});
                    }
                    $(item.children).css({"left": -winScrollLeft});
                });
            }).scroll();
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
        scroll : function(){
            $("[data-custom-scroll]").each(function(){
                $(this).find("> .inner").scrollbar();
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
        toastPop : function(state){
            $(".toast-pop").each(function(){
                var $this = $(this);
                if (state) {
                    $this.addClass("active");
                    toastPopFade = setTimeout(function(){
                        $this.removeClass("active");
                    }, 1500);
                } else {
                    $this.removeClass("active");
                    clearTimeout(toastPopFade);
                }
            });
        },
        radio : function(){
            $("input[type=radio]").each(function(){
                if ($(this).closest(".radio").length) return;
                $(this).wrap("<span class='radio'></span>");
                $(this).on("change", function(){
                    $("input[type=radio][name="+$(this).attr("name")+"]").each(function(){
                        var $wrap = $(this).closest(".radio");
                        if ($(this).prop("checked")){
                            $wrap.addClass("checked");
                        } else {
                            $wrap.removeClass("checked");
                        }
                    });
                    common.disabled(this);
                }).change();
                common.hover(this);
            });
        },
        select : function(){
            $("select").each(function(){
                var thisWidth = $(this).outerWidth();
                $(this).selectmenu({
                    width : thisWidth,
                    change : function(event, ui) {
                        $(this).change();
                    },
                    open : function(){
                        $(this).selectmenu("menuWidget").width("auto").parent().width(thisWidth - 2);
                        if ($(this).closest(".modal-dialog").length) {
                            $(this).selectmenu("menuWidget").closest(".ui-selectmenu-menu").css({"z-index":"51000"})
                        }
                    }
                }).selectmenu("menuWidget").scrollbar();
            });
            $(window).off("resize.selectPosition").on("resize.selectPosition",function(){
                $("[role='combobox'][aria-expanded='true']").each(function(){
                    $(this).prev().selectmenu("close").selectmenu("open");
                });
            });
        },
        file : function(){
            $("input[type=file]").each(function(){
                if ($(this).closest(".file").length) return;
                var title = (this.hasAttribute("data-title")) ? $(this).data("title") : "파일 업로드";
                var $this = $(this);
                var $wrap = $this.wrap("<span class='file'></span>").closest(".file");
                var placeholder = this.hasAttribute("placeholder") ? $this.attr("placeholder") : "선택된 파일 없음";
                $wrap.prepend("<span class='value'>"+placeholder+"</span><button type='button' disabled class='btn-default'><span>"+title+"</span></button>");
                if (this.hasAttribute("style")) $wrap.width($this.outerWidth());
                if (this.hasAttribute("data-btn-type")) $wrap.addClass("btn-type");
                fileChange($this);
                common.hover(this);
            });
            function fileChange($obj) {
                $obj.off("change.fileChange").on("change.fileChange", function(e){
                    var placeholder = this.hasAttribute("placeholder") ? $obj.attr("placeholder") : "선택된 파일 없음";
                    if (this.files.length === 0){
                        $obj.siblings(".value").html(placeholder);
                        $obj.closest(".file").removeClass("selected");
                    } else if (this.files.length === 1) {
                        $obj.siblings(".value").html(this.files[0].name);
                        $obj.closest(".file").addClass("selected");
                    } else if (this.files.length > 9) {
                        alert("많음");
                        var $clone = $(this).val('').clone(true);
                        $(this).replaceWith($clone);
                        $obj.siblings(".value").html(placeholder);
                        fileChange($clone);
                        $obj.closest(".file").removeClass("selected");
                    } else {
                        $obj.siblings(".value").html(this.files[0].name+"외 "+ (this.files.length - 1) +"개");
                        $obj.closest(".file").addClass("selected");
                    }
                    common.disabled(this);
                }).change();
            }
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
        textarea: function () {
            var byteChk = function(el, maxsize){
                var str = $(el).val();
                var size = 0;
                var text = '';
                var rIndex = str.length;
                var byteSize = function(str){
                    var pattern = /[\u0000-\u007f]|([\u0080-\u07ff]|(.))/g;
                    return str.replace(pattern,"$&$1").length; // 한글2Byte
                    // return str.replace(pattern,"$&$1$2").length; // 한글3Byte
                };
                for (var i=0; i<str.length; i++){
                    text += str.charAt(i);
                    size = byteSize(text);
                    if(size == maxsize) {
                        rIndex = i + 1;
                        break;
                    } else if (size > maxsize){
                        rIndex = i;
                        break;
                    }
                }
                $(el).val(str.substring(0, rIndex));
                return size;
            };
            var keyEvent = function(el){
                var max = $(el).attr('maxlength');
                //var current = byteChk(el, max); // Byte
                var current = $(el).val().length; // 글자수
                if(Number(max) >= Number(current)) {
                    $(el).next('span.count').find("em").text(current);
                }
            };
            $.each($('textarea'), function(){
                if (!this.hasAttribute('maxlength')) return;
                if ($(this).closest(".textarea").length) return;
                var $wrap = $(this).wrap("<span class='textarea'></span>").closest(".textarea");
                if (this.hasAttribute("style")) $wrap.width($(this).outerWidth());
                $wrap.append("<span class='count'><em></em> / <span>"+$(this).attr("maxlength")+" 자</span></span>");
                keyEvent(this);
                $(this).on('input', function () { keyEvent(this); });
            });
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
        modal : function() {
            $('[data-modalbtn]').off('click.open').on('click.open', function(e){
                e.preventDefault();
                var href = $(this).attr("href");
                common.modalOpen($(href), 300);
            });
            $('[data-modalclose]').off('click.close').on('click.close', function () {
                common.modalClose();
            });
            $(window).resize(function(){
                common.modalSize();
            });
            $("#modal").off('click.modalClick').on('click.modalClick', function(e){
                if (!$(e.target).closest(".modal-dialog").length){
                    //common.modalClose();
                }
            });
            $(document).off('keyup.modalClose').on('keyup.modalClose', function(e){
                if(e.keyCode === 27 && $('html').hasClass('open-modal')){
                    common.modalClose();
                }
            });
        },
        modalSize : function(){
            if($('html').hasClass('open-modal')){
                var $windowH = $(window).height();
                var $openModal = $('.modal-dialog.open');
                var $moWrap = $openModal.find('.scroll-wrapper, .scroll-content');
                var moHeaderHeight = $openModal.find('.modal-header').outerHeight();
                var moFooterHeight = $openModal.find('.modal-footer').outerHeight();
                $moWrap.css('max-height', Math.min($windowH - (moHeaderHeight + moFooterHeight + 200), 800));
            }
        },
        modalOpen : function($modal , speed){
            if (!$modal.length || !$modal.closest("#modal").length || $modal.is(":visible")) return;
            var windowLeft = $(window).scrollLeft();
            var windowTop = $(window).scrollTop();
            var modalId = $modal.attr("id");
            modalArr.push(modalId);
            $('html').addClass('open-modal');
            $modal.addClass("open").css("z-index",modalArr.length).fadeIn(speed, function(){
                $modal.find(".modal-content").scrollbar();
                common.modalSize();
            }).siblings('.modal-dialog').removeClass("open");
            setTimeout(function(){
                $modal.find(".modal-content").scrollbar();
                common.modalSize();
            }, 10);
            $modal.closest('#modal').prepend("<div class='dim' data-dim='"+modalId+"'></div>");
            $(".dim[data-dim="+modalId+"]").css("z-index",modalArr.length).fadeIn(speed);
            $("#wrap").scrollTop(windowTop).scrollLeft(windowLeft);
            common.modal();
        },
        modalClose : function(speed) {
            var modalId = modalArr[modalArr.length-1];
            modalArr.pop();
            var bodyTop = $("#wrap").scrollTop();
            var bodyLeft = $("#wrap").scrollLeft();
            $('#'+modalId).fadeOut(speed, function(){
                if (modalArr.length === 0){
                    $("html").removeClass("open-modal");
                    $("html, body").scrollTop(bodyTop).scrollLeft(bodyLeft);
                }
            }).removeClass("open");
            $(".dim[data-dim="+modalId+"]").fadeOut(speed, function(){
                $(".dim[data-dim="+modalId+"]").remove();
            });
        },
        processAjaxData : function(response, urlPath) {
            document.getElementById("content").innerHTML = response.html;
            document.title = response.pageTitle;
            window.history.pushState({"html":response.html, "pageTitle":response.pageTitle}, "", urlPath);
        },
        objFadeToggle : function(objId, state, speed) {
            var fadeSpeed = (speed == null) ? 300 : speed;
            var objState = (state == null) ? true : state;
            if (objState){
                $('#'+objId).fadeIn(fadeSpeed);
            } else {
                $('#'+objId).fadeOut(fadeSpeed);
            }
        },
        linkToggle : function(){
            $(".f-link-area").off("focusin.family focusout.family mouseover.family mouseleave.family")
                .on("focusin.family focusout.family mouseover.family mouseleave.family", function(e){
                    var $this = $(this);
                    var $list = $(".link-list", $this);
                    if(e.type === "focusin" || e.type === "mouseover"){
                        $this.addClass("active");
                        $list.stop().slideDown(250, function(){});
                    }else{
                        $this.removeClass("active");
                        $list.stop().slideUp(250, function(){});
                    }
                });
        },
        windowPop : function(url, title, winW, winH){
            var left= ($(window).width() - winW) / 2;
            var top= ($(window).height() - winH) / 2;
            var specs = "scroll=no, resizable=no, 'newWindow', width = " + winW + ", height=" + winH + ", left=" + left + ", top=" + top;
            window.open(url, title, specs);
        },
        windowsClose: function(){
            $("[data-close]").each(function(){
                $(this).click(function () {
                    window.close();
                });
            });
        },
        uncomma : function(str) {
            str = String(str);
            return str.replace(/[^\d]+/g, '');
        },
        introNav : function(nav){
            $(".wrap .nav ul li").eq(nav).addClass("on");
        }
    };
    return common;
}();
$(function(){
    funding.init();
});

