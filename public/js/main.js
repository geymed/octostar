var controller = {
	sidebar:{
		asyncToggle: function(){
			$('.toggle').bootstrapSwitch();
			$('.bootstrap-switch-id-active-sync-dummy').on('switchChange.bootstrapSwitch', function(event, state) {
				if (state && !($('#active-sync').is(':checked'))){
					toggleSync = true;
					$('#active-sync').click().promise().done(function(){
						toggleSync = false;
					});
				}
				else if (!state && $('#active-sync').is(':checked')){
					$('#active-sync').click().promise().done(function(){
						toggleSync = false;
					});
				}
			});
		}
	}
}
var services = {


}
var vue;
var model = {
	init:function(){
		vue = new Vue({
			el: '#vapp',
			data: {
				async: true,
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
			},
			methods:{
				getStars:model.getStars
			}
		});
	},
	getStars:function(){
		$.get('/api/account/stars',function(res){
			console.log(res);
			vue.repos = res;
		})
	},
	initSync:function(){

	}
}
Vue.filter('brief', function (value) {
	return value.substring(0, 75) + "...";
})

$(document).ready(function() {
	controller.sidebar.asyncToggle();
	model.init();
});
