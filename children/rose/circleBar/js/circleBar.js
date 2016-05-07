(function(window){
	function circleBar(){
		this.box='';
		this.circle='';
		this.x=0;
		this.now=0;
		this.callback='';
		this.disable=false;
	}
	circleBar.prototype={
		constructor:circleBar,
		init:function(node,callback){
			this.box=node;
			this.circle=node.children[0];
			this.dosome(callback);
		},
		dosome:function(callback){
				this.circle.style.left=-this.circle.clientWidth/2+'px';
				this.callback=callback;
				var This=this;
				this.on(this.circle,'mousedown',function(e){
					if(!This.disable){
						var e=e||window.event;
						e.preventDefault();
						x=e.clientX-this.offsetLeft;
						This.on(document,'mousemove',function(e){
							var e=e||window.event;
							var tx=e.clientX-x;
							if(tx<=-This.circle.clientWidth/2){
								tx=-This.circle.clientWidth/2;
							}else if(tx>This.box.clientWidth-This.circle.clientWidth/2){
								tx=This.box.clientWidth-This.circle.clientWidth/2;
							}
							This.circle.style.left=tx+'px';
							This.now=This.toChangeNumb(tx+10,This.box.clientWidth);
							This.callback(This.now);
						})
						This.on(document,'mouseup',function(){
							This.off(document,'mousemove');
							This.off(document,'mouseup');
						})
					}else{
						return;
					}
				})	
			
		},
		moveTo:function(num){
			if(num>=0&&num<=100&&!this.disable){
				this.now=num;
				this.callback(this.now);
				this.circle.style.left=(num/100)*this.box.clientWidth+'px'
			}else{
				return;
			}
		},
		disabled:function(){
			this.disable=true;
		},
		undisabled:function(){
			this.disable=false;
		},
		on:function(node,type,fn){
			node.lib=node.lib||{};
			node.lib[type]=node.lib[type]||[];
			node.lib[type].push(fn)
			if(node.addEventListener){
				node.addEventListener(type,fn,false)
			}else{
				var tuo=function(){
					fn.call(node)
				}
				node.lib[type].push(tuo)
				node.attachEvent('on'+type,tuo);
			}
		},
		off:function(node,type){
			if(node.removeEventListener){
				for(var i=0;i<node.lib[type].length;i++){
					node.removeEventListener(type,node.lib[type][i],false);
				}
				node.lib[type]=[];
			}else{
				for(var i=0;i<node.lib[type].length;i++){
					node.detachEvent('on'+type,node.lib[type][i]);
				}
				node.lib[type]=[];
			}
		},
		toChangeNumb:function(a,b){
			var ty=(a/b)*100;
			return Math.floor(ty);
		}
	}
	window.circleBar=circleBar;
})(window)
