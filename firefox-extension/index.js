// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");
// Create a page-mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: "http://www.netflix.com/*",
  contentStyleFile: self.data.url("styles.css"),
  contentScriptFile: [self.data.url("jquery.js"),self.data.url("firebase.js"), self.data.url("script.js")]
});
