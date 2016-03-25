window.onload=function(){
	var thisviedo=document.getElementById('thisvideo');
	var doc=document.documentElement||docuemnt.body;
	var zhe=document.getElementById('zhe');
	var height=doc.scrollHeight;
	var width=doc.scrollWidth;
	var norclass=zhe.getAttribute('class');
	var nowclass=norclass+" opa";
	zhe.style.height=height+"px";
	zhe.style.width=width+"px";
	setTimeout(function(){
		thisvideo.play();
		zhe.setAttribute('class',nowclass);
		setTimeout(function(){
			zhe.style.display="none";
		},1000)
	},1500);
	var mp3=document.getElementById('mp3');
	mp3.onclick=function(){
		if(!thisvideo.paused){
			thisvideo.pause();
		}else{
			thisvideo.play();
		}	
	}
}
