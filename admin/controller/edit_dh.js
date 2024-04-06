admin.controller("dhEditCtrl", function ($scope, $http, $routeParams) {
  $scope.donhang = "";
  $scope.ttCurrent = "";

  $http({
    method: "GET",
    url: "http://localhost:3000/donhang/" + $routeParams.id,
  }).then((res) => {
    $scope.donhang = res.data;
    $scope.ttCurrent = $scope.donhang.ma_ttdh;
  });

  $scope.editDH = function () {
    $scope.formValid = false;
    $scope.formValidMessage = false;
    console.log($scope.donhang.ma_ttdh > $scope.ttCurrent);
    console.log($scope.ttCurrent);
    // return;
    if ($scope.donhang.ma_ttdh < $scope.ttCurrent) {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng chọn đúng trạng thái";
      return;
    }
    if ($scope.donhang.ma_ttdh == 5 && $scope.ttCurrent == 4) {
      $scope.formValid = true;
      $scope.formValidMessage = "Đơn hàng đã bị hủy";
      return;
    }
    if (!$scope.formValid) {
      $http({
        method: "PUT",
        url: "http://localhost:3000/donhang/" + $routeParams.id,
        data: $scope.donhang,
      }).then(() => {
        alert("Chỉnh sửa trang thái đơn hàng thành công");
      });
    }
  };
});
