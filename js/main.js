/*window.onload=function(){
	var width=document.documentElement.clientWidth||document.body.clientWidth;
	var center=((2118-width)/2);
	var bili=center/400;
	var nav=document.getElementById('nav');
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	var rightIsIn=false;
	var leftIsIn=false;

	nav.style.left=(-center)+"px";
	console.log(width)
	left.onmouseenter=function(){
		leftIsIn=true;
	}
	left.onmouseleave=function(){
		leftIsIn=false;
	}
	left.onmousemove=function(e){
		if(leftIsIn){
			nav.style.left=(-center+(400-e.clientX)*bili)+"px";
		}
	}
	right.onmouseenter=function(){
		rightIsIn=true;
	}
	right.onmouseleave=function(){
		rightIsIn=false;
	}
	right.onmousemove=function(e){
		if(rightIsIn){
			var leftoff=this.offsetLeft;
			nav.style.left=(-center-(e.clientX-leftoff))+"px";
		}
	}
}*/