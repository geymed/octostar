services.factory('stars', function($http) {
  var stars = {};

  stars.getStars = function() {
    return $http.get('/api/stars');
  };

  return stars;
});