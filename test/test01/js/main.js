$(function(){
	(function(){
		document.addEventListener('touchstart',function (event) {  
			if(event.touches.length>1){  
				event.preventDefault();  
			}  
		})  
		var lastTouchEnd=0;  
		document.addEventListener('touchend',function (event) {  
			var now=(new Date()).getTime();  
			if(now-lastTouchEnd<=300){  
				event.preventDefault();  
			}  
			lastTouchEnd=now;  
		},false)  	
		var SCREENTYPE = 'orientationchange' in window ? 'orientationchange' : 'resize';
		var DEFINENUMBER = 10;
		function setView(){
			var gg = document.documentElement;
			var width = gg.clientWidth;
			if(gg.clientWidth > 640){
				width = 640;
			}else if(gg.clientWidth < 320){
				width = 320;
			}
			gg.style.fontSize = width / DEFINENUMBER + 'px';
			return arguments.callee;
		}
		window.addEventListener(SCREENTYPE,setView());	
	})()

	var tool = {
		show : function(){
			$(document.body).addClass('main-show');
			$(document).on('touchstart',function(e){
				e.preventDefault();
			})
		},
		hide : function(){
			$(document.body).removeClass('main-show');
			$(document).off('touchstart');
		},
		addFixed : function(ele){
			$(ele).css('position','fixed');
		},
		removeFixed : function(ele,type){
			$(ele).css('position',type||'relative');
		}
	}

	// setTimeout(function(){
	// 	tool.show();
	// },1000)

	// setTimeout(function(){
	// 	tool.hide();
	// },3000)


})
