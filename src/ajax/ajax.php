<?php
		require_once("phpFlickr.php");
		$f = new phpFlickr("cdebb75fb498222416d23dce91618f9a", "065215435996f0d9");
		$photoset_id = "72157624682260557";
		$secret = "065215435996f0d9";
		$page = strip_tags($_GET["p"]);
		//$photos = $f->photosets_getPhotos($photoset_id, null, null, 7, $page );
		$photos = $f->people_getPublicPhotos('50369640@N04', null, null, 7, $page );
		//function people_getPublicPhotos ($user_id, $safe_search = NULL, $extras = NULL, $per_page = NULL, $page = NULL)
    echo count($photos);
    echo gettype($photos);
    echo implode(",", $photos);
    echo $photos;
    print_r($photos['photos']['photo']);
    //exit;
		$arr_photos = $photos['photos']['photo'];		
		foreach ($arr_photos as $photo) {	
		        print_r($photo);
						// Build image and link tags for each photo
						$photoInfo = $f->photos_getInfo($photo['id']);
						print_r($photoInfo);
						echo "<li><a href=http://www.flickr.com/photos/". $photoInfo['photo']['owner']['username']. "/$photo[id]>";
						echo "<img border='0' width='768' alt='$photo[title]' ".
						"src=" . $f->buildPhotoURL($photo, "Large") . "><div class='metaContainer'><span>".$photoInfo['photo']['title']."</span>";
						echo '
								</a>
								<div class="addthis_toolbox addthis_default_style shareBox">
								<a href="http://www.addthis.com/bookmark.php?v=250&amp;username=xa-4cd4693368857545" class="addthis_button_compact">Share</a>
								<span class="addthis_separator">|</span>
									<a class="addthis_button_facebook"></a>
									<a class="addthis_button_twitter"></a>							
									<a class="addthis_button_bookmark"></a>
									<a class="addthis_button_print"></a>
								</div>
								<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#username=xa-4cd4693368857545"></script>
							</div>
						</li>';
					}	
		
?>