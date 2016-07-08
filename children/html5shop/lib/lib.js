$(function(){
	// lib1
	$('#file').change(function(){
		$('#file').next().html(this.files[0].name)
	})
	$('#sure').click(function(){
		var lmain = $('#file')[0].files;
		if(lmain.length==1){
			if(/image/.test(lmain[0].type)){
				var read = new FileReader();
			
				console.log(lmain[0])
				read.readAsDataURL(lmain[0]);
				
				read.onload=function(){
				
						$('#caves')[0].setAttribute('src',this.result);
						
				}
				
				$('#getimg').css('display','none')
			}else{
				alert('只能使用图片哦')
			}
		}else{
			alert('选择一张和图片哦')
		}
	})
	//lib 2
	var leavebar = $('#leavebar');
	var lamupa = leavebar.children().first();
	var laspan = lamupa.find('span');
	var widths = lamupa.width()-laspan.width();
	var brightness = $('.brightness');
	var deg = 0;
	laspan.mousedown(function(e){
		var y= e.pageX - $(this).position().left;
		$(document).mousemove(function(e){
			var ty = e.pageX - y;
			if(ty<0){
				ty=0;
			}else if(ty>widths){
				ty= widths;
			}
			
			laspan.css('left',ty)
			brightness.css('opacity',Math.floor(ty/widths*100)/100)
		})
		$(document).mouseup(function(){
			$(document).off();
		})
		e.preventDefault()
	})
	//lib 3
	var list = $('.oos').children();
	var inter = $('.inner');
	var outer = $('.outer')
	list.eq(0).find('ul').delegate("li","click",function(){
		inter.css('boxShadow','inset 0 0 200px #'+this.title)
	})
	list.eq(1).click(function(){
		inter.css('boxShadow','')
	})
	list.eq(2).find('ul').delegate("li","click",function(){
		outer.css('backgroundColor','#'+this.title)
	})
	list.eq(3).click(function(){
		outer.css('backgroundColor','')
	})
	list.eq(4).click(function(){
		deg-=90;

		$('.mainimg').css('webkitTransform','rotate('+deg+'deg)')
		$('.mainimg').css('mozTransform','rotate('+deg+'deg)')
		$('.mainimg').css('transform','rotate('+deg+'deg)')
	})
	list.eq(5).click(function(){
		deg+=90;
		$('.mainimg').css('webkitTransform','rotate('+deg+'deg)')
		$('.mainimg').css('mozTransform','rotate('+deg+'deg)')
		$('.mainimg').css('transform','rotate('+deg+'deg)')
	})
	list.eq(6).click(function(){
			event.preventDefault();  
	        html2canvas($('.mainimg').get(0), {  
	        allowTaint: true,  
	        taintTest: false,  
	        onrendered: function(canvas) {  
	            canvas.id = "mycanvas";  
	            //document.body.appendChild(canvas);  
	            //生成base64图片数据  
	            var dataUrl = canvas.toDataURL();  

	            document.location.href =   dataUrl;  

	        }  
	    }); 
	})
})
