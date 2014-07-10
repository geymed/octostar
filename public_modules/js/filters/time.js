filters.filter('time', function () {
	return function (dateString) {
		return dateString === null ? '' : moment.utc(dateString).format('h:mm:ss a');
	};
});