(function(root,jq){
	if(jq){
		function M(node,opa){
			this.index = 0;
			this.opa = {
				childName : 'String',
				isRound : false,
			    	fitst : 0,
			    	timeOnce : 1000,
				start : function(){},
				next : function(){},
				prev : function(){}
			};
			this.init(node,opa)
		};
		M.prototype.init=function(node,opa){
			this.node = jq(node);
			jq.extend(this.opa,opa);
			this.childrenList = this.node.find('.'+opa.childName);
			this.len = this.childrenList.length;
			this.index = this.opa.fitst;

			this.addEvent()
			this.opa.start(this.index,this.childrenList[this.index]);
		};
		M.prototype.addEvent = function(){
			var num = 0;
			var toScroll = true;
			var timeOnce = this.opa.timeOnce;
			var roots = this;
			this.mousewheel(this.node.get(0),function(a,b){
				// -1 = 向下滚动
				if(toScroll){
					if(b==-1){
						num+=1;
						if(num>1){
							toScroll = false;
							setTimeout(function(){
								toScroll = true;
								num = 0;
							},timeOnce)
							
							roots.add.call(roots,function(){
								var prev = roots.index;
								var prevObj = null;
								if(roots.opa.isRound){
									if(roots.index-1 < 0){
										prev = roots.len-1;
									}else{
										prev -= 1;
									}
								}else{
									if(roots.index-1 < 0){
										prev = false;
									}else{
										prev -= 1;
									}
								}
								prevObj = prev === false ? undefined : roots.childrenList[prev]
								roots.opa.next(roots.index,roots.childrenList[roots.index],prevObj)
							});
							
						}
					}else{
						num+=1;
						if(num>1){
							toScroll = false;
							setTimeout(function(){
								toScroll = true;
								num = 0;
							},timeOnce)

							roots.sub.call(roots,function(){
								var prev = roots.index;
								var prevObj = null;
								if(roots.opa.isRound){
									if(roots.index+1 > roots.len-1){
										prev = 0;
									}else{
										prev += 1;
									}
								}else{
									if(roots.index+1 > roots.len-1){
										prev = false;
									}else{
										prev += 1;
									}
								}
								prevObj = prev === false ? undefined : roots.childrenList[prev]

								roots.opa.prev(roots.index,roots.childrenList[roots.index],prevObj)
								
							});
						}
					}	
				}
			})
		};
		M.prototype.add=function(fn){

			if(this.index<this.len-1){
				this.index++;
				fn();
			}else{
				if(this.opa.isRound){
					this.index=0;
					fn();
				}
			}
		};
		M.prototype.sub=function(fn){

			if(this.index>0){
				this.index--;
				fn();
			}else{
				if(this.opa.isRound){
					this.index=this.len-1;
					fn();
				}
			}
		};
		M.prototype.mousewheel = function(obj,fn){
			if(typeof document.onmousewheel != "undefined"){
				obj.onmousewheel=function(e){
					var ev=e||window.event;
					fn.call(this,ev,ev.wheelDelta/Math.abs(ev.wheelDelta))
				}
			}else{
				obj.addEventListener('DOMMouseScroll',function(e){
					fn.call(this,e,-e.detail/Math.abs(e.detail))
				},false)
			}
		}
		jq.fn.mouseshow=function(opacity){

			return new M(this,opacity);

		}	

	}
	

})(window,jQuery)
