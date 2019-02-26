
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Search in untappd.com',
    id: 'search-untappd',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === "search-untappd") {
    const url = `https://untappd.com/search?q=${encodeURIComponent(info.selectionText)}`;
    chrome.tabs.create({ url });
  }
});
