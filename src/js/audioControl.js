
(function ($,root) {
    function AudioManager (){
        this.audio = new Audio();
        this.status = 'pause';
        this.pro = false;
    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
            this.pro = true;
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
            this.pro = false;
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        }
    }
    root.audioManager =  new AudioManager();
})(window.zepto,window.player|| ( window.player = {} ) )