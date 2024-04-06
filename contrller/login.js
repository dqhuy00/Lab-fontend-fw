app.controller("loginCtrl", function ($scope, $http, $rootScope) {
  $scope.username = "";
  $scope.password = "";
  $scope.dangNhap = function () {
    $scope.formValid = false;
    $scope.formValidMessage = false;

    if ($scope.username === "" || $scope.password === "") {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng điền tất cả các trường";
      return;
    }
    if (!$scope.formValid) {
      $http({
        method: "GET",
        url: "http://localhost:3000/users",
        params: {
          username: $scope.username,
          password: $scope.password,
        },
      }).then((res) => {
        // console.log(res.data[0]);
        if (res.data.length !== 0) {
          console.log(res.data.length);
          $http({
            method: "PUT",
            url: "http://localhost:3000/login",
            data: {
              isLoggedIn: true,
              user: res.data[0],
            },
          });
          window.location.href = "http://127.0.0.1:5501/index.html#!/home";
        } else {
          $scope.formValid = true;
          $scope.formValidMessage = "Tài khoản đang nhập sai";
          return;
        }
      });
    }
  };
});
