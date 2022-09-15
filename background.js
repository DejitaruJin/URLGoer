var timerID;
var url = "";
var mins = 0;

if (typeof browser === "undefined") {
    var browser = chrome;
}

function update() {
	if (timerID) {
		clearInterval(timerID);
	}
	timerID = setInterval(update, 1000);
	
	--mins;
	if (mins < 1) {
		getParams();
		browser.tabs.update({'url':url});
	}
	browser.action.setBadgeText({text:mins});
}

function getParams() {
	browser.storage.local.get('mins', function (result) {
		if (result.mins) {
			mins = result.mins;
		}
	});
	browser.storage.local.get('url', function (result) {
		if (result.url) {
			url = result.url;
		}
	});
}

browser.runtime.onMessage.addListener((request, sender, response) => {
	if (request.type === "UPDATE") {
		reInit();
	}
	sendResponse({});
});

function reInit() {
	if (timerID) {
		clearInterval(timerID);
	}
	getParams();
	browser.storage.local.get('url', function (result) {
		if (url && mins) {
			update();
		}
	});
}

reInit();