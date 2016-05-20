(function(root,factory){

	root.Rili=factory();
	
})(this,function(module){

	var hasClass=function (node,name,type){
	    var arr=node.className.split(' ');
	    var isFind=false;
	    for(var i =0;i<arr.length;i++){
	        if(arr[i]==name){
	            isFind=true;
	        }
	    }
	    if(type){
	        return [isFind,arr];
	    }else{
	        return isFind;
	    }
	},
	addClass=function (obj,cls){
	    if(!hasClass(obj,cls)){
	        obj.className+=(" "+cls);
	    }
	},
	removeClass=function (node,name){
	    if(hasClass(node,name,true)[0]){
	        var arr=hasClass(node,name,true)[1];
	        for(var i=0;i<arr.length;i++){
	            if(arr[i]==name){
	                arr.splice(i,1);
	            }
	        }
	        node.className=arr.join(' ');
	    }
	},
	on=function(node,type,fn){
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
	},
	getPxToBody=function (node,type){
		var a=node.offsetParent;
		var b=node['offset'+type];
		while(a){
			b+=a['offset'+type];
			a=a.offsetParent;
		}
		return b;
	},
	isFullYear=function(year){
		if(parseInt(year/100)==year/100){
			//世纪年
			return parseInt(year/400)==year/400 ? true : false;
		}else{
			return  parseInt(year/4)==year/4 && parseInt(year/100)!=year/100  ? true : false;
		}
	},
	getTwoMont=function(year){
		return isFullYear(year) ? 29 : 28;
	},
	getMontFirstDay=function(a,b,c){
		return new Date(String(a),String(b-1),String(c)).getDay();
	},
	createElements=function(tagName,name,type){
		var t=document.createElement(tagName);
		if(arguments.length>1){
			t[type]=name;
			return t;
		}else{
			return t;
		}
	},
	createMain=function(){
		var tmain=createElements('ul','date','className');
		for(var i=0;i<7;i++){
			tmain.appendChild(document.createElement('li'))
		}
		return tmain;
	},
	extend=function(a,b){
		for(var i in b){
			a[i]=b[i]
		}
	};
	var Rili=function(node,config){
		var self=this;
		var time=new Date();
		self.mainYear=time.getFullYear();
		self.mainMonth=time.getMonth()+1;
		self.node=node;
		self.date=[31,getTwoMont(new Date().getFullYear()),31,30,31,30,31,31,30,31,30,31];
		self.nowDate={year:self.mainYear,month:self.mainMonth};
		self.list='';
		self.title='';
		self.config={
			from:'1897',
			to:'2016',
			normalDate:'',
			afterClick:function(data){

			},
			noChangeValue:false
		};
		extend(self.config,config||{});
		this.init();
	}
	Rili.prototype={
		init:function(){
			this.drow();
			var nodeList=this.getNodeList();
			this.list=nodeList.list;
			this.title=nodeList.inow;
			nodeList.rili.style.top=(getPxToBody(this.node,'Top')+this.node.offsetHeight)+'px';
			nodeList.rili.style.left=(getPxToBody(this.node,'Left')-(nodeList.rili.offsetWidth-this.node.offsetWidth)/2)+'px';
			if(!this.config.normalDate){
				this.setDates(this.nowDate.year,this.nowDate.month);
			}else{
				var tarr=this.config.normalDate.split(',');
				this.setDates(tarr[0],tarr[1]);
				this.nowDate={year:tarr[0],month:tarr[1]};
			}
			this.btnAddEvent(nodeList.prev,nodeList.next,nodeList.content);
		},
		drow:function(){
			var tbox=createElements('div','rili','id');
			tbox.innerHTML='<div class="header"><div class="prev">prev</div><div class="inow">'+new Date().getFullYear()+'</div><div class="next">next</div></div>';
			var tcontent=createElements('div','content','className');
			tcontent.innerHTML='<div class="theader"><ul><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul></div>';
			for(var j=0;j<=5;j++){
				tcontent.appendChild(createMain());
			}
			tbox.appendChild(tcontent);
			document.body.appendChild(tbox);
		},
		getNodeList:function(){
			var tlist={};
			tlist.rili=document.getElementById('rili');
			var header=tlist.rili.children[0];
			tlist.prev=header.children[0];
			tlist.inow=header.children[1];
			tlist.next=header.children[2];
			tlist.list=[];
			var content=tlist.rili.children[1];
			tlist.content=content;
			for(var i=0;i<content.children.length-1;i++){
				for(var j=0;j<7;j++){
					var ax=content.children[i+1].children[j];
					ax.innerHTML='&nbsp';
					tlist.list.push(ax);
				}
			}
			return tlist;
		},
		setDates:function(year,month){
			var star=getMontFirstDay(year,month,1);
			this.title.innerHTML=year+'年'+month+'月';
			var tNow=getMontFirstDay(year,month,1);
			for(var k=this.list.length-1;k>this.list.length-20;k--){
				this.list[k].innerHTML='&nbsp';
			}
			for(var i=0;i<this.date[month-1];i++){
				
				this.list[i+tNow].innerHTML=i+1;
				
			}
			for(var j=0;j<tNow;j++){
				this.list[j].innerHTML='&nbsp';
			}
		},
		next:function(){
			var oop=this.monthAndYear(true);
			this.setDates(oop[0],oop[1]);
		},
		prev:function(){
			var oop=this.monthAndYear(false);
			this.setDates(oop[0],oop[1]);
		},
		monthAndYear:function(type){
			
			if(type){
				//Add
				if(this.nowDate.year<this.config.to){
					if(this.nowDate.month<12){
						this.nowDate.month++;
					}else{
						this.nowDate.year++;
						this.nowDate.month=1;					
					}
				}else{
					if(this.nowDate.month<this.mainMonth){
						if(this.nowDate.month<12){
							this.nowDate.month++;
						}else{
							this.nowDate.year++;
							this.nowDate.month=1;					
						}
					}
				}
			}else{
				if(this.nowDate.year>this.config.from&&this.nowDate.month>0){
					if(this.nowDate.month>1){
						this.nowDate.month--;
					}else{
						this.nowDate.year--;
						this.nowDate.month=12;					
					}
				}
			}
			return [this.nowDate.year,this.nowDate.month];
		},
		btnAddEvent:function(btn1,btn2,ul){
			var self=this;
			on(btn1,'click',function(e){
				var e=e||window.event;
				e.preventDefault();
				self.next();
				return false;
			})
			on(btn2,'click',function(e){
				var e=e||window.event;
				e.preventDefault();
				self.prev();
				return false;
			})
			on(ul,'click',function(e){
				var e=e||window.event;
				var tar=e.target||e.srcElement;
				e.preventDefault();
				if(tar.tagName.toLowerCase()=='li'&&parseInt(tar.innerHTML)){
					if(!self.config.noChangeValue){
						self.node.value=self.nowDate.year+'-'+self.nowDate.month+'-'+tar.innerHTML;
					}
					self.config.afterClick([self.nowDate.year,self.nowDate.month,Number(tar.innerHTML)]);
				}
				return false;
			})
		}
	}
	return Rili;
})
