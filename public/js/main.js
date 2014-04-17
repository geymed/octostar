var controller = {
	init:function(){
		controller.sidebar.asyncToggle();
		controller.sidebar.sortdropdown();
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
		},
		sortdropdown: function(){
			$('.selectpicker').selectpicker().promise().done(function(){
				function filterReit(){
					if ($('a.filter').length === 0){
						_.delay(filterReit, 500);
					}
					else{
						$('a.filter').on('click',function(){
							_.delay(function(){
								service.isotope.filterby($('.selectpicker.filter').val());
							},100);
						})
					}
				}
				filterReit();
				function sortReit(){
					if ($('a.sort').length === 0){
						_.delay(sortReit, 500);
					}
					else{
						$('a.sort').on('click',function(){
							_.delay(function(){
								service.isotope.sortby($('.selectpicker.sort').val());
							},100);
						})
					}
				}
				sortReit();
			});
		},
		filterdropdown:function(){
			function filterReit(){
				if ($('a.filter').length === 0){
					_.delay(filterReit, 500);
				}
				else{
					$('a.filter').on('click',function(){
						_.delay(function(){
							service.isotope.filterby($('.selectpicker.filter').val());
						},100);
					})
				}
			}
			filterReit();
		}
	}
}
var service = {
	vue:{
		init:function(){
			vue = new Vue({
				el: '#vapp',
				data: {
					languages:[],
					lastSynced: 'never',
					repos: {
						remote:[],
						local:[]
					}
				},
				methods:{
					getStars:model.getStars,
					initSync:model.initSync,
					sortby:service.isotope.sortby,
					filterby:service.isotope.filterby,
					forceSync:model.forceSync
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
				Vue.filter('titlebrief', function (value) {
					if (value.length > 11){
						return value.substring(0, 11) + "...";
					}
					return value;
				});
				Vue.filter('langfilter', function (value) {
					if (value){
						return value.toLowerCase();
					}
					return 'unknown'
				});
				Vue.filter('timeago', function (value) {
					return moment(value).fromNow();
				});
				Vue.filter('bob', function (value) {
					// console.log(value);
					// var dateString = moment.unix(value).format("YYYY-MM-DDTHH:mm:ss") + "Z";
					// console.log(dateString);
					return 'bob';
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
				});
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
			$('#main-content').isotope({ sortBy: str })
		},
		filterby:function(arr){
			if (arr === null){
				arr = '*';
			}
			else{
				arr = arr.join();
			}
			$('#main-content').isotope({ filter: arr })
		}
	},
	selectpicker:{
		init:function(){

		},
		refresh:function(tag){
			$('.selectpicker.'+tag).selectpicker('refresh');
			controller.sidebar.sortdropdown();
		}
	},
	swap: function(ref, replacement, input) {
		return (ref === input) ? replacement : input;
	}
}
var vue;
var model = {
	init:function(){
		service.vue.init();
		model.initSync();
	},
	getStars:function(){
		$.get('/api/account/stars',function(res){
			vue.repos = res.repos;
			var s = new Date(res.lastSynced).toISOString();
			dateString = moment(s).fromNow();
			vue.lastSynced = dateString;
			var langs = _.pluck(res.repos.remote, 'language');
			langs = _.uniq(langs);
			langs = _.map(langs, _.partial(service.swap, null, 'Unknown'));
			vue.languages = langs;
			_.delay(function(){
				service.selectpicker.refresh('filter');
			},500);
		})
	},
	initSync:function(){
		$.get('/api/account/sync',function(res){
			model.getStars();
		})
	},
	forceSync:function(){
		$.get('/api/account/sync?force=true',function(res){
			model.getStars();
		})
	}
}
$(document).ready(function() {
	controller.init();
});
