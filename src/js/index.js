
var root = window.player;
var audio = root.audioManager;
var pro = root.pro;
var songList = root.songList;
var nowIndex = 0,
    data,
    len,
    indexControl,
    timer;
function getData(url) {
    $.ajax({
        //获取本地mock的对象
        url: url,
        type: 'GET',
        success: function (data) {
            window.data = data;
            len = data.length;
            indexControl = new root.indexControl(len);
            //new index控制对象
            root.render(data[0]);
            root.songList.initList(data);
            audio.getAudio(data[0].audio);
            pro.allTime(data[0]);
            bindEvent();
            bindTouch();
        },
        error: function () {
            console.log('error');
        }
    })
}
function bindEvent() {
    $('body').on('change', function (e, index) {
        //给body上绑定index变化要进行的事件
        console.log(index);
        nowIndex = index;
        root.render(data[index]);
        //重新渲染
        audio.getAudio(data[index].audio);
        //加载歌曲
        pro.allTime(data[index]);
        //跟新allTime
        songList.changeListSong(index);
        if (audio.status == 'play') {
            //标识音乐目前播放状态
            audio.play();
            pro.start(data[nowIndex]);
            // 进度条开始走
            $('.imgbox').css({
                'transform': 'rotateZ(0)',
                'transition': 'none'
            })
            rotated(0);
            //歌曲切换是初始化图片
        }
        pro.updata('init');
        //歌曲切换初始化pro
    })
    $('.prev').on('click', function () {
        var i = indexControl.prev();
        $('body').trigger('change', i);    
    });
    $('.next').on('click', function () {
        var i = indexControl.next();
        $('body').trigger('change', i);
    });
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            pro.start(data[nowIndex]);
            rotated($('.imgbox').attr('data-deg'));
        } else {
            audio.pause();
            clearInterval(timer);
            pro.stop();
        }
        $('.play').toggleClass('playing');
    });
    $('.isLike').on('click', function () {
        $('.isLike').toggleClass('liked');
    });
    $('.list').on('click', function (e) {
        e.stopPropagation();
        $('.song-list').addClass('show');
    })
    $('.song-list').on('click', function (e) {
        e.stopPropagation();
    })
    $('body').on('click', function () {
        $('.song-list').removeClass('show');
    })
}
function rotated(deg) {
    //旋转图片
    clearInterval(timer);
    var deg = +deg;
    timer = setInterval(function () {
        deg += 1.5;
        $('.imgbox').attr('data-deg', deg);
        $('.imgbox').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all .4s linear'
        })
    }, 200)
}
function bindTouch() {
    //拖拽事件
    var slider = $('.slider');
    var proTop = $('.pro-top');
    var proOffset = $('.pro-bottom').offset();
    var width = proOffset.width;
    var left = proOffset.left;
    var per;
    var curTime;
    slider.on('touchstart', function (e) {
        e.stopPropagation();
        //避免pro-top
        pro.stop();
        // audio.pause();
    }).on('touchmove', function (e) {
        var moveX = (e.changedTouches[0].clientX - left) > width ? width : e.changedTouches[0].clientX - left;
        moveX = moveX >= 0 ? moveX : 0;
        per = moveX / width;
        curTime = per * audio.audio.duration
        proTop.css({
            'width': moveX
        })
        $('.curTime').html(pro.transformTime(curTime));
    }).on('touchend', function () {
        audio.audio.currentTime = curTime;
        if (audio.status == 'play') {
            audio.play();
            rotated($('.imgbox').attr('data-deg'));
        }
        pro.start(data[nowIndex]);
    })
    $('.pro-bottom').on('touchstart', function (e) {
        touchMove(e);
    })
    $('.pro-top').on('touchstart', function (e) {
        touchMove(e);
    })
    function touchMove(e) {
        var moveX = (e.changedTouches[0].clientX - left) > width ? width : e.changedTouches[0].clientX - left;
        moveX = moveX >= 0 ? moveX : 0;
        // console.log(moveX);
        per = moveX / width;
        curTime = per * audio.audio.duration
        proTop.css({
            'width': moveX
        })
        $('.curTime').html(pro.transformTime(curTime));
        audio.audio.currentTime = curTime;
        if (audio.status == 'play') {
            audio.play();
            rotated($('.imgbox').attr('data-deg'));
        }
        pro.start(data[nowIndex]);
        return false;
    }
}
getData("../mock/data.json");

