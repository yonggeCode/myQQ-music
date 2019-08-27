(function($,root){
    function renderList (data){

    }
    function bindEvent (data){

    }
    root.renderList = function (data){
        console.log(data);
        renderList(data);
        bindEvent(data);
    }
})(window.zepto,window.player || ( window.player = {} ))