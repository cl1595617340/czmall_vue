

/*
* 底部提示框
* */
var floor_alertGo = function (object) {
    var content = object.content;
    var backgroundcolor = object.background;
    var color = object.color;

    var sb2 = $("<div></div>");
    sb2.addClass("floor_alert");
    if (backgroundcolor != null) {
        sb2.css("background-color", backgroundcolor);
    }
    if (color != null) {
        sb2.css("color", color);
    }
    $(sb2).text(content);
    //这是设置高度
    $(sb2).css("top", "106%");
    $(sb2).stop().animate({top: '85%'});
    //将内容追加到页面
    $("body").before(sb2);

    var result;
    var success = object.success;
    result = {showToast:"ok"};
    if(success){
        success(result);
    }

    time(sb2, 1);
}

/*
* 遮罩层提示框
* */
var shade_alertGo1 = (function (object) {
    var title = object.title;
    var content = object.content;
    var titleColor = object.titleColor;
    var btnCon = object.btnCon;

    var $body = $("body");
    var $body_mark = $("<div></div>");
    var aShadeDiv = $("<div></div>");
    var aShadeTitle = $("<label></label>");
    var aShadeBtn = $("<span></span>");

    //标记遮盖整个身体，提示框出现后不能点击其他区域
    $body_mark.addClass("body_mark");
    $($body).before($body_mark);
    //主窗体
    aShadeDiv.addClass("shade_alert");
    aShadeDiv.text(content);
    $($body).before(aShadeDiv);

    //标题
    aShadeTitle.addClass("shade_alertTitle");
    aShadeTitle.text(title);
    $(aShadeDiv).append(aShadeTitle);

    //确定
    aShadeBtn.addClass("shade_alertBtn");
    if (btnCon!=null){
        aShadeBtn.text(btnCon);
    } else {
        aShadeBtn.text("好的");
    }

    $(aShadeDiv).append(aShadeBtn);

    //动画
    $(aShadeDiv).css({'transform': 'scale(0.2)'});
    $(aShadeDiv).animate({}, function () {
        $(aShadeDiv).css({'transform': 'scale(1)'});
    })
    $($body_mark).css("background", "rgba(127, 127, 127, 0.5)");//轮播图盖上黑色阴影
    //调用点击确定的通用方法
    $(aShadeBtn).click(function () {
        sureBtn(aShadeBtn, aShadeDiv, $body_mark);
    })

    //标题字体颜色
    if (titleColor!=null){
        aShadeTitle.css("color", titleColor);
    }

    //悬浮按钮的动画
    $(aShadeBtn).hover(function () {
        $(this).css("box-shadow", "0 0 10px rgba(80,188,224,1)");

    }, function () {
        $(this).css("box-shadow", "0 0 0px rgba(0, 0, 0, 0.7)");

    })
})
//
// function  ok_alertGo() {
//     var $body = $("body");
//     var aimg = $("<img src='img/15-圆圈未选%20-%20副本.png'>");
//     aimg.addClass("okimg_alert");
//     $(aSureDiv).append(aimg);
// }

/*
* 遮罩层确认框
* */
export const sure_alertGo = function (object) {
    var title = object.title;
    var content = object.content;
    var off = object.off;
    var ok = object.ok;
    var ok_title = object.ok_title;
    var ok_content = object.ok_content;

    var $body = $("body");
    var $body_mark = $("<div></div>");
    var aSureDiv = $("<div></div>");
    var aSureDivSb = $("<label></label>");
    var aSureTitle = $("<label></label>");
    var aimg = $("<img src='../img/警告(1).png'>");
    //点击确定后出现的动画
    var aimg2 = $("<img src='../img/15-圆圈未选%20-%20副本.png'>");
    //点击确定后出现的动画2
    var aimg3 = $("<img src='../img/正确.png'>");
    //点击确定后出现的动画按钮
    var aimgBtn = $("<button></button>");
    //点击确定后出现的主内容
    var aimgContent =  $("<label></label>");
    var aOffBtn = $("<span></span>");
    var aOkBtn = $("<span></span>");

    //标记遮盖整个身体，提示框出现后不能点击其他区域
    $body_mark.addClass("body_mark");
    $($body).before($body_mark);
    //主窗体
    aSureDiv.addClass("sure_alert");
    $($body).before(aSureDiv);
    //主窗体的内容
    aSureDivSb.addClass("sureSb_alert");
    aSureDivSb.text(content);
    $(aSureDiv).append(aSureDivSb);
    //图片
    aimg.addClass("sureimg_alert");
    $(aSureDiv).append(aimg);
    //标题
    aSureTitle.addClass("sureTitle_alert");
    aSureTitle.text(title);
    $(aSureDiv).append(aSureTitle);
    //取消
    aOffBtn.addClass("sureOff_alert");
    aOffBtn.text(off);
    $(aSureDiv).append(aOffBtn);
    //確定
    aOkBtn.addClass("sureOk_alert");
    aOkBtn.text(ok);
    $(aSureDiv).append(aOkBtn);
    //确定后的图片动画
    aimg2.addClass("sureimg2_alert");
    $(aSureDiv).append(aimg2);
    //确定后的图片动画2
    aimg3.addClass("sureimg3_alert");
    $(aSureDiv).append(aimg3);
    //确定后的图片动画2按钮
    aimgBtn.addClass("sureBtn4_alert");
    aimgBtn.text("好的，谢谢");
    $(aSureDiv).append(aimgBtn);
    //确定后的图片动画出现的主内容
    aimgContent.addClass("sureCon_alert");
    //根据用户改变点击确定后的内容
    if (ok_content!=null){
        aimgContent.text(ok_content);
    } else {
        aimgContent.text("已执行您操作的命令");
    }

    $(aSureDiv).append(aimgContent);
    //动画
    $(aSureDiv).css({'transform': 'scale(0.2)'});
    $(aimg2).css({'transform': 'scale(0)'});
    $(aimg3).css({'transform': 'scale(0)'});
    $(aimgBtn).css({'opacity': '0'});
    $(aimgContent).css({'opacity': '0','transform': 'scale(0)'});
    $(aSureDiv).animate({}, function () {
        $(aSureDiv).css({'transform': 'scale(1)'});
    })
    $($body_mark).css("background", "rgba(127, 127, 127, 0.7)");//轮播图盖上黑色阴影

    //悬浮按钮的动画
    $(aOffBtn).hover(function () {
        $(this).css("box-shadow", "0 0 10px rgba(80,188,224,1)");

    }, function () {
        $(this).css("box-shadow", "0 0 0px rgba(0, 0, 0, 0.7)");

    })
    $(aOkBtn).hover(function () {
        $(this).css("box-shadow", "0 0 10px rgba(227,104,94,1)");

    }, function () {
        $(this).css("box-shadow", "0 0 0px rgba(0, 0, 0, 0.7)");

    })
    $(aimgBtn).hover(function () {
        $(this).css("box-shadow", "0 0 10px rgba(227,104,94,1)");

    }, function () {
        $(this).css("box-shadow", "0 0 0px rgba(0, 0, 0, 0.7)");

    })

    /*----------------------------------提示框的两个按钮--------*/

    var result;
    //回调函数
    var success = object.success;
    //取消
    $(aOffBtn).click(function () {
        result= {
            cancel: false,
            showModal: "ok"

        }
        if(success){
            success(result);
        }
        //提示框消失
        sureBtn(aOffBtn,aSureDiv,$body_mark);
    })
    //确定
    $(aOkBtn).click(function () {

        $(aimg).animate({}, function () {
            //根据用户改变点击确定后的标题
            if (ok_title!=null){
                aSureTitle.text(ok_title);
            } else {
                aSureTitle.text("好的");
            }
            // $(".sureTitle_alert").text("Good!");
            $(aSureDivSb).css({'transform': 'scale(0.2)', "opacity": "0"});
            $(aimg).css({'transform': 'scale(0.2)', "opacity": "0"});
            $(aimg2).css({'transform': 'scale(1.1)'});
            $(aimg3).css({'transform': 'scale(1)',"top":"-53%"});
            $(aOffBtn).css({'transform': 'scale(0)'});
            $(aOkBtn).css({'transform': 'scale(0)'});
            $(aimgBtn).css({"top":"73%", "opacity": "1"});
            $(aimgContent).css({'transform': 'scale(1)', "opacity": "1"});

        })
    })

    $(aimgBtn).click(function () {
        result={
            cancel:true,
            showModal:"ok"
        };
        if(success){
            success(result);
        }
        //提示框消失
        sureBtn(aOffBtn,aSureDiv,$body_mark);
    })


}

/*
* 点击确定(取消)后提示框消失的通用方法
* */
function sureBtn(btn, div, mark) {
    //点击确定后消失
    $(mark).hide();
    $(div).animate({}, function () {
        $(div).css({'transform': 'scale(0.5)', "opacity": "0"});
        $(mark).css("background", "rgba(127, 127, 127, 0)");
    })
    //调用计时器方法，到指定时间后自动销毁
    time(div, 0, true, mark);

}

/*
* 定时器
* 节点对象
* 编号
* 是否是点击后删除
*
* */
function time(alert, dispose, del, mark) {
    var i = 0;
    setInterval(function () {
        i++;
        if (i == 3) {
            switch (dispose) {
                case 1:
                    $(alert).css("top", "106%");
                    $(alert).fadeOut();
                    break;
                case 2:

                    break;

            }

        }
        //4秒后底部元素自动删除
        if (i == 4) {
            $(alert).remove();
        }
        //点击后删除元素
        if (del == true) {
            $(alert).remove();
            $(mark).remove();
        }
    }, 1000)
}

