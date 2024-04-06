admin.controller("dmCtrl", function ($scope, $http, $rootScope) {
  // Xóa danh mục
  $scope.deleteDM = function (_id) {
    if (confirm("Bạn có muốn xóa không")) {
      $http({
        method: "DELETE",
        url: "http://localhost:3000/danhmuc/" + _id,
      }).then(() => {
        alert("Xóa danh mục thành công");

        window.location.href =
          "http://127.0.0.1:5501/admin/layout.html#!/list-dm";
      });
    }
  };
});
