admin.controller("spEditCtrl", function ($scope, $http, $routeParams) {
  $scope.product = "";

  $http({
    method: "GET",
    url: "http://localhost:3000/sanpham/" + $routeParams.id,
  }).then((res) => {
    $scope.product = res.data;
    console.log($scope.product);
  });

  document.getElementById("image").addEventListener("change", function (event) {
    $scope.$apply(function () {
      $scope.product.anhsp = event.target.files[0].name;
    });
  });

  $scope.editSP = function () {
    $scope.formValid = false;
    $scope.formValidMessage = false;

    if ($scope.product.ten_sp === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập tên sản phẩm";
      return;
    }
    if ($scope.product.gia === 0) {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập giá";
      return;
    }
    if ($scope.product.mota === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập mô tả";
      return;
    }
    if ($scope.product.ma_dm === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng chọn danh mục";
      return;
    }
    if ($scope.product.anhsp === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng chọn ảnh";
      return;
    }
    if (!$scope.formValid) {
      $http({
        method: "PUT",
        url: "http://localhost:3000/sanpham/" + $routeParams.id,
        data: $scope.product,
      }).then(() => {
        alert("Chỉnh sửa sản phẩm thành công");
      });
    }
  };
});
