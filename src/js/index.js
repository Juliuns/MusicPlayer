(function ($, player) {
    function MusicPlayer(dom) {
        this.wrap = dom; // 播放器容器（用于加载ListControl模块）
        this.dataList = [];//存放请求后的数据
        this.indexObj = null;//索引值对象
        this.imgRotateTimer = null;//定时器
        this.list = null;//列表切歌对象
        this.curIndex = 0;
    }
    MusicPlayer.prototype = {
        init: function () {//初始化
            this.getDom();//获取元素
            this.getData('../mock/data.json');//请求数据
        },
        getDom: function () {
            this.record = document.querySelector(".songImg img");//旋转图片
            this.controlBtns = document.querySelectorAll(".control li");//底部导航的按钮
        },
        getData: function (url) {
            var This = this;
            $.ajax({
                url: url,
                method: 'get',
                success: function (data) {
                    This.dataList = data;//存储数据
                    This.listPlay();//列表切歌，它要在loadMusic之前，因为this.list是在这个方法里赋值的要在loadMusic里使用
                    This.indexObj = new player.controlIndex(data.length);//给索引值对象赋值
                    This.loadMusic(This.indexObj.index)//加载音乐
                    This.musicControl(This.indexObj.index)//添加音乐操作功能
                    This.bindTouch();
                },
                error: function () {
                    alert("数据请求失败！")
                }
            });
        },
        loadMusic: function (index) {//加载音乐
            player.render(this.dataList[index]);//渲染页面
            player.pro.renderSongTime(this.dataList[index].duration);//渲染歌曲总时间
            player.music.load(this.dataList[index].audio);//加载音乐

            // 播放音乐
            if (player.music.status == "play") {
                player.music.play();
                this.controlBtns[2].className = "playing";//更改按钮状态
                this.imgRotate(0);//切歌时旋转图片
            }

            this.list.changeSelect(index);//改变列表中选中状态

            this.curIndex = index;//存储当前歌曲的索引值
        },
        musicControl: function () {//控制音乐播放器
            var This = this;
            // 上一首
            this.controlBtns[1].addEventListener("touchend", function () {
                player.music.status = "play";
                This.loadMusic(This.indexObj.prev());
                // 时间清零
                player.pro.stop();
                player.pro.start(0);
            });

            // 播放、暂停
            this.controlBtns[2].addEventListener("touchend", function () {
                if (player.music.status == "play") {
                    player.music.pause();
                    this.className = ""
                    clearInterval(This.imgRotateTimer);
                    player.pro.stop();
                } else {
                    player.music.play();
                    this.className = "playing";
                    player.pro.start();
                    var deg = This.record.dataset.rotate || 0;
                    This.imgRotate(deg);//切歌时旋转图片

                }
            });

            // 下一首
            this.controlBtns[3].addEventListener("touchend", function () {
                player.music.status = "play";
                This.loadMusic(This.indexObj.next());
                // 时间清零
                player.pro.stop();
                player.pro.start(0);
            });
        },
        imgRotate: function (deg) {//旋转图片
            var This = this;
            clearInterval(this.imgRotateTimer);
            this.imgRotateTimer = setInterval(function () {
                deg = (+deg + 0.2) % 360;
                This.record.style.transform = 'rotate(' + deg + 'deg)';
                This.record.dataset.rotate = deg;//把旋转角度存在标签上，为了暂停后继续播放能取值
            }, 1000 / 60)
        },
        listPlay: function () {//列表切歌
            var This = this;
            this.list = player.listControl(this.dataList, this.wrap);

            // 绑定歌曲列表关闭事件
            this.controlBtns[4].addEventListener("touchend", function () {
                This.list.sildeUp()
            });
            // 列表歌曲按钮事件
            this.list.musicList.forEach(function (item, index) {
                item.addEventListener("touchend", function () {
                    // 如果点击的是当前的那首歌，则不进行操作
                    if (index !== This.curIndex) {
                        This.indexObj.index = index;//更新当前索引
                        This.loadMusic(index);
                        if (player.music.status == "play") {
                            player.pro.start(0);
                        } else if (player.music.status == "pause") {
                            player.pro.start(0);
                            player.pro.stop();
                        }
                    }
                })
            })
        },
        //绑定拖拽事件 touchstart->touchmove->touchend
        bindTouch: function () {
            var This = this,
                circle = document.getElementsByClassName("circle")[0],
                drag = document.getElementsByClassName("drag")[0],
                width = drag.offsetWidth,
                left = drag.offsetLeft;

            circle.addEventListener("touchstart", function () {
                player.pro.stop();
            });
            circle.addEventListener("touchmove", function (e) {
                var x = e.changedTouches[0].clientX;
                var per = (x - left) / width;
                player.pro.upData(per);

            });
            circle.addEventListener("touchend", function (e) {
                var x = e.changedTouches[0].clientX;
                var per = (x - left) / width;
                per = per > 1 ? 1 : (per < 0 ? 0 : per);
                var time = Math.floor(This.dataList[This.curIndex].duration * per);
                player.music.playTo(time);
                player.pro.start(per);
                if (player.music.status == "pause") {
                    player.music.play()
                    This.controlBtns[2].className = "playing"
                }
            });
        }
    }

    var musicPlayer = new MusicPlayer(document.getElementById("wrap"))
    musicPlayer.init();
}(window.Zepto, window.player))

