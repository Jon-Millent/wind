angular.module('load',['publicMessage'])

	   .controller('loadname',['$scope','$state','getData','getuser',function($scope,$state,getData,getuser){
	   		$scope.once=true;
	   		$scope.gogo=function(){
	   			if($scope.formName.inputFieldName.$valid){
	   				if($scope.once){
	   					var postsRef = getData.child("username")
	   					postsRef.push($scope.username);
	   					getuser.setname($scope.username);
	   					$state.go('showname')
	   					$scope.once=false;
	   				}
	   				
	   			}
	   		}
	   }])