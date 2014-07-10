filters.filter('fromNow', function () {
	return function (dateString) {
		return dateString === null ? '' : moment.utc(dateString).fromNow();
	};
});