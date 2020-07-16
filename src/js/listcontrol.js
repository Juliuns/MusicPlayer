(function (root) {
    function listControl(data, wrap) {
        // 创建dom元素
        var list = document.createElement("div"),
            dl = document.createElement("dl"),
            dt = document.createElement("dt"),
            close = document.createElement("div"),
            musicList = []; //存储所有的歌曲的dom

        list.className = "list";
        dt.innerHTML = "播放列表";
        close.className = "close";
        close.innerHTML = "关闭";

        dl.append(dt);
        data.forEach(function (item, index) {
            var dd = document.createElement("dd");
            dd.innerHTML = item.song;
            dd.addEventListener("touchend",function(){
                changeSelect(index);
                sildeDown();
            })
            musicList.push(dd);
            dl.append(dd);
        });
        list.appendChild(dl);
        list.appendChild(close);
        wrap.appendChild(list);

        var disY = list.offsetHeight;
        list.style.transform = "translateY(" + disY + "px)";
        // 列表滑动显示
        function sildeUp() {
            list.style.transition = ".2s";
            list.style.transform = "translateY(0)";
            list.style.opacity = "1";
        }
        // 列表滑动隐藏
        function sildeDown() {
            list.style.transition = ".2s";
            list.style.transform = "translateY(" + disY + "px)";
            list.style.opacity = "0";
        }
        //关闭歌曲列表
        close.addEventListener("touchend", sildeDown);

        // 切换选中元素
        function changeSelect(index) {
            for (var i = 0; i < musicList.length; i++) {
                musicList[i].className = "";
            }
            musicList[index].className = "active";
        }
        changeSelect(0);//第一首歌默认选中

        return {
            dom: list,
            musicList: musicList,
            sildeUp: sildeUp,
            sildeDown: sildeDown,
            changeSelect: changeSelect
        }
    }
    root.listControl = listControl;
})(window.player || (window.player = {}))