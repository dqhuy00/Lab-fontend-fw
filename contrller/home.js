app.controller("homeCtrl", function ($scope, $http, $rootScope, $routeParams) {
  $scope.sanphamnew = "";
  $http({
    method: "GET",
    url: "http://localhost:3000/sanpham",
    params: {
      _sort: "-id",
    },
  }).then((res) => {
    $scope.sanphamnew = res.data;
  });
  $scope.sanpham = "";
  $http({
    method: "GET",
    url: "http://localhost:3000/sanpham",
  }).then((res) => {
    $scope.sanpham = res.data;
  });

  $scope.addCart = function (_id, _gia, _anh, _tensp) {
    $scope.issetCart = [];
    if ($rootScope.login.isLoggedIn) {
      $http({
        method: "GET",
        url: "http://localhost:3000/giohang",
        params: {
          ma_sp: _id,
          ma_user: $rootScope.login.user.id,
        },
      }).then((res) => {
        $scope.issetCart = res.data;
        if ($scope.issetCart.length) {
          $scope.issetCart[0].sl = parseInt($scope.issetCart[0].sl) + 1;
          $http({
            method: "PUT",
            url: "http://localhost:3000/giohang/" + $scope.issetCart[0].id,
            data: $scope.issetCart[0],
          }).then(() => {
            alert("Thêm vào giỏ hàng thành công");
          });
        } else {
          $scope.product = {
            gia: _gia,
            sl: 1,
            anh: _anh,
            ma_sp: _id,
            ma_user: $rootScope.login.user.id,
            tensp: _tensp,
          };
          $http({
            method: "POST",
            url: "http://localhost:3000/giohang",
            data: $scope.product,
          }).then(() => {
            alert("Thêm vào giỏ hàng thành công");
          });
        }
      });
    } else {
      alert("Bạn phải đăng nhập để mua hàng");
    }
  };
});
