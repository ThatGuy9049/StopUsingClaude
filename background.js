const TARGET_SITE = "claude.ai";

function blockSite(tabId) {
chrome.scripting.executeScript({
target: { tabId },
func: () => {
alert(
"Use literally any other AI service."
);
}
}).finally(() => {
chrome.tabs.remove(tabId).catch(() => {});
});
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
if (
changeInfo.status === "loading" &&
tab.url?.includes(TARGET_SITE)
) {
blockSite(tabId);
}
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
try {
const tab = await chrome.tabs.get(tabId);


if (tab.url?.includes(TARGET_SITE)) {
  blockSite(tabId);
}


} catch {
// Tab may have already been closed
}
});
