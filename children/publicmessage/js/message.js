angular.module('message',['publicMessage'])
	   .directive('showname',['$timeout','getData',function($timeout,getData){
			return {
				restrict: 'A', 
				templateUrl: 'temp/main.html',
				replace: true,
				link: function($scope, iElm, iAttrs, controller) {
					var buttons = angular.element(iElm).find('div')[0];
					console.log(buttons)
					angular.element(iElm).find('button').on('mousedown',function(){
						$timeout(function () {
						      getData.child("location").push({
				   				"name":$scope.username,
				   				"message":$scope.showmessage,
				   				"time":new Date().Format("yyyy-MM-dd HH:mm:ss")
				   			 });
						     $scope.$apply(function(){
						     	$scope.showmessage='';
						     })
					    }, 0, false);
					    buttons.scrollTop=buttons.scrollHeight;
					})
				}
			};
	   }])
	   .controller('messagename',['$scope','$state','getData','getuser',function($scope,$state,getData,getuser){
	   		if(!getuser.getname()){
	   			alert('您尚未输入用户名，请返回输入用户名');
	   			$state.go('getname')
	   			return ;
	   		}
	   		$scope.username=getuser.getname();
	   		$scope.message=[];
	   		getData.child("location").on("value", function(datasnapshot) {
			  $scope.$apply(function(){
			  	var subarr=[];
			  	 angular.forEach(datasnapshot.val(),function(item,value){
			  	 	subarr.push(item);
			  	 })
			  	 if(subarr.length<=10){
			  	 	$scope.message=subarr;
			  	 }else{
			  	 	$scope.message=subarr.slice(subarr.length-10);
			  	 }
			     subarr='';
			  })
			});
	   }])