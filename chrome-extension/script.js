function getSrcFromTitle(title) {
	return "#";
}
function getTrailers(){
	shows = document.getElementsByClassName("slider-item");
	//alert(shows.length);
	for(var i = 0; i<shows.length; i++){
		//console.log(i);
		check_tag = shows[i].getElementsByClassName("smallTitleCard");
		if(check_tag.length > 0){
			check_attribute = check_tag[0];
			if(check_attribute.hasAttribute("aria-label")){
				//console.log("has attribute");
				title = check_attribute.getAttribute("aria-label");
				console.log(title);
				if(title != ""){
					src_title = getSrcFromTitle(title);
					$(shows[i]).append("<a title='"+title+"' class='trailer-btn no-view'>View Trailer</a>");
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
	window.setTimeout(getTrailers, 4000);
});

$(document).on('click', '.trailer-btn', function(){
		trailer_link = $(this);
		console.log(trailer_link.attr('title'));
		if(trailer_link.hasClass("no-view")){
			myFirebaseRef.child("trailers/"+trailer_link.attr('title')).on("value", function(snapshot) {
				//alert(snapshot.val());
				iframe_trailer = $("<div id='window'> <h3>"+trailer_link.attr('title')+"</h3> <p><iframe width='500' height='315' src='"+snapshot.val()+"' frameborder='0' allowfullscreen></iframe></p><button id='exit'>Close Dialog</button> </div>");
				trailer_link.parent().append(iframe_trailer);
				trailer_link.parent().css("z-index","2");
			});
		}
		trailer_link.toggleClass("no-view");
});

$(document).on('click','#exit', function(){
	$("#exit").parent().parent().find(".trailer-btn").toggleClass("no-view");
	$("#exit").parent().remove();
});