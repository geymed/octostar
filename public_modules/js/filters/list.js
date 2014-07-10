filters.filter('list', function() {
  return function(value) {
    if (value instanceof Array) {
      return value.join(' ');
    }
    return value;
  };
});