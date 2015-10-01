var app = angular.module('app',[]);

app.controller('chamadosCtrl', function($scope,$http){
  var refresh = function(){
    $http.get('/sgc/chamados/listar').success(function(res){
      $scope.chamadoslist = res;
      $scope.chamados = "";
    });
  };
  refresh();
  $scope.solucao = function(chamados){
    $http.post('/sgc/chamados/update' +chamados._id, chamados);
    window.location.reload(true);
  };
});
