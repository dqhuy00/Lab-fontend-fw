admin.controller("dmEditCtrl", function ($scope, $http, $routeParams) {
  $scope.catagory = "";

  $http({
    method: "GET",
    url: "http://localhost:3000/danhmuc/" + $routeParams.id,
  }).then((res) => {
    $scope.catagory = res.data;
  });

  $scope.editDM = function () {
    $scope.formValid = false;
    $scope.formValidMessage = false;

    if ($scope.catagory.ten_dm === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập tên sản phẩm";
      return;
    }
    if (!$scope.formValid) {
      $http({
        method: "PUT",
        url: "http://localhost:3000/danhmuc/" + $routeParams.id,
        data: $scope.catagory,
      }).then(() => {
        alert("Chỉnh sửa danh mục thành công");
      });
    }
  };
});
