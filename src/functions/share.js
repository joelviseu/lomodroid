$(document).ready(function() {
  
  $(".fb-share").live("click", function(e){
    
    //console.log($(e.target));
    //console.log(e);
    var url = $(e.target).attr("data-share-url")
    //console.log(url);
    
    var left = (screen.width/2)-(450/2);
    var top = (screen.height/2)-(350/2);
    
    window.open ("http://www.facebook.com/sharer.php?u="+url,"facebook share","menubar=1,resizable=1,width=450,height=350, top="+top+", left="+left);
    
  });
  
  
});