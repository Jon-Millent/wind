;(function(root){
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

	var q={
		ready:function(callback) {
		    if (document.addEventListener) {
		        document.addEventListener('DOMContentLoaded', function () {
		            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
		            callback();
		        }, false)
		    }
		    else if (document.attachEvent) {
		        document.attachEvent('onreadytstatechange', function () {
		              if (document.readyState == "complete") {
		                        document.detachEvent("onreadystatechange", arguments.callee);
		                        callback();
		               }
		        })
		    }
		    else if (document.lastChild == document.body) {
		        callback();
		    }
		},
		getElementsByClassName : function(className,node){
			var parentNode = node || document;
			if(document.getElementsByClassName){
				return parentNode.getElementsByClassName(className);
			}else{
				
				var list  = parentNode.getElementsByTagName('*');
				var group = [];
				this.each(list,function(k,v){
					if(q.hasClass(v,className)){
						group.puah(v);
					}
				})
				return group;
			}
		},
		css:function(node,attr,value) {
		    switch (arguments.length) {
		        case 2:
		            if (typeof arguments[1] == "object") { 
		                for (var i in attr) node.style[i] = attr[i]
		            }
		            else { 
		                return node.currentStyle ? node.currentStyle[attr] : getComputedStyle(node, null)[attr]
		            }
		            break;
		        case 3:
		            node.style[attr] = value;
		            break;
		        default:
		            return "";
		    }
		},
		hasClass:function(node,name){
		   return  new RegExp('\\b'+name+'\\b','g').test(node.className);
		},
		addClass:function(obj,cls){
		   if(!this.hasClass(obj,cls)){
		   	if(obj.className==''){
		   		obj.className=cls;
		   	}else{
		   		obj.className+=' '+cls;
		   	}
		   }
		},
		removeClass:function(node,name){
		    if(this.hasClass(node,name)){
		    	var lastClass = new RegExp('\\s'+name+'\$');
		    	var classname = node.className;

		    	if(lastClass.test(node.className)){
		    		 node.className = classname.replace(lastClass,'');
		    	}else{
		    		 node.className = classname.replace(new RegExp('\\b'+name+'\\s\*\\b','g'),'');
		    	}
		    }
		},
		on:function(node,type,fn){
			node.fId = node.fId || fnFactory.createFactory();
			var fner = fnFactory.addRoom(node.fId,'fn');
			var typeArr = fner.add(type,[]);
			typeArr.push(fn);
			if(node.addEventListener){
				node.addEventListener(type,fn,false)
			}else{
				var tuo=function(){
					fn.call(node)
				}
				typeArr.push(tuo)
				node.attachEvent('on'+type,tuo);
			}
		},
		off:function(node,type){
			var fner = fnFactory.addRoom(node.fId,'fn');
			var typeArr = fner.add(type,[]);

			if(node.removeEventListener){
				for(var i=0;i<typeArr.length;i++){
					node.removeEventListener(type,typeArr[i],false);
				}
				
			}else{
				for(var i=0;i<typeArr.length;i++){
					node.detachEvent('on'+type,typeArr[i]);
				}	
			}
			fner.remove(type);
		},
		pao:function(e,type,fn){
			var ev=e||root.event;
			var tag=ev.target||ev.srcElement;
			if(tag.tagName.toLowerCase()==type){
				fn(tag);
			}
		},
		firstChild:function(node){
			return node.children[0] ? node.children[0] : false;
		},
		lastChild:function(node){
			var ls=node.children.length-1;
			return node.children[ls] ? node.children[ls] : false;
		},
		next:function(node){
			return node.nextElementSibling ? node.nextElementSibling : node.nextSibling;
		},
		prev:function(node){
			return node.previousElementSibling ? node.previousElementSibling : node.previousSibling;
		},
		getPxToBody:function (node,type){
			var a=node.offsetParent;
			var b=node['offset'+type];
			while(a){
				b+=a['offset'+type];
				a=a.offsetParent;
			}
			return b;
		},
		getPxToParent:function(node,type){
			return this.getPxToBody(node,type)-this.getPxToBody(node.parentNode,type)
		},
		insertAfter:function(node,newnode){
			var next = node.nextElementSibling ? node.nextElementSibling : node.nextSibling;
			if(next){
				node.parentNode.insertBefore(newnode,next);
			}else{
				node.parentNode.appendChild(newnode);
			}
			
		},
		insertBefore:function(node,newnode){
			node.parentNode.insertBefore(newnode,node);
		},
		each : function(arr,fn,that){
			var ff = that ? that : window;
			if(Object.prototype.toString.call(arr) == '[object Array]' || arr.length>0){
				for(var i=0;i<arr.length;i++){
					fn.call(ff,i,arr[i]);
				}
			}else if(typeof arr == 'number'){
				for(var i=0; i <arr; i++){
					fn.call(ff,i);
				}
			}else if(typeof arr == 'object'){
				for(var i in arr){
					fn.call(ff,i,arr[i]);
				}
			}
		},
		getNode : function(e){
			return document.getElementById(e);
		},
		mousewheel:function (obj,fn){
			console.log(obj)
			if(typeof obj.onmousewheel!=undefined){
				obj.onmousewheel=function(e){
					var ev=e||window.event;
					fn(ev,ev.wheelDelta/Math.abs(ev.wheelDelta))
				}
			}else{
				obj.addEventListener('DOMMouseScroll',function(e){
					fn(e,-e.detail/Math.abs(e.detail))
				},false)
			}
		}
	}
	root.q=q;
})(window)
