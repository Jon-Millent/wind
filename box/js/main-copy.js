
window.onload=function(){

    (function(){
      var SCREENTYPE = 'orientationchange' in window ? 'orientationchange' : 'resize';
      var DEFINENUMBER = 10;
      function setView(){
        var gg = document.documentElement;
        var width = gg.clientWidth;
        if(gg.clientWidth > 460){
          width = 460;
        }else if(gg.clientWidth < 320){
          width = 320;
        }

        gg.style.fontSize = width / DEFINENUMBER + 'px';
        return arguments.callee;
      }
      window.addEventListener(SCREENTYPE,setView());

      document.addEventListener('touchstart',function (event) {  
        if(event.touches.length>1){  
          event.preventDefault();  
        }  
      })  
      var lastTouchEnd=0;  
      document.addEventListener('touchend',function (event) {  
        var now=(new Date()).getTime();  
        if(now-lastTouchEnd<=300){  
          event.preventDefault();  
        }  
        lastTouchEnd=now;  
      },false)  
    })()


    var dataLoop = {
      index :0,
      len :4,
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
      getClass : function(name,node){
        var obj = node || document;
        if(obj.getElementsByClassName){
          return obj.getElementsByClassName(name);
        }else{
          var allGh = obj.getElementsByTagName('*');
          var fG = [];
          for(var i=0; i<allGh.length; i++){
            if(dataLoop.hasClass(allGh[i],name)){
              fG.push(allGh[i])
            }
          }
        }
      }
    }
    function clearAllTime(obj){
      for(var i=0; i<obj.length; i++){
        clearTimeout(obj[i]);
      }
    }
    function forEachs(obj,fn){
      for(var i=0; i<obj.length; i++){
        fn(i,obj[i]);
      }
    }
    var nodeFactory = {
      slide1 : {
        node1 : dataLoop.getClass('item-01'),
        time : []
      },
      slide2 : {
        node1 : dataLoop.getClass('item-02'),
        time : []
      },
      slide3 : {
        node1 : dataLoop.getClass('item-03'),
        time : []
      },
      slide4 : {
        node1 : dataLoop.getClass('item-04'),
        time : []
      }

    }

    var animationTion = {
      slide1 : {
        enter : function(){
          var node1 = nodeFactory.slide1.node1;
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('a1',v),function(key,value){
              dataLoop.addClass(value,'ani1s');
            })
          })
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('a2',v),function(key,value){
              dataLoop.addClass(value,'ani1s');
            })
          })
          nodeFactory.slide1.time[0] = setTimeout(function(){
            forEachs(node1,function(k,v){
              forEachs(dataLoop.getClass('a1',v),function(key,value){
                dataLoop.addClass(value,'enter');
              })
            })
            nodeFactory.slide1.time[1] = setTimeout(function(){
              forEachs(node1,function(k,v){
                forEachs(dataLoop.getClass('a2',v),function(key,value){
                  dataLoop.addClass(value,'enter');
                })
              })
            },400)  
          },10)
          
          
        },
        leave : function(){
          var node1 = nodeFactory.slide1.node1;
          clearAllTime(nodeFactory.slide1.time);
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('a1',v),function(key,value){
              dataLoop.removeClass(value,'enter');
            })
            forEachs(dataLoop.getClass('a2',v),function(key,value){
              dataLoop.removeClass(value,'enter');
            })
          })

        }
      },
      slide2 : {
        enter : function(){
          var node1 = nodeFactory.slide2.node1;

          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('tit',v),function(key,value){
              dataLoop.addClass(value,'enter');
            })
          })

          
          nodeFactory.slide1.time[0] = setTimeout(function(){
            forEachs(node1,function(k,v){
              dataLoop.addClass(dataLoop.getClass('select-group',v)[0],'enter');
            })

          },0)
          nodeFactory.slide1.time[1] = setTimeout(function(){
            forEachs(node1,function(k,v){
              dataLoop.addClass(dataLoop.getClass('select-group',v)[1],'enter');
            })
          },100)
          nodeFactory.slide1.time[2] = setTimeout(function(){
            forEachs(node1,function(k,v){
              dataLoop.addClass(dataLoop.getClass('select-group',v)[2],'enter');
            })
          },200)
        },
        leave : function(){
          var node1 = nodeFactory.slide2.node1;
          clearAllTime(nodeFactory.slide2.time);
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('tit',v),function(key,value){
              dataLoop.removeClass(value,'enter');
            })
          })
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('select-group',v),function(key,value){
              dataLoop.removeClass(value,'enter');
            })
          })

        }
      },
      slide3 : {
        enter : function(){
          var node1 = nodeFactory.slide3.node1;
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('dian',v),function(key,value){
              dataLoop.addClass(value,'enter');
            })
          })

        },
        leave : function(){
          var node1 = nodeFactory.slide3.node1;
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('dian',v),function(key,value){
              dataLoop.removeClass(value,'enter');
            })
          })

        }
      },
      slide4 : {
        enter : function(){
          var node1 = nodeFactory.slide4.node1;
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('our-group',v),function(key,value){
              dataLoop.addClass(value,'enter');
            })
          })
        },
        leave : function(){
          var node1 = nodeFactory.slide4.node1;
          forEachs(node1,function(k,v){
            forEachs(dataLoop.getClass('our-group',v),function(key,value){
              dataLoop.removeClass(value,'enter');
            })
          })
        }
      }
    }

  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,
    mousewheelControl : true,
    onSlideNextEnd: function(){
      
           dataLoop.index++;
           if(dataLoop.index > dataLoop.len){
            dataLoop.index = 1;
           }
            
            switch(dataLoop.index){
              case 1:
                animationTion.slide4.leave();
                animationTion.slide1.enter();
                break;
              case 2:
                animationTion.slide1.leave();
                animationTion.slide2.enter();
                break;
              case 3:
                animationTion.slide2.leave();
                animationTion.slide3.enter();
                break;
              case 4:
                animationTion.slide3.leave();
                animationTion.slide4.enter();
                break;

            }

    },
    onSlidePrevEnd : function(){
      
      dataLoop.index--;
         if(dataLoop.index < 1){
          dataLoop.index = dataLoop.len;
         }
          

          switch(dataLoop.index){
            case 1:
              animationTion.slide2.leave();
              animationTion.slide1.enter();
              break;
            case 2:
              animationTion.slide3.leave();
              animationTion.slide2.enter();
              break;
            case 3:
              animationTion.slide4.leave();
              animationTion.slide3.enter();
              break;
            case 4:
              animationTion.slide1.leave();
              animationTion.slide4.enter();
              break;

          }
    }
  }) 

}










