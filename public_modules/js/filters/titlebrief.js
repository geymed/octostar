filters.filter('titlebrief', function() {
  return function(value) {
    if (value && value.length > 32) {
      return value.substring(0, 32) + "...";
    }
    return value;
  };
});