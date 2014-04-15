var controller = {
	init:function(){
		controller.sidebar.asyncToggle();
		model.init();
		service.isotope.init();
	},
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
var service = {
	vue:{
		init:function(){
			vue = new Vue({
				el: '#vapp',
				data: {
					async: true,
					repos: {
						remote:[],
						local:[]
					}
				},
				methods:{
					getStars:model.getStars,
					initSync:model.initSync,
					sortby:service.isotope.sortby,
					filterby:service.isotope.filterby
				}
			});
			service.vue.filters.init();
			service.vue.effects.init();
		},
		filters:{
			init:function(){
				Vue.filter('brief', function (value) {
					if (value.length > 100){
						return value.substring(0, 100) + "...";
					}
					return value;
				});
				Vue.filter('list', function (value) {
					if (value instanceof Array){
						return value.join(' ');
					}
					return value;
				});
			}
		},
		effects:{
			init:function(){
				Vue.effect('isotopereinit', {
					enter: function (el, insert, timeout) {
						var thisindex = parseInt($(el).attr('class').split(' ')[4].split('-')[1]);
						insert();
						if (thisindex === 0){
							service.isotope.reload();
						}
					}
				})
			}
		}
	},
	isotope:{
		init:function(){
			$('#main-content').isotope({
				itemSelector: '.bs-callout',
				layoutMode: 'masonry',
				masonry: {
				  gutter:0
				},
				getSortData: {
				    name: '[data-name]',
				    language: '[data-language]',
				    owner: '[data-owner]',
				    created: '[data-created]',
				    tag: '[data-tag]'
				}
			})
		},
		reload:function(){
			$('#main-content').isotope('reloadItems').isotope();
		},
		sortby:function(str){
			console.log(str);
			$('#main-content').isotope({ sortBy: str })
		},
		filterby:function(str){
			console.log(str);
			if (str !== '*'){
				str = "."+str;
			}
			$('#main-content').isotope({ filter: str })
		}
	}

}
var vue;
var model = {
	init:function(){
		service.vue.init();
		model.getStars();
	},
	getStars:function(){
		$.get('/api/account/stars',function(res){
			console.log(res);
			vue.repos = res;
		})
	},
	initSync:function(){
		$.get('/api/account/sync',function(res){
			console.log(res);
			model.getStars();
		})
	}
}
$(document).ready(function() {
	controller.init();
});
