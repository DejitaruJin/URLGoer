if (typeof browser === "undefined") {
    var browser = chrome;
}

function save() {
	var minsInput = document.getElementById('mins');
	if (parseInt(minsInput.value) < parseInt(minsInput.min)) {
		minsInput.value = minsInput.min;
	}
	browser.storage.local.set({'url':document.getElementById('url').value,'mins':parseInt(mins.value)})
	browser.runtime.sendMessage({type:"UPDATE"})
}

(function() {
	browser.storage.local.get('url', function(result) {
		if (result.url) {
			document.getElementById('url').value = result.url;
		}
	})
	browser.storage.local.get('mins', function(result) {
		if (result.mins) {
			document.getElementById('mins').value = result.mins;
		}
	})
	document.getElementById('save').addEventListener("click", save);
})();
