window.onload=function(){
	var doc=document.documentElement||docuemnt.body;
	var zhe=document.getElementById('zhe');
	var height=doc.scrollHeight;
	var width=doc.scrollWidth;
	var norclass=zhe.getAttribute('class');
	var nowclass=norclass+" opa";
	zhe.style.height=height+"px";
	zhe.style.width=width+"px";
	setTimeout(function(){
		zhe.setAttribute('class',nowclass);
		setTimeout(function(){
			zhe.style.display="none";
		},1000)
	},1500);
	if(document.getElementById('trans-tooltip')){
		console.log(document.getElementById('trans-tooltip').parentNode);
	}else{
		console.log('not find')
	}
}
