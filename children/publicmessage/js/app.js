angular.module('publicMessage',['ui.router','load','message'])
	   .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('getname',{
				url:'/getname',
				templateUrl:'temp/getname.html',
				controller:'loadname'
			}).state('showname',{
	      	url:'/showname',
	      	templateUrl:'temp/showname.html',
	      	controller:'messagename'

        })
  		$urlRouterProvider.otherwise('/getname');
  		Date.prototype.Format = function(formatStr) {   
            var str = formatStr;   
            var Week = ['日','一','二','三','四','五','六'];  
          
            str=str.replace(/yyyy|YYYY/,this.getFullYear());   
            str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
          
            str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());   
            str=str.replace(/M/g,this.getMonth());   
          
            str=str.replace(/w|W/g,Week[this.getDay()]);   
          
            str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
            str=str.replace(/d|D/g,this.getDate());   
          
            str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
            str=str.replace(/h|H/g,this.getHours());   
            str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
            str=str.replace(/m/g,this.getMinutes());   
          
            str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
            str=str.replace(/s|S/g,this.getSeconds());   
          
            return str;   
        };
	    }])
	   .factory('getData',function(){
	   		var ref = new Wilddog("https://millent.wilddogio.com");
		   	return ref;
	   })
	   .factory('getuser',function(){
	   		var name='';
		   	return{	
		   		setname:function(cname){
		   			name=cname;
		   		},
		   		getname:function(){
		   			return name;
		   		}
		   	}
	   })
	   .controller('ngng', ['$scope', function($scope){
	   	
	   }])
	   /*
		//连接数据
	//var ref = new Wilddog("https://millent.wilddogio.com");
  	//新增数据
 //  	ref.child("location").push({
	//     author: "gracehop",
	//     title: "Announcing COBOL, a New Programming Languagessssssss"
	// });
  	//读取数据
	// ref.child("location").on("value", function(datasnapshot) {
	//   console.log(datasnapshot.val());   // 结果会在 console 中打印出 "beijing"
	// });
	   */
	   /*

	   		getData.set({
			    "location" : {
			        "first" : {
			        	"name":"admin",
			        	"message":"hello word!",
			        	"time":"2016年4月18日 13:47:58"
			        },
			    },
			    "username":{
			    	"xxaadd":"first"
			    }
			});
	   */