var debugging = true;
if (typeof console == "undefined") var console = { log: function() {} }; 
else if (!debugging || typeof console.log == "undefined") console.log = function() {};

var LOMO = window.LOMO || {};
var LOMO_USER_ID = "50369640@N04";
var LOMO_FEED_URL = "http://api.flickr.com/services/feeds/photos_public.gne?id=50369640@N04&lang=en-us&format=rss_200";
var LOMO_REST_API = "http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=25f150f396375b2b912952f56ba5bfe6&user_id=50369640%40N04&extras=path_alias%2C+url_z&format=json&nojsoncallback=1&per_page=10&page=";
//var LOMO_REST_API = "http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=25f150f396375b2b912952f56ba5bfe6&user_id=50369640%40N04&format=json&per_page=10&page=";
var LOMO_PAGE_INDEX = 1;
	//console.log = function() {}

$(document).ready(function() {

});




LOMO.Feed = function() {
	var itemTemplate = "{{#photos}}<li>" +
			"<a href='http://www.flickr.com/photos/{{pathalias}}/{{id}}' target='_blank'>" +
			"<img class='photo' border='0' width='768' alt='{{ title }}' src='{{ url_z }}'>" +
			"<div class='metaContainer'><span>{{ title }}</span>" +
			"</a>" +
			"<div id='shareContainer'>" +
									"<ul>" +
										"<li><g:plusone size='small' count='false' href='http://www.flickr.com/photos/{{pathalias}}/{{id}}'></g:plusone></li>" +
										"<li><a target='_blank' href='http://www.facebook.com/sharer.php?u=http://www.flickr.com/photos/{{pathalias}}/{{id}}'><div class='share-button16 fb-share'></div></a></li>" +
										"<li><a target='_blank' href='http://twitter.com/home?status=http://www.flickr.com/photos/{{pathalias}}/{{id}}'><div class='share-button16 tw-share'></div></a></li>" +
									"</ul>" +
								"</div>" +
			"</div>" +
			"</li>{{/photos}}";
	var feed = [];
	var index = 0;
	var itemsPerUpdate = 3;
    var pub = {
        // Public members
        publicAttribute: true,
        feed:null,

        init: function() {
        	console.log("Feed.init");            
            pub.getData();
        },
        getData: function(){
        	console.log("GET DATA"); 
        	$.ajax({
          	  url: LOMO_REST_API + LOMO_PAGE_INDEX,
          	  dataType:'json',
          	  success: $.proxy(function( data ) {
          	    pub.loaded(data)
          	  }, this)
          	});
        },
        loaded: function(result){
        	console.log("***GOT DATA"); 
        	console.log(result.photos.photo);
        	feed = feed.concat(result.photos.photo);
        	pub.updateStream();
        	
        	LOMO_PAGE_INDEX++;
        	
        },
        updateStream: function(){
        	var photos = feed.splice(0,3);
        	console.log(feed.length + " photos left in local feed");
        	if(feed.length <=4){
        		pub.getData();
        	}
        	if(!photos){return};
        	data = {'photos': photos};
        	console.log(data);
        	//console.log(Mustache.to_html(itemTemplate, data));
        	$('#photo-list').append(Mustache.to_html(itemTemplate, data));
        	
        	gapi.plusone.go("photo-list");
        }
    }

    return pub;
}();


var loadingGroup = false;
var scrollMargin = 0;
var completeStop = false;
$(window).scroll(function(){
	//alert("scroll:" + $(document).scrollTop() + "last photo offest top: " + $('#photo-list li:last').offset().top );
	//if ($(document).scrollTop() >= $('#photo-list li:last').offset().top - 200) {
	if  ($(window).scrollTop() == $(document).height() - $(window).height()){
			if (!loadingGroup && !completeStop){
			//loadMore();
			LOMO.Feed.updateStream();
			//loadingGroup = true;
			//log("doc:" + $(document).height() + " ,window:" + $(window).height() + " , window top scroll: " + $(window).scrollTop());
			}	
		}
	});

google.setOnLoadCallback(LOMO.Feed.init);
