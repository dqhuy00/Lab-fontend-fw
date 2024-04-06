app.controller(
  "chitietspCtrl",
  function ($scope, $http, $rootScope, $routeParams) {
    var currentDate = new Date();
    var day = String(currentDate.getDate()).padStart(2, "0");
    var month = String(currentDate.getMonth() + 1).padStart(2, "0");
    var year = currentDate.getFullYear();
    $scope.product = [];
    $scope.binhluans = [];
    $scope.myBL = {
      noi_dung: "",
      username: $rootScope.login.user.username,
      ma_sp: "",
      ngay_bl: month + "/" + day + "/" + year,
      rate: 4,
    };
    $http({
      method: "GET",
      url: "http://localhost:3000/sanpham/" + $routeParams.id,
    }).then((res) => {
      $scope.product = res.data;
      $scope.addCart = function (_id, _gia, _anh, _tensp) {
        const slSP = document.getElementById("slSP").value ?? 1;
        $scope.issetCart = [];
        if ($rootScope.login.isLoggedIn) {
          $http({
            method: "GET",
            url: "http://localhost:3000/giohang",
            params: {
              ma_sp: $scope.product.id,
              ma_user: $rootScope.login.user.id,
            },
          }).then((res) => {
            $scope.issetCart = res.data;
            if ($scope.issetCart.length) {
              $scope.issetCart[0].sl =
                parseInt($scope.issetCart[0].sl) + parseInt(slSP);
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
                sl: slSP,
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
      $scope.muaNgay = function (_id, _gia, _anh, _tensp) {
        const slSP = document.getElementById("slSP").value ?? 1;
        $rootScope.orders = [
          {
            gia: _gia,
            sl: slSP,
            anh: _anh,
            ma_sp: _id,
            ma_user: $rootScope.login.user.id,
            tensp: _tensp,
          },
        ];
        window.location.href = "http://127.0.0.1:5501/index.html#!/checkout";
      };
      $scope.sendBL = function () {
        $scope.formValid = false;
        $scope.formValidMessage = false;
        $scope.myBL.ma_sp = $scope.product.id;
        $scope.myBL.rate = parseInt(ratingInput.value);
        // return;

        if ($scope.myBL.noi_dung === "") {
          $scope.formValid = true;
          $scope.formValidMessage = "Vui lòng nhập nội dung";
          return;
        }
        if (!$scope.formValid) {
          $http({
            method: "POST",
            url: "http://localhost:3000/binhluan",
            data: $scope.myBL,
          }).then(() => {
            alert("Gửi bình luận thành công");
          });
        }
      };
    });

    $scope.cungloai = "";
    $http({
      method: "GET",
      url: "http://localhost:3000/sanpham",
      params: {
        ma_dm: $scope.product.ma_dm,
      },
    }).then((res) => {
      $scope.cungloai = res.data;
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

    const ratingStars =
      [...document.getElementsByClassName("rating__star")] ?? [];
    const ratingInput = document.getElementById("rating-input") ?? 0;
    function executeRating(stars) {
      const starClassActive = "rating__star fa fa-star";
      const starClassInactive = "rating__star fa fa-star star_gray";
      const starsLength = stars.length;
      let i;
      stars.map((star) => {
        star.onclick = () => {
          i = stars.indexOf(star);

          if (star.className === starClassInactive) {
            ratingInput.value = i + 1;
            for (i; i >= 0; --i) stars[i].className = starClassActive;
          } else {
            ratingInput.value = i;
            for (i; i < starsLength; ++i)
              stars[i].className = starClassInactive;
          }
        };
      });
    }
    executeRating(ratingStars);

    $http({
      method: "GET",
      url: "http://localhost:3000/binhluan",
      params: {
        ma_sp: $routeParams.id,
      },
    }).then((res) => {
      $scope.binhluans = res.data;
    });
  }
);
