var controller = {


}
var services = {


}
Vue.filter('brief', function (value) {
    return value.substring(0, 75) + "...";
})

$(document).ready(function() {
	var model = new Vue({
		el: '#vapp',
		data: {
			repos: [
			{
				title: 'Dummy Repo',
				owner: 'dummyuser',
				language: 'Javascript',
				tags: ['this','that','the other'],
				dateStarred: 'dummydate',
				dateCreated: 'dummydate',
				url:'http://example.com',
				description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, repellendus, debitis laudantium dolorum quas optio sint ipsa iusto laborum harum totam praesentium necessitatibus delectus corporis aliquid molestias itaque amet modi.'
			}
			]
		}
	});


});
