var app = angular.module("myApp",[]);
app.controller('MainController',['$scope','$http','$window',function($scope,$http,$window){

$scope.title = 'Shopping Cart';
$scope.ppbutton=true;
$scope.last=true;
$scope.stocks=[];
$scope.i=0;
$scope.symbol=false;
$scope.ind=0;
$scope.extra=false;
	$scope.temp=[];

	$scope.val=0;
	$scope.pinResult='';
	$scope.products=[];
	$scope.quant=["1","2","3","4"];
	$scope.sum=0;
	$scope.stock=[];
	var refresh = function()
	{
	$http.get('/products').success(function(response){
		console.log("I got the data I requested");
		//console.log($scope.products);
		$scope.products=response;
		//console.log($scope.products);
	});
	/*$http.get('/stocks').success(function(response){
		console.log("I got the data I requested");
		//console.log($scope.stocks);
		$scope.stocks=response;
	console.log($scope.stocks);
});*/

};

refresh();
/*for(i=0;i<$scope.products.length;i++)
{
	//console.log("fdljgkfd");
	$scope.temp[i]=1;
}*/
$scope.addingToCart = function(n,p,q,i)
{

	if($scope.val>=0){
		$scope.symbol=true;
	$scope.val=parseInt($scope.val) + 1;
}
var stock={
	name:n,
	price:p,
	total:p,
	qty:q,
	id:i
}
$scope.stocks.push(stock);
$scope.temp[$scope.i]=1;
$scope.i+=1;
//console.log($scope.stock);
/*$http.post('/stocks',$scope.stock).success(function(response){
	console.log(response);
	refresh();
});*/
};
$scope.myCart=function(){
	$scope.extra=true;
}
$scope.extraOne=function(){
	$scope.extra=false;
}
	$scope.pincodes=[637211,637209,637210];
	$scope.buttonEnabling=function(){
			$scope.ppbutton=false;
		console.log($scope.stocks[0].name);
	};
	/*$scope.empty=function(){

	};*/


$scope.mt=function()
{
	$scope.stocks.splice(0, $scope.stocks.length);
	 $scope.val=0;
	 $scope.symbol=false;
}
	$scope.removeStock=function(id){
		//console.log($scope.products.name);
		 $scope.stocks.splice(id,1);
		  $scope.val=parseInt($scope.val) - 1;
		 if($scope.val==0)

		  $scope.symbol=false;



};

	$scope.addOne=function(i){
		//console.log($scope.products[i].qty);
		//console.log($scope.products.length);
	//	console.log($scope.temp[0]);


			$scope.temp[i]=parseInt($scope.temp[i]) + 1;
			$scope.stocks[i].total=$scope.stocks[i].price * $scope.temp[i];


	//	$scope.sum=$scope.sum+parseInt($scope.products[i].total);
	};
	$scope.minusOne=function(i){
		if($scope.temp[i]>1)
		{
			$scope.temp[i]=parseInt($scope.temp[i]) - 1;
			$scope.stocks[i].total=$scope.stocks[i].price * $scope.temp[i];
		}
		//$scope.sum=$scope.sum+parseInt($scope.products[i].total);

		//console.log($scope.sum);
	};
	$scope.pinCheck=function()
	{
		$scope.temp=0;
		for(i=0;i<$scope.pincodes.length;i++)
		{
			if($scope.pin==$scope.pincodes[i])
			{
				$scope.temp+=1;
			}
		}
		if($scope.temp>=1){
			$scope.date = new Date();
  			$scope.newdate = $scope.date.setDate($scope.date.getDate() + 7);
			$scope.pinResult='Estimated Delivery By';
			$scope.valid=false;
			$scope.invalid=true;
		}
		else
		{
			$scope.pinResult='!Product Not Available in this pincode';
			$scope.valid=true;
			$scope.invalid=false;
		}
	};
	$scope.creating=function(){
		$scope.switch=true;
	}
	$scope.addingToDb=function(){
		$http.post('/products',$scope.item).success(function(response){
			console.log(response);
				});
	}
	$scope.del=function(id){
		$http.delete('/products/' +id ).success(function(response){
		 refresh();
	});
	}

	$scope.edit=function(id){
		console.log(id);
		$scope.switch=true;
		$scope.last=false;
	$http.get('/products/' + id ).success(function(response){
			console.log(response);
		 $scope.item=response;
		 refresh();
		//console.log( $scope.item);
		 });
	}
	$scope.update=function(){

		$http.put('/products/' + $scope.item._id, $scope.item).success(function(response){
				 refresh();
			 });
	}
	$scope.qtyChange=function()
	{
		for(i=0;i<$scope.temp.length;i++)
		{
$scope.stocks[i].qty-=$scope.temp[i];
$http.put('/products/' + $scope.stocks[i].id, $scope.stocks[i]).success(function(response){
		 refresh();
	 });
		}

//$scope.extra=false;
	}
}]);
