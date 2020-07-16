// 进度条模块
// 1、渲染总时长
// 1、播放音乐 进度条运动，左侧时间更新
// 2、交互 拖拽进度条
(function (player) {
    var dur,//总时间
        frameId,
        startTime = 0,
        lastper = 0;//停止后百分比
    // 渲染歌曲时长
    function renderSongTime(time) {
        dur = time;
        var totalTime = document.getElementsByClassName("totalTime")[0];
        totalTime.innerHTML = getTime(time);
    }

    // 计算分秒
    function getTime(t) {
        var minute = Math.floor(t / 60),
            second = t % 60;
        minute = minute > 9 ? minute : ("0" + minute);
        second = second > 9 ? second : ("0" + second);
        return minute + ":" + second
    }

    function start(p) {
        cancelAnimationFrame(frameId);
        lastper = p == undefined ? lastper : p;
        startTime = +new Date();
        console.log("start", p, lastper, frameId);
        function frame() {
            var newTime = +new Date();
            var per = lastper + (newTime - startTime) / (1000 * dur);
            if (per < 1) {
                upData(per);
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();

    }

    // 根据百分比渲染时间和进度条位置
    function upData(per) {
        if (per <= 1 && per >= 0) {
            var renderTime = Math.round(per * dur);
            document.querySelector(".curTime").innerHTML = getTime(renderTime);
            document.querySelector(".circle").style.left = per * 100 + "%";
            document.querySelector(".frontBg").style.width = per * 100 + "%";
        }
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = +new Date()
        lastper = lastper + (stopTime - startTime) / (1000 * dur);
        console.log("stop", lastper, frameId);
    }

    player.pro = {
        renderSongTime: renderSongTime,
        start: start,
        stop: stop,
        upData: upData
    }
})(window.player || (window.player = {}))