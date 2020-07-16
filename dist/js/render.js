//渲染功能：渲染图片、音乐信息、是否喜欢

(function (root) {
	// 渲染图片
	function renderImg(src) {
		var img = document.querySelector(".songImg img");
		img.src = src;
		img.onload = function () {
			root.blurImg(img); // 给body添加背景图
		}
	}

	// 渲染音乐信息
	function renderInfo(data) {
		var songInfoChildren = document.querySelector(".songInfo").children;
		songInfoChildren[0].innerHTML = data.song;
		songInfoChildren[1].innerHTML = data.singer;
		songInfoChildren[2].innerHTML = data.album;
	}

	// 渲染是否喜欢
	function renderIslike(isLike) {
		var lis = document.querySelectorAll(".control li");
		lis[0].className = isLike ? "liking" : "";
	}

	root.render = function (data) {// data为请求过来的信息，必填
		renderImg(data.image);
		renderInfo(data);
		renderIslike(data.isLike);
	};
})(window.player || (window.player = {}))