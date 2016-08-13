(function(){
	function Factory(ele,el2){
		this.init(ele,el2)
	}
	Factory.prototype.init=function(ele,el2){
		if(!ele.getContext){
			return false;
		}else{
			this.can = ele.getContext('2d');
			if(el2){
				var x = this.getPxToBody(ele,'Left');
				var y = this.getPxToBody(ele,'Top');
				var h = ele.offsetHeight;
				var w = ele.offsetWidth;

				el2.style.width = w + 'px';
				el2.style.height = h + 'px';
				el2.style.left = x + 'px';
				el2.style.top = y + 'px';
			}
		}
		
	};
	Factory.prototype.getDeg=function(deg){
		return Math.PI / 180 * deg;
	};
	Factory.prototype.getCavObj=function(){
		return this.can;
	};
	Factory.prototype.getPxToBody=function(noe,attr){
		var tp = noe['offset'+attr];
		noe=noe.offsetParent;
		while(noe){
			tp += noe['offset'+attr];
			noe=noe.offsetParent;
		}
		return tp;
	};
	Factory.prototype.drow=function(fn,config){
		for(i in config){
			this.can[i] = config[i]
		}
		this.can.beginPath();
		fn(this.can);
		this.can.closePath()
	}
	window.Pentakill = Factory;
})()
