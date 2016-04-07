var app = angular.module("gifApp", []);

app.controller('GifController', function($scope, $http){

  $scope.imageLoading = false;
  $scope.showGif = false;

  $scope.getRandomGif = function(){
    $scope.showGif = false;
    // $scope.gif = '';
    $scope.imageLoading = true;
    $http.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC').then(function(response){
      console.log(response);
      $scope.gif = response.data.data.image_url;
      $scope.imageLoading = false;
      $scope.showGif = true;
      $scope.blurButton = true;
    });
  }

  $scope.searchGifs = function(){
    console.log('search');
    $scope.showGif = false;
    $scope.imageLoading = true;
    $http.get('http://api.giphy.com/v1/gifs/search?q=' + $scope.searchText + '&api_key=dc6zaTOxFJmzC').then(function(response){
      console.log(response);
       $scope.gifList = response.data.data;
       $scope.imageLoading = false;
    });
  }

  $scope.searchMode = function(){
    $scope.showRandom = false;
    $scope.showSearch = true;
    console.log($scope.showRandom);
    console.log($scope.showSearch);
  }

  $scope.randomMode = function(){
    $scope.showSearch = false;
    $scope.showRandom = true;
    console.log($scope.showRandom);
    console.log($scope.showSearch);
  }

});
