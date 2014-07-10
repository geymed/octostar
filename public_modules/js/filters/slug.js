filters.filter('slug', function() {
  return function(lang) {
    if (lang) {
      lang = lang.toLowerCase();
      lang = lang.replace(/ /g, "-");
      lang = lang.replace(/\+/g, "p");
      return lang;
    }
    return 'unknown'
  };
});