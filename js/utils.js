window.utils = (function () {
    // 将json字符串格式化json对象
    function jsonParse(data) {
        return 'JSON' in window ? JSON.parse(data) : eval(`${data}`)
    }
    // 类数组转数组
    function likeAryTo(likeAry) {
        try {
            return [].slice.call(likeAry, 0);
        } catch (error) {
            var ary = [];
            for (let i = 0; i < likeAry.length; i++) {
                ary[i] = likeAry[i];
            }
            return ary
        }
    }
    // offset 获取页面元素距离body的距离
    function offset(ele) {
        let left = ele.offsetLeft,
            top = ele.offsetTop,
            parent = ele.offsetParent;
        while (parent && parent.nodeName.toUpperCase() !== 'BODY') {
            left += parent.clientLeft + parent.offsetLeft;
            top += parent.clientTop + parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            left,
            top
        }
    }
    // getCss样式
    function getCss(ele, attr) {
        let value;
        if ('getComputedStyle' in window) {
            value = window.getComputedStyle(ele, null)[attr]
        } else {
            if (attr === 'opacity') {
                value = ele.currentStyle['filter'];
                let reg = /^alpha\(opacity=(.+)\)$/i;
                if (reg.test(value)) {
                    value = reg.exec(value)[1] / 100;
                } else {
                    value = 1
                }
            } else {
                value = ele.currentStyle[attr];
            }
        }
        //去单位
        let reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i;
        if (reg.test(value)) {
            value = parseFloat(value)
        }
        return value;
    }
    // 设置页面CSS样式
    function setCss(ele, attr, value) {
        // 针对透明度的兼容写法
        if (attr === 'opactity') {
            ele.style['opactity'] = value;
            ele.style['filter'] = `alpha(opactity=${value*100})`;
            return
        }
        // 将常用的样式属性 如果传进来的值 如果是数字，帮他加上单位
        let reg = /^(height|width|((padding|margin)?(top|left|right|bottom)?))$/i
        // 设置的是不是常用的带单位的样式属性
        if (reg.test(attr)) {
            // 如果是有效数字，就需要加单位
            if (!isNaN(value)) {
                value += 'px'
            }
        }
        ele.style[attr] = value;
    }
    // 批量设置CSS样式
    function setCssBatch(ele, options) {
        if (typeof options === 'object') {
            for (let attr in options) {
                if (options.hasOwnProperty(attr)) {
                    setCss(ele, attr, options[attr])
                }
            }
        }
        // let isObj = Object.prototype.toString.call(options) === '[object object]';
        // if (isObj) {
        //     for (let attr in options) {
        //         if (options.hasOwnProperty(attr)) {
        //             setCss(ele, attr, options[attr])
        //         }
        //     }
        // }
    }
    let css = function () {
        let len = arguments.length,
            fn = getCss,
            isObj = Object.prototype.toString.call(arguments[1]) === '[object Object]'
        if (len >= 3) {
            fn = setCss
        } else if (len == 2 && isObj) {
            fn = setCssBatch;
        }
        return fn.apply(this, arguments)
    }
    //获取或设置浏览器盒子模型
    function win(attr, value) {
        if (typeof value === 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
    
    return {
        jsonParse,
        likeAryTo,
        offset,
        getCss,
        setCss,
        setCssBatch,
        css,
        win
    }
})()