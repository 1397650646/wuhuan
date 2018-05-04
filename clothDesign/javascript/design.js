
// 页面滚动到一定高度，出现侧边导航和底部注册模块 	

var oAside = document.getElementsByClassName('aside')[0];
var oBottom = document.getElementsByClassName('bottom')[0];
var oClose = document.getElementById('close');
var closeBtn = true; //用来标记关闭按钮是否点击
window.onscroll = function () {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if ( scrollTop < 300 )
	{
		oAside.style.display = "none";
	}else {
		oAside.style.display = "block";
	};
	if ( scrollTop > 300 && closeBtn )
	{
		oBottom.style.display = "block";
	}else {
		oBottom.style.display = "none";
	}
};

//头部搜索框，点击发生变化

var oSearchBox = document.getElementById('search-box');
oSearchBox.onfocus = function () {
	this.placeholder = '时光资讯一网打尽';
	this.className = 'focuson';
};
oSearchBox.onblur = function () {
	this.placeholder = '搜索';
	this.className = '';
};
oClose.onclick = function () {
	oBottom.style.display = "none";
	closeBtn = false;
}

//点击加号，菜单变多
var oMRList = document.getElementsByClassName('m-r-list')[0];
var oPlus = document.getElementsByClassName('plus')[0];
var oMinus = document.getElementsByClassName('minus')[0];
oPlus.onclick = function () {
	this.style.display = 'none';
	oMinus.style.display = 'block';
	oMRList.style.top = '0px';
	oMRList.style.height = '550px';
};
oMinus.onclick = function () {
	this.style.display = 'none';
	oPlus.style.display = 'block';
	oMRList.style.top = '330px';
	oMRList.style.height = '175px';
};



