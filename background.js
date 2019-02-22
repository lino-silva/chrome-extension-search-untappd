
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Search in untappd.com',
    id: 'search-untappd',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === "search-untappd") { // here's where you'll need the ID
    chrome.tabs.create({ url: "https://untappd.com/search?q=" + info.selectionText });
  }
});