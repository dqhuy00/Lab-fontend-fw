admin.controller("spCreateCtrl", function ($scope, $http) {
  var currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, "0");
  var month = String(currentDate.getMonth() + 1).padStart(2, "0");
  var year = currentDate.getFullYear();

  $scope.product = {
    ten_sp: "",
    ngay_nhap: month + "/" + day + "/" + year,
    ma_dm: "",
    sl: 1,
    mota: "",
    gia: 0,
    anhsp: "",
  };

  document.getElementById("image").addEventListener("change", function (event) {
    $scope.$apply(function () {
      $scope.product.anhsp = event.target.files[0].name;
    });
  });

  $scope.createSP = function () {
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
        method: "POST",
        url: "http://localhost:3000/sanpham",
        data: $scope.product,
      }).then(() => {
        alert("Thêm mới sản phẩm thành công");
      });
    }
  };
});
