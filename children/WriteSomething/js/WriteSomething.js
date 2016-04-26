(function(window){
	function WriteSomething(){
		this.config={
			frequency:500,
			data:['hello word!'],
			textChange:100,
			replay:true,
			stop:4000
		};
		this.moveIndex={
			one:0,
			two:0
		};
		this.onces=true;
		this.onces=true;
		this.showboolean=true;
		this.span='';
		this.time1='';
		this.time2='';
		this.str='';
	}
	WriteSomething.prototype={
		constructor:WriteSomething,
		doit:function(node,some){
			this.extende(this.config,some || {});//初始化
			var tlast=this.config.data[this.config.data.length-1].split('');
			tlast.push(' ');
			this.config.data[this.config.data.length-1]=tlast.join('');
			var main=document.getElementById(node);
			var h1=main.getElementsByTagName('h1')[0];
			var This=this;
			var tarr=this.config.data[0];
			this.span=main.getElementsByTagName('span')[0];			
			this.str=tarr.split('');
			
	
			this.time1=setInterval(function(){//span闪烁执行
				This.showStar.call(This);
			},this.config.frequency)
	
			this.time2=setInterval(function(){
				This.showText.call(This,h1,tarr,This);
			},this.config.textChange)
	
		},
		showStar:function(){
			this.showboolean ? this.span.style.display='none' : this.span.style.display='inline-block';
			this.showboolean=!this.showboolean;
		},
		showText:function(h1,tarr,This){
			this.once(function(some){
				clearInterval(some.time1)
			},this)
	
			h1.innerHTML+=this.str[this.moveIndex.one];
	
			this.moveIndex.one++;
			if(this.moveIndex.one==this.str.length){
				this.moveIndex.two++;
				if(this.moveIndex.two!=this.config.data.length){
					this.moveIndex.one=0;
					
					this.str=this.config.data[this.moveIndex.two].split('');
	
					clearInterval(this.time2);
					this.onces=true
					this.time1=setInterval(function(){
						This.showStar.call(This,This.span);
					},this.config.frequency)
					setTimeout(function(){
						h1.innerHTML='';
						This.time2=setInterval(function(){
							This.showText.call(This,h1,tarr,This);
						},This.config.textChange)
					},this.config.stop)	
	
				}else{
					if(this.config.replay){
	
						this.moveIndex={
							one:this.config.data[this.config.data.length-1].split('').length-1,
							two:-1
						}
					}else{
						clearInterval(this.time1)
						clearInterval(this.time2)
					}
				}
					
			}
		},
		once:function(fn,some){
			if(this.onces){
				fn(some);
				this.onces=false;	
			}
		},
		extende:function(a,b){
			for(var i in a){
				if(b[i]){
					a[i]=b[i];
				}
				
			}
		}
	}
	window.WriteSomething=WriteSomething;
})(window)
