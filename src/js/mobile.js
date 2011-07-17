var LOMO = window.LOMO || {};
var LOMO_FEED_URL = "http://api.flickr.com/services/feeds/photos_public.gne?id=50369640@N04&lang=en-us&format=rss_200";

//console.log = function() {}

$(document).ready(function() {

});




LOMO.Feed = function() {
	var itemTemplate = "{{#entries}}<li class='gallery-item'>" +
			"<a href='{{link}}' target='_blank'>" +
			"<img class='photo' border='0' width='768' alt='{{ title }}' src='{{#mediaGroups}}{{#contents}}{{url}}{{/contents}}{{/mediaGroups}}'>" +
			"<div class='metaContainer'><span>{{ title }}</span>" +
			"</a>" +
			"<div id='shareContainer'>" +
									"<ul>" +
										"<li><g:plusone size='small' count='false' href='{{ link }}'></g:plusone></li>" +
										"<li><a target='_blank' href='http://www.facebook.com/sharer.php?u={{ link }}'><div class='share-button16 fb-share'></div></a></li>" +
										"<li><a target='_blank' href='http://twitter.com/home?status={{ link }}'><div class='share-button16 tw-share'></div></a></li>" +
									"</ul>" +
								"</div>" +
			"</div>" +
			"</li>{{/entries}}";
	var feed = null;
	var index = 0;
	var itemsPerUpdate = 3;
    var pub = {
        // Public members
        publicAttribute: true,
        feed:null,

        init: function() {
        	console.log("Feed.init");
            feed = new google.feeds.Feed(LOMO_FEED_URL);
            feed.setNumEntries(20)
            feed.load(LOMO.Feed.loaded);
        },
        loaded: function(result){
        	feed = result.feed;
        	pub.updateStream();
        	
        },
        updateStream: function(){
        	var entries = feed.entries.splice(0,3);
        	if(!entries){return};
        	data = {'entries': entries};
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
