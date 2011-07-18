<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en" dir="ltr">
  <head>
    <title>Lomo</title>
		<LINK REL="SHORTCUT ICON" HREF="favicon.ico">
    <style type="text/css">
      @import "style.css";
    </style>

	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-19535690-1']);
	  _gaq.push(['_trackPageview']);

	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();

	</script>


		<script src="functions/jquery-1.3.2.min.js"></script>
    <script src="functions/functions.js"></script>
    <script src="functions/share.js"></script>
		<script src="functions/jquery.jgfeed.js"></script>
		<?php
			require_once('mobile_device_detect.php');
			require_once("phpFlickr.php");
			mobile_device_detect(true,true,true,false,true,true,true,'http://www.xbox360museum.com/sandbox/index_mobile.php',false);
			$f = new phpFlickr("", "");
			$photoset_id = "";
			$secret= "";
		?>
		<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
  </head>
  <body>
    <div id="main-frame">
			<div id="fixed-header">
				<div id="header-container" class="container">
					
					<div id="lhs-header-container" class="firstContent">
						<a href="http://www.lomodroid.com/"><img src="lomodroid_logo.gif"/></a>
						<div class="link-container">
							<a href="http://www.flickr.com/groups/lomodroid/">JOIN</a>
							<a href="http://twitter.com/lomodroid">FOLLOW</a>
						</div>
					</div>
					
					<div id="rhs-header-container" class="unit">
						<img id="robot" src="lomodroid_robot.gif"/>
					</div>
					
				</div>
			</div>		
		<div class="main-content-container">
				<ul id="photo-list">
				<?php
					$photos = $f->photosets_getPhotos($photoset_id, null, null, 3);
					foreach ($photos['photoset']['photo'] as $photo) {
						// Build image and link tags for each photo
						$photoInfo = $f->photos_getInfo($photo[id]);
						echo "<li><a href=http://www.flickr.com/photos/". $photoInfo['owner']['username']. "/$photo[id]>";
						echo "<img border='0' width='768' alt='$photo[title]' ".
						"src=" . $f->buildPhotoURL($photo, "Large") . "><div class='metaContainer'><span>".$photoInfo['title']."</span>";
						echo '
								</a>
								<div id="shareContainer">
									<ul>
										<li><g:plusone size="small" count="false" href="http://www.flickr.com/photos/'. $photoInfo['owner']['username']. '/'.$photo[id].'"></g:plusone></li>
										<li><a target="_blank" href="http://www.facebook.com/sharer.php?u=http://www.flickr.com/photos/'. $photoInfo['owner']['username']. '/'.$photo[id].'"><div class="share-button16 fb-share"></div></a></li>
										<li><a target="_blank" href="http://twitter.com/home?status=http://www.flickr.com/photos/'. $photoInfo['owner']['username']. '/'.$photo[id].'"><div class="share-button16 tw-share"></div></a></li>
										
										<!--li><g:plusone count="false" href="http://www.flickr.com/photos/'. $photoInfo['owner']['username']. '/'.$photo[id].'"></g:plusone></li>
										<li><div class="share-button16 fb-share" data-share-url="http://www.flickr.com/photos/'. $photoInfo['owner']['username']. '/'.$photo[id].'"></div></li>
										<li><a href="http://twitter.com/share" class="twitter-share-button" data-url="http://www.flickr.com/photos/'. $photoInfo['owner']['username']. '/'.$photo[id].'" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></li-->
									
										</ul>
								</div>
								<!--div class="addthis_toolbox addthis_default_style shareBox">
									<a href="http://www.addthis.com/bookmark.php?v=250&amp;username=xa-4cd4693368857545" class="addthis_button_compact">Share</a>
									<span class="addthis_separator">|</span>
									<a class="addthis_button_facebook"></a>
									<a class="addthis_button_twitter"></a>							
									<a class="addthis_button_bookmark"></a>
									<a class="addthis_button_print"></a>
								</div>
								<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#username=xa-4cd4693368857545"></script-->
							</div>
						</li>';
					}
				?>
				</ul>
			</div>
    </div>
  </body>
</html>