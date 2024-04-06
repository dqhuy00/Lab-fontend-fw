admin.controller("dhDetailCtrl", function ($scope, $http, $routeParams) {
  $scope.products = [];
  $http({
    method: "GET",
    url: "http://localhost:3000/chitietdonhang",
    params: {
      ma_dh: $routeParams.id,
    },
  }).then((res) => {
    $scope.products = res.data;
    console.log($scope.products);
  });
});
