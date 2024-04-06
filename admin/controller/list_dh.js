admin.controller("dhCtrl", function ($scope, $http) {
  $scope.orders = [];
  $http({
    method: "GET",
    url: "http://localhost:3000/donhang",
  }).then((res) => {
    $scope.orders = res.data;
  });

  $scope.pttt = [];
  $http({
    method: "GET",
    url: "http://localhost:3000/thanhtoan",
  }).then((res) => {
    $scope.pttt = res.data;
  });
});
