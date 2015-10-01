var app = angular.module('app',[]);

app.controller('empresasCtrl', function($scope,$http){
  var refresh = function(){
    $http.post('/sgc/empresa/listar').success(function(res){
      $scope.empresaslist = res;
      $scope.empresa = "";
    });
  };
  refresh();
  $scope.solucao = function(empresa){
    //$http.post('/sgc/empresa/update' +empresa._id, empresa);
    console.log(empresa._id);
    //window.location.reload(true);
  };
});
