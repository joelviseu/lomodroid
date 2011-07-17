var loadingGroup = false;
var scrollMargin = 0;
var completeStop = false;
var p=2;


function adjustPage() {
	var scnWid,scnHei;
	if (self.innerHeight) // all except Explorer
	{
		scnWid = self.innerWidth;
		scnHei = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight)
		// Explorer 6 Strict Mode
	{
		scnWid = document.documentElement.clientWidth;
		scnHei = document.documentElement.clientHeight;
	}
	else if (document.body) // other Explorers
	{
		scnWid = document.body.clientWidth;
		scnHei = document.body.clientHeight;
	}
	$("#product-text").height(scnHei-450);
}

function rollOver(obj) {
  $(obj).addClass("onmouseover");
}
function rollOut(obj) {
  $(obj).removeClass("onmouseover");
}

function checkEmail(val) {
if (/^[\w-\.]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,3}$/.test(val)){
return (true)
}
return (false)
}
function log(msn){
	console.log(msn);
}
function trim(text) {
	return text.replace(/^\s+|\s+$/g,"");
}
function IsNumeric(input) {
  return (input - 0) == input && input.length > 0;
}
function quantityCheck(quantity){
	if (IsNumeric(quantity) && (quantity > 0) && (quantity != "")){
		return true;
	} else {
		return false;
	}
}

function createListElement(content, i, title, author){
	var li="<li id='photo-" + i + "'><img src=" + content +"_b.jpg" +
	" /><div><p>" + title +
	"</p></div></li>";
	$("#photo-list").append(li);
}


function editSize(url) {
	var new_url= $(url).children().children().attr('src');
	return(new_url.slice(0,-6));
}

function resetScreen() {
	$.each($("#photo-list li"), function() { 
  $(this).remove(); 
	});
}

//[UPDATE] - fix logic for bottom page 'load more' trigger
$(window).scroll(function(){
//alert("scroll:" + $(document).scrollTop() + "last photo offest top: " + $('#photo-list li:last').offset().top );
//if ($(document).scrollTop() >= $('#photo-list li:last').offset().top - 200) {
if  ($(window).scrollTop() == $(document).height() - $(window).height()){
		if (!loadingGroup && !completeStop){
		//loadMore();
		getFeed();
		loadingGroup = true;
		//log("doc:" + $(document).height() + " ,window:" + $(window).height() + " , window top scroll: " + $(window).scrollTop());
		}	
	}
});


function resetAddThis(){
	var script = 'http://s7.addthis.com/js/250/addthis_widget.js#domready=1&username=lomodroid';
	if (window.addthis){
			window.addthis = null;
}
	$.getScript( script );
}


function getFeed() {
	$('#photo-list li:last').append('<div id="loader"><img  alt="Loading..." src="loading_new.gif"></div>');
	$.ajax({
  url: 'ajax.php?p=' + p ,
		success: function(data) {
			$("#photo-list").append(data);
			p++;
			loadingGroup = false;
			resizeMetaContainer();
			$("#loader").remove();
			resetAddThis();
		}
	});
}


function resizeMetaContainer() {
	//$("#photo-list li").each(function() {
	//	$(this).children(".metaContainer").width($(this).children().width());
	//});
}


$(document).ready(function() {
	resizeMetaContainer();
});