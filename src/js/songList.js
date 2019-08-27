(function($,root){
    function renderList (data){
        //根据数据渲染列表
        data.forEach(function(ele,index){
            $('<li>\
            <h4>'+ ele.song +'</h4>\
            <p>-'+ ele.singer +'</p>\
            </li>').appendTo('.song-list ul')
        });
        $('.song-list ul li').eq(0).addClass('active');
    }
    function bindEvent (){
        //添加点击事件
        $('.song-list ul li').on('click',function (){
            clearTimeout(timer);
            $('.song-list ul li').removeClass('active');
            $('body').trigger('change',$(this).index());
            // console.log($(this).index());
            changeListSong($(this).index);
            $(this).addClass('active');
            var timer = setTimeout(function(){
                //点击切歌的时候隐藏
                $('.song-list').removeClass('show');
            },200)
        })
    }
    function changeListSong (index) {
        $('.song-list ul li').removeClass('active');
        $('.song-list ul li').eq(index).addClass('active');
    }
    function initList (data){
        renderList(data);
        bindEvent();
    }
    root.songList = {
        initList:initList,
        changeListSong:changeListSong
    }
})(window.Zepto,window.player || ( window.player = {} ))