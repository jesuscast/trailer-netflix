function getTrailers(){
	var links = document.querySelectorAll("a");
	alert(links.length);
}
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	sendResponse(getTrailers());
});
