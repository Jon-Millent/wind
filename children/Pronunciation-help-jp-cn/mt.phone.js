(function(root){
	function FactoryBoom(){
		var data = {};
		this.index = 1;
		this.createFactory=function(){
			var id = this.createId();
			data[id] = {};
			return id;
		};
		this.get = function(){
			return data;
		};
		this.addRoom = function(id,dataName){
			data[id][dataName] = data[id][dataName] || {};
			return {
				add:function(name,datas){
					return data[id][dataName][name] = data[id][dataName][name] || datas;
				},
				remove : function(name){
					delete data[id][dataName][name];
				}
			};
		};
		this.removeRoom = function(id,dataName){
			delete data[id][dataName];
		};
	};
	FactoryBoom.prototype.createId=function(){
		return this.index++;
	};
	var fnFactory = new FactoryBoom();

	function Factory(node){
		this.node=node;
	};
	Factory.prototype.mousedown=function(fn){
		var root = this;
		this.on('touchstart',function(event){
			if(event.targetTouches.length == 1){
				fn.call(root.node,event.targetTouches[0]);
			}
		})
	};
	Factory.prototype.mainType = {
		'mousedown' : 'touchstart',
		'mouseup' : 'touchend',
		'mousemove' : 'touchmove'
	};
	Factory.prototype.mouseup=function(fn){
		var root = this;
		this.on('touchend',function(event){
			fn.call(root.node,event.targetTouches[0]);
		})
	};
	Factory.prototype.mousemove=function(fn){
		var root = this;
		this.on('touchmove',function(event){
			if(event.targetTouches.length == 1){
				fn.call(root.node,event.targetTouches[0]);
			}
		})
	};
	Factory.prototype.scroll=function(fn,fn2){
		var root=this;
		var first=0;
		this.mousedown(function(e){
			root.on('scroll',function(e){
				first=document.body.scrollTop || document.documentElement.scrollTop;
				fn(e,first);
			})
			if(fn2){
				var foog = document.body.scrollTop || document.documentElement.scrollTop;
				root.mouseup(function(e){
					
					var last=foog-document.body.scrollTop || document.documentElement.scrollTop;
					if(last>0){
						fn2(e,1);
					}else if(last==0){
						fn2(e,0);
					}else{
						fn2(e,-1);
					}
					root.off(root.node,'touchend');
					root.off(root.node,'scroll')
				})	
			}
		})	
	};	
	Factory.prototype.on=function(type,fn){
		this.node.fId = this.node.fId || fnFactory.createFactory();
		var fner = fnFactory.addRoom(this.node.fId,'fn');
		var typeArr = fner.add(type,[]);
		typeArr.push(fn);
		this.node.addEventListener(type,fn,false)
	};
	Factory.prototype.off=function(type){
		if(type == 'scroll'){
			
		}else{
			var nowType = this.mainType[type];
			var fner = fnFactory.addRoom(this.node.fId,'fn');
			var typeArr = fner.add(nowType,[]);
			for(var i=0;i<typeArr.length;i++){
				this.node.removeEventListener(nowType,typeArr[i],false);
			}
			fner.remove(nowType);	
		}
		
	};
	Factory.prototype.css=function(attr,value) {
	    switch (arguments.length) {
	        case 1:
	            if (typeof arguments[0] == "object") { 
	                for (var i in attr) this.node.style[i] = attr[i]
	                return this;  
	            }
	            else { 
	                return getComputedStyle(this.node, null)[attr]
	            }
	            break;
	        case 2:
	            this.node.style[attr] = value;
	        	return this;    
	            break;
	        default:
	            return "";
	    }

	};
	Factory.prototype.hasClass=function(name){
		
	   return  new RegExp('\\b'+name+'\\b','g').test(this.node.className);
	};
	Factory.prototype.addClass=function(cls){
	   if(!this.hasClass(cls)){
	 
	   	if(this.node.className==''){
	   		this.node.className=cls;
	   	}else{
	   		this.node.className+=(' '+cls);
	   	}
	   }
	};
	Factory.prototype.removeClass=function(name){
	    if(this.hasClass(name)){
	    	var lastClass = new RegExp('\\s'+name+'\$');
	    	var classname = this.node.className;

	    	if(lastClass.test(this.node.className)){
	    		 this.node.className = classname.replace(lastClass,'');
	    	}else{
	    		 this.node.className = classname.replace(new RegExp('\\b'+name+'\\s\*\\b','g'),'');
	    	}
	    }
	};
	root.$=function(node){
		if(typeof node=='object'){
			return new Factory(node)
		}else if(typeof node == 'function'){
			if (document.addEventListener) {
		        document.addEventListener('DOMContentLoaded', function () {
		            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
		            node();
		        }, false)
		    }
		}
		
	}
})(window)
