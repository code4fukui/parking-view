export const fetchViaProxy = async (url) => {
  const host = "proxy.sabae.club";
	const cache = "no";
	const base = "https://" + host + "/proxy/ITqT5WkhCf2yn1s9?";
  const srcenc = "utf-8";
	//const url2 = base + "cnv=json&srcenc=" + srcenc + "&cache="  + cache + "&callback=" + getCallbackMethod(callback) + "&url=" + encodeURIComponent(url);
	const url2 = base + "cnv=json&srcenc=" + srcenc + "&cache="  + cache + "&url=" + encodeURIComponent(url);
	return await (await fetch(url2)).text();
};
