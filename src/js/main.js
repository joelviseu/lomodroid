var LOMO = window.LOMO || {};

$(document).ready(function() {
    //LOMO.Feed.init();
});

google.setOnLoadCallback(LOMO.Feed.init);​



LOMO.Feed = function() {
    var pub = {
        // Public members
        publicAttribute: true,
        feed:null,

        init: function() {
            this.feed = new google.feeds.Feed("http://www.digg.com/rss/index.xml");
            console.log(this.feed);
            feed.load(LOMO.feed.loaded);
        },
        loaded: function(result){
        	console.log("feed: " + result);
        	
        }
    }

    return pub;
}();


var feed = new google.feeds.Feed("http://www.digg.com/rss/index.xml");

// Calling load sends the request off.  It requires a callback function.
feed.load(feedLoaded);