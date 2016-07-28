(function(root,factory){
	if(!root.sImg){
		root.sImg = factory(undefined)
	}
})(this,function(un){
	var normalName='simg',
		sortNodeList=function(nodeList){
			var gArr=[];
			for(var i=0;i<nodeList.length;i++){
				var mes={};
				mes.node=nodeList[i];
				mes.px=getPxToBody(nodeList[i],'Top');
				gArr.push(mes)
			}
			gArr.sort(function(a,b){return a.px-b.px})
			delete mes;
			return gArr
		},
		getPxToBody=function(node,attr){
			var x=node['offset'+attr],b=node.offsetParent;
			while(b){
				x+=b['offset'+attr];
				b=b.offsetParent;
			}
			return x
		},on=function(node,type,fn){
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
		off=function(node,type){
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
		};
	function Simg(){
		this.diyName='';
		this.nodeList='';
	};
	Simg.prototype.init=function(nodeList,diyName){
		this.nodeList=sortNodeList(nodeList);
		this.diyName=diyName || normalName;
		
		this.onscrollMove()
	};
	Simg.prototype.resizeSrc=function(node){
		var imgLists=node.getElementsByTagName('img');
		for(var i=0;i<imgLists.length;i++){
			var attr=imgLists[i].getAttribute(this.diyName);
			if(attr){
				imgLists[i].setAttribute('src',attr)
				imgLists[i].removeAttribute(this.diyName)
			}
		}
	};
	Simg.prototype.comp=function(self){

		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		
		if(scrollTop+document.documentElement.clientHeight>=self.nodeList[0].px){
			this.active=true;
			if(this.active){
				self.resizeSrc(self.nodeList[0].node)
				self.nodeList.shift()
				if(self.nodeList.length==0){
					delete self.nodeList
					off(window,'scroll')
				}	
				this.active=false;
			}

		}
	}
	Simg.prototype.onscrollMove=function(){
		var self=this;
		self.comp(self)
		on(window,'scroll',function(){
			self.comp(self)
		})
	}
	return Simg;
})
