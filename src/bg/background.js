// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts

 var getScore = function(url,successHandler){
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url, true);
  xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    if(xhr.status == 200)
    {
    	successHandler(xhr.response);
    }

      }
  };
  xhr.send();
}
chrome.browserAction.onClicked.addListener(function() {
  chrome.browserAction.setTitle({"title":"CricScore"});
  getScore("http://crm.wherrelz.com/api/cricket/",function(res){
  	var json = JSON.parse(res);
  	var arr = [];
  	for(var i=0;i<json['data'].length;i++)
  	   if(json['data'][i]['description'].indexOf('v India') > -1)
  	   	{
  	   		arr.push((json['data'][i]['description']));
  	   	}
  	var liveScore = arr.join(" ");
  	var notification = new Notification('Score',{body:liveScore,icon:"http://fla.fg-a.com/flags/india-flag-clipart-1.png"});
  });
});