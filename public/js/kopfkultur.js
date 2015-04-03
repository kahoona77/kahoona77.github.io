angular.module('kka.services', []);

var kkModule = angular.module('kopfkultur', ['ngRoute', 'firebase', 'kka.services'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/home', {templateUrl: 'static/public/partials/home.html'}).
      when('/about', {templateUrl: 'static/public/partials/about.html'}).
      when('/contact', {templateUrl: 'static/public/partials/contact.html'}).
      when('/shop', {templateUrl: 'static/public/partials/shop.html'}).
      when('/galerie/:galerieId?', {templateUrl: 'static/public/partials/galerie.html'}).
      otherwise({redirectTo: '/home'});
  }]);

kkModule.controller('KopfKulturController',
  function ($scope, $anchorScroll, $location, galerieService) {

    $('.kk-icon-link').tooltip({
      placement: 'bottom'
    });

    $scope.loadGaleries = function () {
      galerieService.loadGaleries().then(function(response){
        if (response.status == 'ok') {
          $scope.galeries = response.data;
        }
      });
    };
    $scope.loadGaleries();

    $scope.isScreenXS = true;

    $scope.carouselPrev = function () {
      $('.carousel').carousel('prev');
    };

    $scope.carouselNext = function () {
      $('.carousel').carousel('next');
    };

    $scope.borderlesss = true;
    $('#blueimp-gallery').data('useBootstrapModal',  !$scope.borderlesss);
    $('#blueimp-gallery').toggleClass('blueimp-gallery-controls',  $scope.borderlesss);


  }
);
