// 导航显示
function block() {
    let navL = document.querySelector('.head_nav_left');
    let navLeft = document.querySelector('.head_navs_left');
    let navList = document.querySelector('.head_navs_left_list');
    navLeft.onmouseenter = function () {
        navList.style.display = 'block';
        navList.style.zIndex = '1000';
    }
    navL.onmouseleave = function () {
        navList.style.display = 'none'
    }
}
block();
// 倒计时
function timecout() {
    var dsj = document.getElementsByClassName('djs_time')[0];
    var target = new Date('2019-1-27 21:30:00').getTime();
    var now = new Date().getTime();
    var timer = target - now;
    var day = Math.floor(timer / (24 * 60 * 60 * 1000));
    timer = timer - day * 24 * 60 * 60 * 1000;
    var h = Math.floor(timer / (60 * 60 * 1000));
    timer = timer - h * 60 * 60 * 1000;
    var m = Math.floor(timer / (60 * 1000));
    timer = timer - m * 60 * 1000;
    var s = Math.floor(timer / 1000);
    var str = `<span>${h < 10 ? '0' + h : h}</span>
    <i>:</i>
    <span>${m < 10 ? '0' + m : m}</span>
    <i>:</i>
    <span>${s < 10 ? '0' + s : s}</span>`;
    dsj.innerHTML = str;
}
var time1 = setInterval(function () {
    timecout();
}, 1000)
// 轮播图
function banner() {
    let $box = $('.head_banner'),
        $bannerBox = $('.lunbo_ul'),
        $lis = $bannerBox.children('li'),
        $tibBox = $('.lb_tab_ul'),
        $tibs = $tibBox.children('li');
    let index = -1,
        max = 0,
        timer = null;
    $.ajax({
        type: 'get',
        url: ('./data.json'),
        success: function (data) {
            giveHtml(data);
            event();
            play();
            max = data.length;
            autoPlay();
        }
    })

    function giveHtml(data) {
        data = data || [];
        let str = '';
        let str2 = '';
        data.forEach((item, index) => {
            str += `<li><div class="img" style="background-image: url(${item.src})"></div></li>`
            if (index == 0) {
                str2 += `<li class="li current">${item.title}</li>`
            } else {
                str2 += `<li class="li">${item.title}</li>`
            }
        })
        $bannerBox.html(str);
        $tibBox.html(str2);
        $lis = $bannerBox.children('li');
        $tibs = $tibBox.children('li');
    }

    function play() {
        index++;
        if (index === max) {
            index = 0;
        }
        if (index === -1) {
            index = max - 1;
        }
        $lis.eq(index).css({
            position: 'absolute',
            zIndex: 10,
            display: 'list-item',
        }).fadeIn().siblings().fadeOut().css({
            position: 'absolute',
            zIndex: 0,
            display: 'none',
        })
        $tibs.eq(index).addClass('current').siblings().removeClass('current');
    }

    function autoPlay() {
        timer = setInterval(play, 2000)
    }
    $box.mouseenter(function () {
        clearInterval(timer);
    })
    $box.mouseleave(function () {
        autoPlay();
    })

    function event() {
        $tibs.mouseenter(function () {
            let n = $(this).index();
            index = n - 1;
            play();
        })
    }
}
banner();
// 头部搜索框的显示及隐藏
$(function () {
    var h3_top = $('.single_con').offset().top;
    var happy_summer = $('.happy_summer');
    $(window).scroll(function () {
        var this_scrollTop = $(this).scrollTop();
        if (this_scrollTop > h3_top) {
            $('.hd_search_fixed').css({
                top: 0,
                boxShadow: '0 4px 15px 0 rgba(0,0,0,0.05)'
            });
            happy_summer.css({
                position: 'fixed',
                top: '140px'
            })
        } else {
            $('.hd_search_fixed').css({
                top: '-60px',
            });
            happy_summer.css({
                position: 'absolute',
                top: 0
            })
        }
    });
});