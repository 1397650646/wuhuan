
function addEvent (obj,type,fn,boolean) {
    boolean = boolean || false;//处理捕获冒泡
    obj[type] = handle;//添加方法
    obj.addEventListener?obj.addEventListener(type,obj[type],boolean):attachEvent('on'+type,obj[type]);
    //滚轮事件
    if (type == 'mousewheel') {
        obj['on'+type]= handle;//chrome 及ie
        obj.addEventListener?obj.addEventListener('DOMMouseScroll',obj[type],boolean):'';//兼容火狐
    }

    //处理e
    function handle (e) {
        e = e || window.event;
        e.wheel = e.wheelDelta?e.wheelDelta:-e.detail;//处理滚轮方向
        fn.call(obj,e);
        e.preventDefault()?e.preventDefault():e.returnValue = false;//阻止默认事件
    }
}

function removeEvent (obj,type,fn,boolean) {
    boolean = boolean || false;//处理捕获冒泡
    //移除普通事件
    obj.removeEventListener?obj.removeEventListener(type,obj[type],boolean):obj.detachEvent('on'+type,obj[type]);
    //滚轮事件
    if(type=='mousewheel'){
    obj['on'+type]= null;//普通形式处理 chrome 及ie

    obj.removeEventListener?obj.removeEventListener('DOMMouseScroll',obj[type],boolean):'';//兼容火狐

    }
}

