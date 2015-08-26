var shows  = null;
var trailersFirstLength = 0;
function getSrcFromTitle(title) {
	return "#";
}
function getTrailers(){
	shows = document.getElementsByClassName("slider-item");
	trailersFirstLength = shows.length;
	//alert(shows.length);
	for(var i = 0; i<shows.length; i++){
		//console.log(i);
		check_tag = shows[i].getElementsByClassName("smallTitleCard");
		if(check_tag.length > 0){
			check_attribute = check_tag[0];
			if(check_attribute.hasAttribute("aria-label")){
				//console.log("has attribute");
				title = check_attribute.getAttribute("aria-label");
				//console.log(title);
				if(title != ""){
					src_title = getSrcFromTitle(title);
					$(shows[i]).append("<a title='"+title+"' class='trailer-btn no-view big-link'>View Trailer</a>");
				}
				//alert(title);
			}
			else {
				//console.log("has no attribute");
			}
		}
		else {
			//console.log("has no length")
		}
	}

}


function getTrailersSecondPass(){
	shows = document.getElementsByClassName("slider-item");
	//alert(shows.length);
	for(var i = trailersFirstLength; i<shows.length; i++){
		//console.log(i);
		check_tag = shows[i].getElementsByClassName("smallTitleCard");
		if(check_tag.length > 0){
			check_attribute = check_tag[0];
			if(check_attribute.hasAttribute("aria-label")){
				//console.log("has attribute");
				title = check_attribute.getAttribute("aria-label");
				//console.log(title);
				if(title != ""){
					src_title = getSrcFromTitle(title);
					$(shows[i]).append("<a title='"+title+"' class='trailer-btn no-view big-link'>View Trailer</a>");
				}
				//alert(title);
			}
			else {
				//console.log("has no attribute");
			}
		}
		else {
			//console.log("has no length")
		}
	}

}

var myFirebaseRef = new Firebase("https://netflix-trailers.firebaseio.com/");
var dialog = null;

$(document).ready(function(){
	//alert("read");
	window.setTimeout(getTrailers, 2000);
	window.setTimeout(getTrailersSecondPass, 5000);
});

$(document).on('click', '.trailer-btn', function(){
		trailer_link = $(this);
		console.log(trailer_link.attr('title').toLowerCase());
		if(trailer_link.hasClass("no-view")){
			//alert("creating iframe")
			$.get( "https://netflix-trailers.firebaseio.com/trailers/"+trailer_link.attr('title').toLowerCase()+"/.json", function( data ) {
				link_video = data;
				//alert("data received"+link_video);
				iframe_trailer = $("<div id='window'> <h3>"+trailer_link.attr('title')+"</h3> <button id='exit'>Exit</button><p><iframe width='500' height='315' src='"+link_video+"' frameborder='0' allowfullscreen></iframe></p> </div>");
				trailer_link.parent().append(iframe_trailer);
				trailer_link.parent().css("z-index","2");
			});
		}
});

$(document).on('click','#exit', function(){
	$("#exit").parent().parent().find(".trailer-btn");
	$("#exit").parent().remove();
});

$(document).on('click','.handle', function(){
	handle = $(this);
	//alert("clicked motherfucker");
	setTimeout(function(){
		//alert("clicked motherfucker 2");
		elements = handle.parent().find(".slider-item > .smallTitleCard");
		jQuery.each( elements,  function(i, item){
			title = $(item).attr("aria-label");
			console.log(item);
			$(item).parent().append("<a title='"+title+"' class='trailer-btn no-view big-link'>View Trailer</a>");
		});
	}, 1000);
});
