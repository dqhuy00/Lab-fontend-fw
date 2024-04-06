admin.controller("spDetailCtrl", function ($scope, $http, $routeParams) {
  $scope.product = [];
  console.log($routeParams);
  // Lấy danh sách sản phẩm từ api
  $http({
    method: "GET",
    url: "http://localhost:3000/sanpham/" + $routeParams.id,
  }).then((res) => {
    $scope.product = res.data;
    console.log($scope.product);
  });
});
