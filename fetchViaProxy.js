const jsonp = function(url, callback) {
	const head = document.getElementsByTagName("head")[0];
	const script = document.createElement("script");
	if (callback) {
		if (url.indexOf("?") >= 0) {
			url += "&";
		} else {
			url += "?";
		}
		url += "callback=" + getCallbackMethod(callback);
	}
	script.setAttribute("src", url);
	script.setAttribute("type", "text/javascript");
//	script.setAttribute("id", 'jsonp');
	head.appendChild(script);
};
const getCallbackMethod = (callback) => {
	var scallback = "_cb_" + (Math.random() * 1000000 >> 0);
	window[scallback] = (data) => {
		window[scallback] = null;
		callback(data);
	};
	return scallback;
};
export const fetchViaProxy = async (url) => {
	return new Promise((resolve) => {
		const host = "proxy.sabae.club";
		const cache = "no";
		const base = "https://" + host + "/proxy/ITqT5WkhCf2yn1s9?";
		const srcenc = "utf-8";
	
		const url2 = base + "cnv=json&srcenc=" + srcenc + "&cache="  + cache + "&url=" + encodeURIComponent(url);
		jsonp(url2, resolve);
		//const url2 = base + "cnv=json&srcenc=" + srcenc + "&cache="  + cache + "&url=" + encodeURIComponent(url);
		//return await (await fetch(url2)).text();
	});
};
