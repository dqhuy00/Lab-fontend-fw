admin.controller("dmCreateCtrl", function ($scope, $http) {
  $scope.catagory = {
    ten_dm: "",
  };
  $scope.createDM = function () {
    $scope.formValid = false;
    $scope.formValidMessage = false;

    if ($scope.catagory.ten_dm === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập tên danh mục";
      return;
    }
    if (!$scope.formValid) {
      $http({
        method: "POST",
        url: "http://localhost:3000/danhmuc",
        data: $scope.catagory,
      }).then(() => {
        alert("Thêm mới danh mục thành công");
      });
    }
  };
});
