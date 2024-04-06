app.controller("checkoutCtrl", function ($scope, $http, $rootScope) {
  var currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, "0");
  var month = String(currentDate.getMonth() + 1).padStart(2, "0");
  var year = currentDate.getFullYear();

  $scope.total = 0;
  for (let index = 0; index < $rootScope.orders.length; index++) {
    $scope.total =
      $scope.total + $rootScope.orders[index].sl * $rootScope.orders[index].gia;
  }

  $scope.donhang = {
    ma_user: $rootScope.login.user.id,
    phone: "",
    dia_tri: "",
    ngay_dat_hang: month + "/" + day + "/" + year,
    ma_tt: "1",
    tong: $scope.total,
    hovaten: "",
    ma_ttdh: "1",
  };

  $scope.creatDH = function () {
    $scope.formValid = false;
    $scope.formValidMessage = false;

    if ($scope.donhang.hovaten === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập họ và tên";
      return;
    }
    if ($scope.donhang.phone === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập số điện thoại";
      return;
    }
    if ($scope.donhang.dia_tri === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập địa chỉ";
      return;
    }
    var regex = /^\d{10}$/;
    if (!regex.test($scope.donhang.phone)) {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng nhập đúng số điện thoại";
      return;
    }
    $http({
      method: "POST",
      url: "http://localhost:3000/donhang",
      data: $scope.donhang,
    }).then((res) => {
      $scope.chitietdh = {
        ma_sp: "",
        ma_dh: res.data.id,
        gia: "",
        so_luong: "",
        anh: "",
        ten: "",
      };
      for (let index = 0; index < $rootScope.orders.length; index++) {
        $scope.chitietdh = {
          ma_sp: $rootScope.orders[index].ma_sp,
          ma_dh: res.data.id,
          gia: $rootScope.orders[index].gia,
          so_luong: $rootScope.orders[index].sl,
          anh: $rootScope.orders[index].anh,
          ten: $rootScope.orders[index].tensp,
        };
        $http({
          method: "POST",
          url: "http://localhost:3000/chitietdonhang",
          data: $scope.chitietdh,
        });
        // Xóa sản phẩm
        $http({
          method: "DELETE",
          url: "http://localhost:3000/giohang/" + $rootScope.orders[index].id,
        });
      }

      alert("Mua hàng thành công");

      window.location.href = "http://127.0.0.1:5501/index.html#!/home";
    });
  };
});
