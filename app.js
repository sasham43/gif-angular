var app = angular.module("gifApp", []);

app.controller('GifController', function($scope, $http){

  $scope.searchIcon = 'search.png';
  $scope.randomIcon = 'shuffle.png';




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
    $scope.changeIcons();
    // $scope.searchStyle = {'border': 'solid 4px #646FB8', 'width': '34px', 'height': '34px'};
    // $scope.randomStyle = {'border': 'none'};
  }

  $scope.randomMode = function(){
    $scope.showSearch = false;
    $scope.showRandom = true;
    $scope.changeIcons();
    // $scope.searchStyle = {'border': 'none'};
    // $scope.randomStyle = {'border': 'solid 4px #646FB8'};
  }

  $scope.changeIcons = function(){
    if($scope.showSearch){
      $scope.searchIcon = 'search_white.png';
      $scope.randomIcon = 'shuffle.png';
    } else if ($scope.showRandom){
      $scope.searchIcon = 'search.png';
      $scope.randomIcon = 'shuffle_white.png';
    }
  }

});
