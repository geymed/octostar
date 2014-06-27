filters.filter('split', function () {
  return function (input, delimiter) {
    delimiter = delimiter || '\n';
    return input.split(delimiter);
  };
});