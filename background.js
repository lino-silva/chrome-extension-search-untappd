/* Copyright 2019, Lino Silva
 * You may use, distribute and modify this code under the
 * terms of the MIT License.
 * 
 * It's just an extension to search for beer, lighten up a little!
 */

const CONSTANTS = {
  baseUrl: 'https://untappd.com/search?q=',
  trim: /\s*(can(s)?)?\s?(\d+([\.\,]\d+)?\s?([cdm]?)l\.?)?\s*$/ig // Fucking regexes.
}
chrome.runtime.onInstalled.addListener(function () {
  
  chrome.contextMenus.create({
    title: 'Search in Untappd',
    id: 'search-untappd',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    title: 'Search in Untappd in background',
    id: 'search-untappd-bg',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  
  if (info && info.selectionText && info.menuItemId.startsWith("search-untappd")) {
    
    let tabActive = null;

    switch(info.menuItemId) {
      case 'search-untappd':
        tabActive = true;
        break;
      case 'search-untappd-bg':
        tabActive = false;
        break;
      default:
      break;
    }

    const trimmedText = info.selectionText.replace(CONSTANTS.trim, '');
    const url = `${CONSTANTS.baseUrl}${encodeURIComponent(trimmedText)}`;
    
    chrome.tabs.create({ 
      url, 
      active: tabActive
    });
  }
});
