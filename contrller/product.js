app.controller(
  "productCtrl",
  function ($scope, $http, $rootScope, $routeParams) {
    $scope.sanpham = "";
    // if (
    //   typeof $routeParams.ma_dm !== "undefined" &&
    //   $routeParams.ma_dm !== 0 &&
    //   isDefined($rootScope.keyword)
    // ) {
    //   $http({
    //     method: "GET",
    //     url: "http://localhost:3000/sanpham",
    //     params: {
    //       ma_dm: $routeParams.ma_dm,
    //       keyword: $rootScope.keyword,
    //     },
    //   }).then((res) => {
    //     $scope.sanpham = res.data;
    //     $scope.itemsPerPage = 9; // Số lượng item trên mỗi trang
    //     $scope.currentPage = 1; // Trang hiện tại

    //     $scope.totalItems = $scope.sanpham.length;
    //     $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

    //     $scope.pages = []; // Danh sách các trang
    //     for (var i = 1; i <= $scope.totalPages; i++) {
    //       $scope.pages.push(i);
    //     }

    //     // Hàm để chuyển đến trang cụ thể
    //     $scope.setPage = function (page) {
    //       if (page < 1 || page > $scope.totalPages) {
    //         return;
    //       }
    //       $scope.currentPage = page;
    //       $scope.updateDisplayedItems();
    //     };

    //     // Hàm để chuyển đến trang trước
    //     $scope.prevPage = function () {
    //       $scope.setPage($scope.currentPage - 1);
    //     };

    //     // Hàm để chuyển đến trang tiếp theo
    //     $scope.nextPage = function () {
    //       $scope.setPage($scope.currentPage + 1);
    //     };

    //     // Hàm để cập nhật danh sách các item hiển thị trên trang
    //     $scope.updateDisplayedItems = function () {
    //       var startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
    //       var endIndex = startIndex + $scope.itemsPerPage;
    //       $scope.displayedItems = $scope.sanpham.slice(startIndex, endIndex);
    //     };

    //     // Khởi tạo danh sách các item hiển thị trên trang đầu tiên
    //     $scope.updateDisplayedItems();
    //   });
    // } else {
    if (typeof $routeParams.ma_dm !== "undefined") {
      $http({
        method: "GET",
        url: "http://localhost:3000/sanpham",
        params: {
          ma_dm: $routeParams.ma_dm,
        },
      }).then((res) => {
        $scope.pagi(res.data);
      });
    } else {
      $http({
        method: "GET",
        url: "http://localhost:3000/sanpham",
      }).then((res) => {
        $scope.pagi(res.data);
      });
    }
    // }

    $scope.pagi = function (data) {
      $scope.sanpham = data;
      $scope.itemsPerPage = 9; // Số lượng item trên mỗi trang
      $scope.currentPage = 1; // Trang hiện tại

      $scope.totalItems = $scope.sanpham.length;
      $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

      $scope.pages = []; // Danh sách các trang
      for (var i = 1; i <= $scope.totalPages; i++) {
        $scope.pages.push(i);
      }

      // Hàm để chuyển đến trang cụ thể
      $scope.setPage = function (page) {
        if (page < 1 || page > $scope.totalPages) {
          return;
        }
        $scope.currentPage = page;
        $scope.updateDisplayedItems();
      };

      // Hàm để chuyển đến trang trước
      $scope.prevPage = function () {
        $scope.setPage($scope.currentPage - 1);
      };

      // Hàm để chuyển đến trang tiếp theo
      $scope.nextPage = function () {
        $scope.setPage($scope.currentPage + 1);
      };

      // Hàm để cập nhật danh sách các item hiển thị trên trang
      $scope.updateDisplayedItems = function () {
        var startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endIndex = startIndex + $scope.itemsPerPage;
        $scope.displayedItems = $scope.sanpham.slice(startIndex, endIndex);
      };

      // Khởi tạo danh sách các item hiển thị trên trang đầu tiên
      $scope.updateDisplayedItems();
    };

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
  }
);
