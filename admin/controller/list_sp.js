admin.controller("spCtrl", function ($scope, $http) {
  $scope.products = [];
  // Lấy danh sách sản phẩm từ api
  $http({
    method: "GET",
    url: "http://localhost:3000/sanpham",
  }).then((res) => {
    $scope.products = res.data;
  });

  // Xóa sản phẩm
  $scope.deleteSP = function (_id) {
    if (confirm("Bạn có muốn xóa không")) {
      $http({
        method: "DELETE",
        url: "http://localhost:3000/sanpham/" + _id,
      }).then(() => {
        alert("Xóa sản phẩm thành công");
      });
    }
  };
});
