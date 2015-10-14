var app = angular.module('app',[]);

app.controller('userCtrl', function($scope,$http){
  var refresh = function(){
    $http.post('/sgc/user/listar').success(function(res){
      $scope.userslist = res;
      $scope.users = "";
    });
  };
  refresh();
  $scope.addUser = function(){
    $http.post('/sgc/user/cadastrar',$scope.users).success(function(response){
      refresh();
    });
  };
  $scope.remove = function(id){
    $http.post('/sgc/user/deletar' +id);
    refresh();
  }
  $scope.edit = function(id){
    $http.post('/sgc/user/pesquisar' +id).success(function(response){
      $scope.users = response;
    });
  };
  $scope.update = function(){
    $http.post('/sgc/user/update' +$scope.users._id, $scope.users);
    refresh();
  }
});
