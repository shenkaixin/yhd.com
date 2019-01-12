var animate = (function () {
    var moveType = {
        linear: function linear(time, changeL, duration, beginL) {
            return changeL / duration * time + beginL;
        },
        easeIn: function (t, c, d, b) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, c, d, b) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, c, d, b) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    };

    function move2(ele, duration, obj, type, cb) {
        var curP = {};
        var changeP = {};
        for (let k in obj) {
            curP[k] = utils.css(ele, k);
            changeP[k] = obj[k] - curP[k];
        }
        let time = null;
        let timer = setInterval(() => {
            time += 10;
            if (time >= duration) {
                time = duration;
                clearInterval(timer);
                cb && cb();
            }
            for (let k in curP) {
                let curL = moveType[type](time, changeP[k], duration, curP[k]);
                utils.css(ele, k, curL)
            }
        }, 10)
    }
    return function (ele, duration, options, type, cb) {
        // 若type是undefined，则直接给type一个默认值
        // 若type是function,则把cb设置成该fn，然后把type设置成linear
        if (type === undefined) {
            type = 'linear';
        } else if (Object.prototype.toString.call(type) === '[object Function]') {
            cb = type;
            type = 'linear'
        }
        move2(ele, duration, options, type, cb);
    }
})()
// animate(box, 2000, {}, 'linear', callback);
// animate(ele, 2000, {}, 'linear', fn);    
// ele 运动的元素
// 2000 运动总时间
// {} 要动元素的那些属性
// 'linear' 运动方式
// fn 是运动完成后的一个回调