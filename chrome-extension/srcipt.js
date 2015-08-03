chrome.browserAction.onClicked.addListener(function(request, sender, callback) {
	var tabId = request.tabId;
	chrome.tab.executeScript(tabId, { file: "content.js" }, function(){
		alert("success!");
	});
});
