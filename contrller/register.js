app.controller("regCtrl", function ($scope, $http, $rootScope, $routeParams) {
  $scope.user = {
    username: "",
    password: "",
    email: "",
    sdt: "",
    dia_tri: "",
    vai_tro: 0,
  };
  $scope.repassword = "";
  $scope.dangKy = function () {
    $scope.formValid = false;
    $scope.formValidMessage = false;

    if (
      $scope.user.username === "" ||
      $scope.user.password === "" ||
      $scope.repassword === ""
    ) {
      $scope.formValid = true;
      $scope.formValidMessage = "Vui lòng điền tất cả các trường";
      return;
    }

    if ($scope.user.password != $scope.repassword) {
      $scope.formValid = true;
      $scope.formValidMessage =
        "Vui lòng nhập mật khẩu và xác nhập mật khẩu giống nhau";
      return;
    }
    if (!$scope.formValid) {
      $http({
        method: "POST",
        url: "http://localhost:3000/users",
        data: $scope.user,
      }).then(() => {
        alert("Đăng ký thành công");
      });
    }
  };
});
