// 切歌模块
(function (root) {
    function Index(len) {
        this.index = 0;//当前的索引值
        this.len = len;//数据的长度
    }
    Index.prototype = {
        //这个方法用来取上一个索引（上一首）
        prev: function () {
            return this.get(-1);//切到上一首
        },

        //这个方法用来取上下个索引（下一首）
        next: function () {
            return this.get(+1);//切到下一首
        },

        // 用来获取索引
        get: function (val) {
            val = val || 0;
            this.index = (this.index + val + this.len) % this.len;
            return this.index
        }
    }
    root.controlIndex = Index;//把构造函数暴露出去，因为实例对象需要传参，所以实例对象不能暴露出去
})(window.player || (window.player = {}))