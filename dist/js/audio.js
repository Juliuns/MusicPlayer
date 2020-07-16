(function (root) {
    function AudioManage() {
        this.audio = new Audio();//创建一个audio实例
        this.status = "pause";
    }
    AudioManage.prototype = {
        // 加载音乐
        load: function (src) {
            this.audio.src = src;//设置音乐路径
            this.audio.load();//加载音乐
        },

        // 播放音乐
        play: function () {
            this.status = "play";
            this.audio.play();
        },

        // 暂停音乐
        pause: function () {
            this.status = "pause";
            this.audio.pause();
        },

        // 音乐播放完毕的回调函数
        noload: function (cb) {
            this.audio.onended = cb;
        },

        // 跳到音乐的某个时间点
        playTo: function (time) {
            this.audio.currentTime = time;//单位为秒
        }
    }

    root.music = new AudioManage();//暴露对象
})(window.player || (window.player = {}))