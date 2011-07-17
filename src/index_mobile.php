<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en" dir="ltr">
  <head>
    <title>Lomo</title>
		<LINK REL="SHORTCUT ICON" HREF="favicon.ico">
    <style type="text/css">
      @import "style.css";
    </style>
		<script src="functions/jquery-1.3.2.min.js"></script>
    <script src="functions/functions.js"></script>
		<script src="functions/jquery.jgfeed.js"></script>
		<?php
			require_once('mobile_device_detect.php');
			require_once("phpFlickr.php");
			$f = new phpFlickr("cdebb75fb498222416d23dce91618f9a", "065215435996f0d9");
			$photoset_id = "72157624682260557";
			$secret= "065215435996f0d9";
		?>
  </head>
  <body>
    <div id="main-frame">
			<div id="fixed-header">
				<div id="header-container" class="container">
					
					<div id="lhs-header-container" class="firstContent">
						<a href="http://www.lomodroid.com/"><img src="lomodroid_logo.gif"/></a>
						<div class="link-container">
							<a href="http://www.lomodroid.com/">HOME</a>
							<a href="http://www.flickr.com/groups/lomodroid/">FLICKR</a>
							<a href="http://twitter.com/lomodroid">TWITTER</a>
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
					$photos = $f->photosets_getPhotos($photoset_id, null, null, 7);
					foreach ($photos['photoset']['photo'] as $photo) {
						// Build image and link tags for each photo
						$photoInfo = $f->photos_getInfo($photo[id]);
						echo "<li><a href=http://www.flickr.com/photos/". $photoInfo['owner']['username']. "/$photo[id]>";
						echo "<img border='0' alt='$photo[title]' ".
						"src=" . $f->buildPhotoURL($photo, "Large") . "><div class='metaContainer'><span>".$photoInfo['title']."</span>";
						echo '
								</a>
								<div class="addthis_toolbox addthis_default_style shareBox">
									<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>
									<a class="addthis_button_tweet"></a>
									<a href="http://www.addthis.com/bookmark.php?v=250&amp;username=lomodroid" class="addthis_button_compact">Share</a>
								</div>
									<script type="text/javascript">var addthis_config = {"data_track_clickback":true};</script>
									<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#username=lomodroid"></script>
							</div>
						</li>';
					}
				?>
				</ul>
				<div class="seemore" onclick="getFeed();">
					See more!!
				</div>
			</div>
    </div>
  </body>
</html>