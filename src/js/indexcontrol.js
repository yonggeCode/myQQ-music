(function ($,root){
    //相当实用
    function IndexControl (len) {
        this.len = len;
        this.index = 0;
    }
    IndexControl.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(val){
            return this.index = (this.index + this.len + val) % len;
            //这里加this.len是为了往前传-1时进行的逻辑运算，跟数组的游标很像
            //这里，我想根据我所传的val值让index在0-2之间变化
            //即期望的index % len值来实现
            //期望的index用所传val来控制
            //最后在每次执行时改变index值
        }
    }
    root.indexControl = IndexControl;
})(window.zepto,window.player|| ( window.player = {} ) )