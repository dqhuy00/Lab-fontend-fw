app.controller("cartCtrl", function ($scope, $http, $rootScope) {
  $scope.carts = [];
  $scope.total = 0;
  $http({
    method: "GET",
    url: "http://localhost:3000/giohang",
    params: {
      ma_user: $rootScope.login.user.id,
    },
  }).then((res) => {
    $scope.carts = res.data;
    $rootScope.orders = res.data;
    for (let index = 0; index < $scope.carts.length; index++) {
      $scope.total =
        $scope.total + $scope.carts[index].sl * $scope.carts[index].gia;
    }
  });

  $scope.deleteSP = function (_id) {
    $http({
      method: "DELETE",
      url: "http://localhost:3000/giohang/" + _id,
    });
  };
  $scope.changeQuantity = function (productId, quantity) {
    let product = $scope.carts.find((p) => p.id === productId);
    if (product) {
      product.sl = quantity;
      $http({
        method: "PUT",
        url: "http://localhost:3000/giohang/" + productId,
        data: product,
      });
    }
  };
});
