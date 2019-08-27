(function ($, root) {
    var frameId,
        autochange = false;
    function allTime(data) {
        //渲染alltime，用audio的duration也行，需要等待音频加载好之后才能获取到
        var duration = transformTime(data.duration);
        $('.allTime').html(duration);
    }
    function start(data) {
        cancelAnimationFrame(frameId);
        // console.log(data);
        var alltime = data.duration;
        function frame() {
            var curtime = root.audioManager.audio.currentTime;         
            var per = curtime / alltime;
            if(per < 1){
                per = (curtime / alltime) * 100 + '%';
                updata(curtime,per);
                frameId = requestAnimationFrame(frame);
                //requestAnimationFrame按电脑刷新的间隔执行，和settimeout一样
            }else{
                //进度条走完切歌
                cancelAnimationFrame(frameId);
                autochange = true;
                if(autochange){
                    autochange = false;
                    $('.next').trigger('click');
                }  
            }
        }
        frame();
    }
    function stop () {
        cancelAnimationFrame(frameId);
    }
    function updata(curtime,per){
        if(curtime){
            $('.curTime').html( transformTime(curtime) );
        }
        if(per){
            $('.pro-top').css({
                'width':per
            })
        }
        if(curtime === 'init'){
            $('.curTime').html( transformTime(0) );
            $('.pro-top').css({
                'width':0
            })
        }
        
    }
    function transformTime(p) {
        var time = Math.round(p);
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
        m = m >= 10 ? m : '0' + m;
        s = s >= 10 ? s : '0' + s;
        return m + ':' + s;
    }
    root.pro = {
        allTime: allTime,
        start: start,
        stop:stop,
        updata:updata,
        transformTime:transformTime
    }
})(window.Zepto, window.player || (window.player = {}))