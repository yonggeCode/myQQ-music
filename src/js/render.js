(function($,root){
    function renderImage(src){
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.imgbox img').attr('src', src);
            // root.blurImg(img, $('body'));
            $('body img').css({
                'background-image':'url('+ src +')'
            })
            //可以用css的filter，少写很多代码
        }

    }
    function renderInfo(info){
        var str = '<div class="song-name">' + info.song + '</div>\
        <div class="song-singer">' + info.singer + '</div>\
        <div class="song-ablum">' + info.album + '</div>';
        $('.song-info').html(str);
    }
    function renderIsLike(isLike){
        if(isLike){
            $('.isLike').addClass('liked');
        }else{
            $('.isLike').removeClass('liked');
        }
    }
   root.render = function (data){
       console.log(data);
       renderImage(data.image);
       renderInfo(data);
       renderIsLike(data.isLike)
   }
}(window.Zepto,window.player ||( window.player = {}) ))