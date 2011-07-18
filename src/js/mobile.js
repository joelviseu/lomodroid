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



window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
    }, 0);
  });




LOMO.Feed = function() {
	var feed = [];
	var index = 0;
	var itemsPerUpdate = 3;
    var pub = {
        // Public members
        publicAttribute: true,
        feed:null,

        init: function() {
        	
        	Code.PhotoSwipe.Current.setOptions({
				preventHide: true,
				getImageSource: function(obj){
					return obj.url_z;
				},
				getImageCaption: function(obj){
					return obj.title;
				}
			});
        	
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
        	
        	Code.PhotoSwipe.Current.setImages(feed);
        	                   		
        	                   			Code.PhotoSwipe.Current.show(0);
        	
        }
    }

    return pub;
}();

$(document).ready(function() {
	LOMO.Feed.init();
});
//google.setOnLoadCallback(LOMO.Feed.init);
