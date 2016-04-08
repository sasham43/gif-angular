var app = angular.module("gifApp", []);

var gifLoaded = false;

app.directive('imageonload', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
            element.bind('load', function() {
                // alert('image is loaded');
                gifLoaded = true;
                console.log('gif loaded');
            });
        }
  };
});

app.controller('GifController', function($scope, $http, $interval){

  $scope.searchIcon = 'search.png';
  $scope.randomIcon = 'shuffle.png';

  $scope.gifIndex = 0;
  $scope.gifList = [];

  $scope.imageLoading = false;
  $scope.showGif = false;

  $scope.imageLoading = false;
  $scope.showGif = true;

  $scope.getRandomGif = function(){
    $scope.showGif = false;
    // $scope.gif = '';
    $scope.imageLoading = true;
    $http.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC').then(function(response){
      console.log(response);
      $scope.gif = response.data.data.image_url;

      // not working
      $scope.waitForLoad();


    });
  }

  $scope.waitForLoad = function(){
    var waiting = $interval(function(){
      if(gifLoaded){
        $scope.imageLoading = false;
        $scope.showGif = true;
        return;
      }
    }, 100);
  }

  $scope.searchGifs = function(){
    $scope.gifIndex = 0;
    console.log('search');
    $scope.showGif = false;
    $scope.imageLoading = true;
    $http.get('http://api.giphy.com/v1/gifs/search?q=' + $scope.searchText + '&api_key=dc6zaTOxFJmzC').then(function(response){
      console.log(response);
      $scope.gifList = response.data.data;
      $scope.imageLoading = false;
    });

    var gifInterval = $interval(function(){
      if($scope.gifIndex < $scope.gifList.length){
        $scope.gifIndex++
      } else {
        $interval.cancel(gifInterval);
      }

      console.log($scope.gifIndex);
    }, 2500);
  }

  $scope.searchMode = function(){
    $scope.showRandom = false;
    $scope.showSearch = true;
    $scope.changeIcons();
    $scope.searchStyle = {'background-color': '#263696'};
    $scope.randomStyle = {'background-color': 'inherit'};
  }

  $scope.randomMode = function(){
    $scope.showSearch = false;
    $scope.showRandom = true;
    $scope.changeIcons();
    $scope.searchStyle = {'background-color': 'inherit'};
    $scope.randomStyle = {'background-color': '#263696'};
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
