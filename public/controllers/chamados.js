var app = angular.module('app',[]);

app.controller('tecnicoCtrl', function($scope,$http){
  var refresh = function(){
    $http.post('/sgc/chamados/listarTecnico').success(function(res){
      $scope.chamadoslist = res;
      console.log(res);
      $scope.chamados = "";
    });
  };
  refresh();
  $scope.deletar = function(id){
    $http.post('/sgc/chamados/deletar' +id);
    refresh();
  };
});

app.controller('chamadosCtrl', function($scope,$http){
  var refresh = function(){
    $http.post('/sgc/chamados/listar').success(function(res){
      $scope.chamadoslist = res;
      $scope.chamados = "";
    });
  };
  refresh();
  $scope.deletar = function(id){
    $http.post('/sgc/chamados/deletar' +id);
    refresh();
  };
});
