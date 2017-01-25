
q.ready(function(){
	

	var XNORMAL = 26;
	var YNORMAL = 26;
	var WIDTHNORMAL = 70;
	var YHEIGHTNORMAL = 50;
	var isNew = false;
	var XARR = 10;
	var YARR = 10;
	var zIndex = 100;
	var timeer = 0;
	var ctrl = false;
	var wrop = null;

	var con = q.getNode('con');
	var mainbox = q.getNode('mainbox');
	var tablebox = q.getNode('tablebox');
	var x = q.getNode('x');
	var y = q.getNode('y');
	var testwrap = q.getNode('testwrap');
	var table = document.createElement('table');
	var TEXTX = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var styleSheets = document.styleSheets[1] || document.styleSheets[1] || window.CSSRule.STYLE_RULE;
	var ocssRules=styleSheets.cssRules || styleSheets.rules || styleSheets;  
	/*
		eles
	*/
	var newButton = q.getNode('newButton'); //新建
	var newButtonCopy = q.getNode('newButton-copy'); //新建
	var newButtonOK = q.getNode('newButtonOK'); //新建后OK

	var newButtonPass = q.getNode('passButton'); //通用
	var newButtonPassCopy = q.getNode('passButton-copy'); //通用
	var newButtonPassG = q.getNode('newButtonPassG'); //通用
	var formPass = q.getNode('form-pass');

	var xieButton = q.getNode('xieButton');
	var xieButtonCopy = q.getNode('xieButton-copy');
	var xieButtonDo = q.getNode('newButtonXie');
	var xieTestItem = q.getNode('xieTest').children;
	var formXie = q.getNode('formXie');

	var tableRev = q.getNode('table-rev'); //行高切换
	var objname = q.getNode('objname'); //标题
	var mesXY = q.getNode('mesXY'); //坐标显示
	var xWrap = x.children[0];
	var yWrap = y.children[0];
	var borderSelect = q.getNode('borderSelect');
	var closeGroup = q.getElementsByClassName('close');

	var selectSSS = q.getNode('selectAll');

	var zhe =q.getNode('zhe');

	var textButton = q.getNode('textButton');
	var calcelButton = q.getNode('calcelButton');
	
	var selfButton = q.getNode('selfButton');

	var getButton = q.getNode('getButton');

	/*
		eles
	*/

	/*
	data
	*/
	var tableMessage = {
		tableName : 'myTable',
		width : 60,
		height : 30,
		lineHeight : 30,
		textAlign : 'center',
		x : XARR,
		y : YARR,
		tableWidth : 0,
		tableHeight : 0,
		tabObj : null,
		border : '1px solid #000',
	}
	/*
	data
	*/
	var mesShow = {
		isSelect : false,
		selectObj : []
	}
	var toolHelp = {
		setRuler : function(){
			var NOWWIDTH = testwrap.offsetWidth;
			var NOWHeight = mainbox.offsetHeight;
			x.style.width = NOWWIDTH-20 + 'px';
			y.style.height = NOWHeight-20 + 'px';

			
			xWrap.innerHTML = yWrap.innerHTML = '';
			q.each(XNORMAL,function(k,v){
				var span = document.createElement('span');
				span.index = k;
				span.style.width = WIDTHNORMAL+'px';
				span.innerHTML = TEXTX[k];
				xWrap.appendChild(span);
				xWrap.style.width = xWrap.offsetWidth + WIDTHNORMAL + 'px';
			})
			q.each(YNORMAL,function(k,v){
				var span = document.createElement('span');
				span.index = k;
				span.style.height = YHEIGHTNORMAL+'px';
				span.style.lineHeight = YHEIGHTNORMAL+'px';
				span.innerHTML = k+1;
				yWrap.appendChild(span);
				yWrap.style.height = yWrap.offsetWidth + WIDTHNORMAL + 'px';
			})
		},
		resize : function(){
			zhe.style.height = document.documentElement.clientHeight+'px';
			zhe.style.width = document.documentElement.clientWidth+'px';
			zhe.style.display = 'none';
			con.style.height = mainbox.style.height = (document.documentElement.clientHeight - 110)+'px';
			tablebox.style.height = document.documentElement.clientHeight - 130+'px';
			tablebox.style.width = mainbox.offsetWidth - 20+'px';	
			var hrefX = mainbox.offsetWidth / 2;
			var hrefY = mainbox.offsetHeight / 2;
			x.style.marginLeft = -(hrefX - 20)+'px';
			x.style.marginTop = -(hrefY)+'px';
			y.style.marginLeft = -(hrefX)+'px';
			y.style.marginTop = -(hrefY - 20)+'px';
		},
		addRule : function(name,type,attrName,attr){
			var s = styleSheets.cssRules.length;
			var text = '';
			this.styleObject[name] = this.styleObject[name] || {};
			this.styleObject[name].text = this.styleObject[name].text || {};
			this.styleObject[name].text[type] = attr;

			q.each(this.styleObject[name].text,function(k,v){
				text+=v;
			})
			if(styleSheets.insertRule){ 
				styleSheets.insertRule(attrName+" {"+text+"} ",s)
			}else{
				styleSheets.addRule(attrName,text,s)
			}
			
			this.styleObject[name].obj = ocssRules[styleSheets.cssRules.length-1];

		},
		styleObject : {

		},
		setitem:function(obj,k,attr,value){

			var gg = obj.children[0].children[k];
			switch(attr){
				case "width":
					gg.style.width = value+'px';
					break;
				case "height":
					gg.style.height = gg.style.lineHeight = value+'px';	
					break;
			}
		},
		setXieLine : function(type,color,bgColor,parentss,text1,text2){
			parentss.innerHTML = '';
			var bLine = document.createElement('span');
			var cLine = document.createElement('span');

			var con1 = document.createElement('span');
			var con2 = document.createElement('span');

			var parentBgColor = bgColor;
			var GGLine = {};


			parentss.style.position = 'relative';
			parentss.style.overflow = 'hidden';

			var W = parentss.clientWidth;
			var H = parentss.clientHeight;
			var LINEWidth = parentss.clientWidth/2 + 'px';
			var LINEHeight = parentss.clientHeight/2 + 'px';

			bLine.style.position = cLine.style.position = con1.style.position = con2.style.position = 'absolute';
			bLine.style.borderStyle = cLine.style.borderStyle = 'solid';
			bLine.style.display = cLine.style.display = con1.style.display = con2.style.display = 'block';
			bLine.style.left = bLine.style.top  ='0px';
			
			con1.innerHTML = text1;
			con2.innerHTML = text2;

			GGLine.width = LINEHeight+' '+LINEWidth+' '+LINEHeight+' '+LINEWidth;
			if(type == 1){
				cLine.style.left = '1px';
				cLine.style.top = '-1px';
				GGLine.colorX = color+ ' '+color+' '+'transparent transparent';
				GGLine.colorY = bgColor+ ' '+bgColor+' '+'transparent transparent';
			}else{
				cLine.style.left = '-1px';
				cLine.style.top = '-1px';
				GGLine.colorX = color+' transparent transparent '+color;
				GGLine.colorY = bgColor+' transparent transparent '+bgColor;
			}

			bLine.style.borderWidth = cLine.style.borderWidth = GGLine.width;
			bLine.style.borderColor = GGLine.colorX;
			cLine.style.borderColor = GGLine.colorY;



			parentss.appendChild(bLine);
			parentss.appendChild(cLine);
			parentss.appendChild(con1);
			parentss.appendChild(con2);

			return function(){

				var GH1 = H/2 + (H/2 - con1.offsetHeight) / 2 + 'px';
				var GH2 = (H/2  - con1.offsetHeight )/ 2 +'px';
				if(type==1){
					con1.style.top = GH1;
					con2.style.top = GH2;
				}else{
					con2.style.top = GH1;
					con1.style.top = GH2;
				}

				con1.style.left = (W/2 - con1.offsetWidth) / 2 + 'px'; 
				con2.style.left = ((W+W/2) - con2.offsetWidth) / 2 + 'px'; 
			}
			
		},
		setTuoFeng : function(d){
			var gg = d.split('-');
			gg[1] = gg[1].replace(/^([a-zA-Z]{1,}?)/,function(a,b,c){
				return a.toUpperCase();
			})
			return gg.join('');
		}
	}
	var cssHelp = {
		setTrTh : function(type,text){
			toolHelp.addRule('trth',type,"."+tableMessage.tableName +" tr,"+"."+tableMessage.tableName+" th",text+';');
		},
		setTable : function(type,text){
			toolHelp.addRule(tableMessage.tableName,type,"."+tableMessage.tableName,text+";");
		},
		setXLine : function(type,text,num){
			toolHelp.addRule('xline',type,'.'+tableMessage.tableName+' .y-'+num,text+";");
		},
		setYLine : function(type,text,num){
			toolHelp.addRule('xline',type,'.'+tableMessage.tableName+' .row-'+num +' th',text+";");
		},
		setAllTh : function(type,text){
			toolHelp.addRule('trth',type,"."+tableMessage.tableName+" th",text+';');
		}
	}


	var windowHelp = {
		close : function(node,className,time){
			q.removeClass(node,className);
			setTimeout(function(){
				node.style.display = 'none';
			},500);
		},
		open : function(node,className){
			node.style.display = 'block';
			setTimeout(function(){
				q.addClass(node,className);
			},10);
		},
		chouseType : '',
		openZhe : function(){
			if(zhe.style.display == 'none'){
				zhe.style.display = 'block';
			}else{
				zhe.style.display = 'none';
			}
		},
		getForm : function(form){
			var ggs = {};
			q.each(form.elements,function(k,v){
				ggs[v.getAttribute('name')] = v.value;
			})
			return ggs;
		},
		compNowW : function(){
			q.each(tableMessage.y,function(k,v){
				var lister = tableMessage.tabObj.children[k];

				toolHelp.setitem(y,k,'height',lister.children[0].offsetHeight);
				q.each(tableMessage.x,function(key,value){

					toolHelp.setitem(x,key,'width',lister.children[key].offsetWidth);

				})	
			})	
		}
	}
	var listHelp = {
		cancelBg : function(){
			q.each(mesShow.selectObj,function(k,v){
				q.removeClass(v,'activer');
			})
		},
		addBg : function(){
			q.each(mesShow.selectObj,function(k,v){
				q.addClass(v,'activer');
			})
		},
		removeAll : function(){
			mesShow.selectObj = [];
		},
		add : function(v){
			mesShow.selectObj.push(v)
		},
		notChouse : function(){
			this.cancelBg();
			this.removeAll();
		}
	}
	//只执行一次
	toolHelp.resize();

	//可以执行多次的样式重置，例如新建。
	toolHelp.setRuler();

	//无侵入式define

	//新建
	function newProject(node){
		if(node.style.display == 'none'){
			node.style.zIndex = ++zIndex;
			windowHelp.open(node,'window-open');
		}else{
			windowHelp.close(node,'window-open');
		}
	}
	q.on(newButton,'click',function(){
		windowHelp.openZhe();
		newProject(newButtonCopy);
	})
	//新建OK后关闭,执行render操作
	q.on(newButtonOK,'click',function(){

		if(isNew){
			alert('已经新建，无法重新创建。刷新页面重置。')
			return 0;
		}
		isNew = true;

		var inputs = newButtonCopy.getElementsByTagName('input');
		q.each(inputs,function(k,v){
			tableMessage[v.name] = v.value || tableMessage[v.name];
		})
		q.each(tableRev.children,function(k,v){
			if(q.hasClass(v,'active')){
				tableMessage.textAlign = v.getAttribute('title');
			}
		})

		var parAttr = ['width','height','x','y'];
		q.each(parAttr,function(k,v){
			tableMessage[v] = parseInt(tableMessage[v]);
		})
		tableMessage.tableWidth = tableMessage.x*tableMessage.width;
		tableMessage.tableHeight = tableMessage.y*tableMessage.height;

		tableMessage.tabObj = document.createElement('table');
		q.addClass(tableMessage.tabObj,tableMessage.tableName);
		tableMessage.tabObj.style.width =tableMessage.tableWidth +'px';
		tableMessage.tabObj.style.height = tableMessage.tableHeight + 'px';


		cssHelp.setTable('borderCollapse','border-collapse:collapse;');
		cssHelp.setTable('fontSize','font-size:12px;');
		cssHelp.setTrTh('border','border: '+tableMessage.border);
		cssHelp.setAllTh('lineHeight','line-height:'+tableMessage.lineHeight+'px');
		cssHelp.setAllTh('textAlign','text-align:'+tableMessage.textAlign+';');
		cssHelp.setAllTh('fontWeight','font-weight:normal;');
		cssHelp.setAllTh('width','width:'+tableMessage.width+'px;');
		cssHelp.setAllTh('height','height:'+tableMessage.height+'px;');

		
		q.each(tableMessage.y,function(k,v){
			var tr = document.createElement('tr');
			q.addClass(tr,'row-'+k);
			q.each(tableMessage.x,function(key,value){
				var th = document.createElement('th');
				q.addClass(th,'x-'+k);
				q.addClass(th,'y-'+key);
				tr.appendChild(th);
				th.index = key;
			})	

			if(k>YNORMAL-1){
				var span = document.createElement('span');
				span.index = k;
				span.innerHTML = k+1;	
				yWrap.appendChild(span);
				yWrap.style.height = xWrap.offsetHeight + YHEIGHTNORMAL + 'px';	
			}
			tableMessage.tabObj.appendChild(tr);
		})
		q.each(tableMessage.x,function(k,v){
			if(k>XNORMAL-1){
				var span = document.createElement('span');
				span.style.width = WIDTHNORMAL+'px';
				span.innerHTML = 'Z-'+(k+1);	
				xWrap.appendChild(span);
				xWrap.style.width = xWrap.offsetWidth + WIDTHNORMAL + 'px';
			}
		})
		tablebox.appendChild(tableMessage.tabObj);

		windowHelp.compNowW();	
		objname.innerHTML = tableMessage.tableName;
		newProject(newButtonCopy);
		windowHelp.openZhe();


		q.on(tableMessage.tabObj,'mouseover',function(e){
			if(!mesShow.isSelect){
				q.pao(e,'th',function (ele) {
					mesXY.innerHTML = ele.className;
				})
			}
		})
		q.on(tableMessage.tabObj,'click',function(e){

			if(mesShow.isSelect){
				listHelp.cancelBg();
				listHelp.removeAll();
				mesShow.isSelect = false;
			}
			windowHelp.chouseType ={type : 1};
			var isHave = false;
			q.pao(e,'th',function (ele) {
				if(!ctrl){
					if(wrop == ele){
						listHelp.notChouse();
						wrop = null;
						return;
					}
					listHelp.notChouse();

					mesShow.selectObj.push(ele);
					q.addClass(ele,'activer');
					wrop = ele;
					
				}else{
					console.log('123')
					q.each(mesShow.selectObj,function(k,v){
						if(v == ele){
							isHave = true;
							mesShow.selectObj.splice(k,1);
							q.removeClass(ele,'activer');
						}
					})
					if(!isHave){
						mesShow.selectObj.push(ele);
						q.addClass(ele,'activer');
					}
					mesXY.innerHTML = '选择 '+mesShow.selectObj.length+' 个';	

				}
				if(mesShow.selectObj.length == 0){
					mesShow.isSelect = false;
				}
				try{
					textButton.value = mesShow.selectObj[0].innerHTML;
				}catch(e){

				}
				textButton.focus();
				return ;
			})
		})
		q.on(x,'click',function(e){
			q.pao(e,'span',function(ele){
				if(ele.index < tableMessage.x){
					windowHelp.chouseType = {type : 2,index :ele.index};
					mesShow.isSelect = true;
					listHelp.cancelBg();
					listHelp.removeAll();
					q.each(q.getElementsByClassName('y-'+ele.index,tableMessage.tabObj),function(k,v){
					 	listHelp.add(v);
					})

					listHelp.addBg();
					mesXY.innerHTML = '选择 '+mesShow.selectObj.length+' 个';
					textButton.focus();
				}
			})
		})
		q.on(y,'click',function(e){
			q.pao(e,'span',function(ele){
				if(ele.index < tableMessage.y){
					windowHelp.chouseType = {type : 3,index :ele.index};
					mesShow.isSelect = true;
					listHelp.cancelBg();

					listHelp.removeAll();
					q.each(q.getElementsByClassName('x-'+ele.index,tableMessage.tabObj),function(k,v){
					 	listHelp.add(v);
					})

					listHelp.addBg();
					mesXY.innerHTML = '选择 '+mesShow.selectObj.length+' 个';
					textButton.focus();
				}
			})
		})
		q.on(selectSSS,'click',function(e){
			mesShow.isSelect = true;
			windowHelp.chouseType = {type : 4};
			listHelp.cancelBg();
			listHelp.removeAll();
			q.each(tableMessage.tabObj.children,function(k,v){
				q.each(v.children,function(key,value){
			 		listHelp.add(value);
				})
			})
			listHelp.addBg();
			mesXY.innerHTML = '选择 '+mesShow.selectObj.length+' 个';
			textButton.focus();
		})
	})
	q.on(tableRev,'click',function(e){
		q.pao(e,'span',function(ele){

			q.each(ele.parentNode.children,function(k,v){
				q.removeClass(v,'active');
			})
			q.addClass(ele,'active');
		})
	})
	q.on(tablebox,'scroll',function(a){

		y.scrollTop= tablebox.scrollTop;
		x.scrollLeft = tablebox.scrollLeft;
	})
	q.on(borderSelect,'click',function(e){
		var tar = e.target || e.srcElement;
		if(q.hasClass(tar,'ic')){
			q.each(tar.parentNode.children,function(k,v){
				q.removeClass(v,'active');
			})
			q.addClass(tar,'active');
		}
	})
	q.each(closeGroup,function(k,v){
		q.on(v,'click',function(){
			newProject(this.parentNode.parentNode);
			windowHelp.openZhe();
		})
	})


	q.on(newButtonPass,'click',function(){
		windowHelp.openZhe();
		newProject(newButtonPassCopy);
	})


	//执行通用
	q.on(newButtonPassG,'click',function(){
		windowHelp.openZhe();

		if(mesShow.selectObj.length > 0){
			var datas = windowHelp.getForm(formPass);

			switch(windowHelp.chouseType.type){
				case 1:

					q.each(mesShow.selectObj,function(key,value){
						q.each(datas,function(k,v){
							if(v!=''){
								if(/-/.test(v)){
									value.style[toolHelp.setTuoFeng(k)] = v;
								}else{
									value.style[k] = v;
								}
							}
						})
					})

					break;
				case 2:
					
					q.each(datas,function(k,v){

						if(v!=''){

							if(/-/.test(v)){
								console.log(k,v)
								cssHelp.setXLine(toolHelp.setTuoFeng(k),k+':'+v,windowHelp.chouseType.index);
							}else{
								cssHelp.setXLine(k,k+':'+v,windowHelp.chouseType.index);
							}
						}
					})

					break;
				case 3:
					
					q.each(datas,function(k,v){

						if(v!=''){

							if(/-/.test(v)){
								console.log(k,v)
								cssHelp.setYLine(toolHelp.setTuoFeng(k),k+':'+v,windowHelp.chouseType.index);
							}else{
								cssHelp.setYLine(k,k+':'+v,windowHelp.chouseType.index);
							}
						}
					})

					break;
				case 4:
					
					q.each(datas,function(k,v){

						if(v!=''){

							if(/-/.test(v)){
								console.log(k,v)
								cssHelp.setAllTh(toolHelp.setTuoFeng(k),k+':'+v);
							}else{
								cssHelp.setAllTh(k,k+':'+v);
							}
						}
					})

					break;
			}
			windowHelp.compNowW();
		}

		newProject(newButtonPassCopy);
		
	})
	q.on(xieButton,'click',function(){
		newProject(xieButtonCopy);
		windowHelp.openZhe();
	})

	//执行斜线
	q.on(xieButtonDo,'click',function(e){
		var ggMes = windowHelp.getForm(formXie);
		q.each(mesShow.selectObj,function(key,value){
			toolHelp.setXieLine(ggMes.select || 1,ggMes.bg1 || '#000',ggMes.bg2 || '#FFF',value,ggMes.con1 || '内容一',ggMes.con2 || '内二一')();
		})
		newProject(xieButtonCopy);
		windowHelp.openZhe();
	})

	xieButtonCopy.style.display = 'block';
	q.each(xieTestItem,function(k,v){
		toolHelp.setXieLine(k+1,'#000','#E9E8E9',v,'内容一','内容二')();
	})
	xieButtonCopy.style.display = 'none';


	q.on(textButton,'keydown',function(e){
		clearTimeout(timeer);
		timeer = setTimeout(function(){

			q.each(mesShow.selectObj,function(k,v){
				v.innerHTML = textButton.value
			})
			windowHelp.compNowW();
		},10)
	})
	q.on(calcelButton,'click',function(){
		listHelp.notChouse();
	})
	q.on(window,'keydown',function(e){
		if(e.keyCode == '17'){
			ctrl = true;
		}
		if(e.keyCode == '46'){
			textButton.value = "";
			q.each(mesShow.selectObj,function(k,v){
				v.innerHTML = '';
			})
		}
		
	})
	q.on(window,'keyup',function(e){
		ctrl = false;
	})
	q.on(selfButton,'click',function(){
		if(mesShow.selectObj.length < 2){
			alert('合并错误，选择元素数量不足');
		}else{
			var classNameItem = [];
			var classNameItemBeta = [];
			var hhs = [];
			
			q.each(mesShow.selectObj,function(k,v){

				var jArr = v.className.replace(/\sactiver$/,'').split(' ');

				classNameItem.push({
					X : parseInt(jArr[0].split('-')[1]),
					Y : parseInt(jArr[1].split('-')[1]),
					ele : v
				})

			})
			
			classNameItem.sort(function(v1,v2){
				return v1.X-v2.X;
			})
			var nowNumber = classNameItem[0].X;

			var zuLie = classNameItem[classNameItem.length-1].X-classNameItem[0].X+1;

			q.each(classNameItem,function(k,v){

				if(v.X == nowNumber ){
					hhs.push(v);
				}else{
					
				}
			})
			var zuHange = hhs.length;

			alert('列合并的时候去，请选择正确的元素，要不然会合并错误');
			var objs = classNameItem[0].ele;
			if(zuLie == '1'){
				//列合并
				
				objs.setAttribute('colspan',zuHange);
				q.each(zuHange-1,function(){
					objs.parentNode.removeChild(q.next(objs));
				})
			}else if(zuHange == '1'){
				//行合并

				var nowObj = objs.parentNode;
				var index = objs.index;
				console.log(index)
				objs.setAttribute('rowspan',zuLie);
				q.each(zuLie-1,function(){
					nowObj = q.next(nowObj);
					nowObj.removeChild(nowObj.children[index]);
				})
			}else{
				//行列合并
				var index = objs.index;
				var now = objs.parentNode;
				var nowr = objs;
				objs.setAttribute('rowspan',zuLie);
				objs.setAttribute('colspan',zuHange);
				q.each(zuLie,function(k,y){

					q.each(zuHange,function(key,value){
						if(k == 0){
							if(key < zuHange-1){
								now.removeChild(q.next(nowr));
							}
						}else{
							now.removeChild(q.next(nowr));
						}
						
					})
					now = q.next(now);
					nowr = now.children[index];
				})
			}
			console.log(zuHange,zuLie)

		}
	})
	q.on(getButton,'click',function(){


		q.each(tableMessage.tabObj.children,function(k,v){
			q.each(v.children,function(key,value){
				q.removeClass(value,'x-'+k);
			})
		})

		var html = tablebox.innerHTML;
		var style = '<style type="text/css">';
		q.each(toolHelp.styleObject,function(k,v){
			
			style += v.obj.cssText;
		})
		style+='</style>';
		alert('代码已经输出到控制台');
		console.log( style+'\n'+html);

	})
	window.ggg = mesShow;
})
