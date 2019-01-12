// 轮播图
function banner() {
    let $Box = $('.head_banner'),
        $bannerBox = $Box.find('.banner_box'),
        $list = $bannerBox.find('.tip'),
        $tipBox = $('.tip_box'),
        $tips = $tipBox.children('li');
    let index = -1,
        timer = null,
        max = 0;
    // 1.获取数据
    $.ajax({
        type: 'get',
        url: './data.json',
        success: function (data) {
            giveHtml(data);
            play();
            event();
            max = data.length;
            autoPlay();
        }
    })
    // 2.渲染数据
    function giveHtml(data) {
        data = data || [];
        let str = '';
        let str2 = '';
        data.forEach((item, index) => {
            str += `<li> <img src="${item.src}" alt=""> </li>`;
            if (index == 0) {
                str2 += `<li class="tip current">${item.title}</li>`
            } else {
                str2 += `<li class="tip">${item.title}</li>`
            }
        })
        $bannerBox.html(str);
        $tipBox.html(str2);
        $list = $bannerBox.children('li');
        $tips = $tipBox.children('li');
    }
    // 3.播放轮播图
    function play() {
        index++;
        if (index === max) {
            index = 0;
        }
        if (index === -1) {
            index = max - 1;
        }
        $list.eq(index).css({
            zIndex: 10
        }).fadeIn().siblings().fadeOut().css({
            zIndex: 1
        })
        $tips.eq(index).addClass('current').siblings().removeClass('current');
    }

    function autoPlay() {
        timer = setInterval(play, 2222)
    }
    $Box.on('mouseenter', function () {
        clearInterval(timer);
    })
    $Box.mouseleave(function () {
        autoPlay();
    })

    function event() {
        $tips.mouseenter(function () {
            let n = $(this).index();
            index = n - 1;
            play();
        })
    }
}
banner();
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