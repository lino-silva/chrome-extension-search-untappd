/* Copyright 2019, Lino Silva
 * You may use, distribute and modify this code under the
 * terms of the MIT License.
 * 
 * It's just an extension to search for beer, lighten up a little!
 */

const CONSTANTS = {
  baseUrl: 'https://untappd.com/search?q=',
  trim: /\s?(can(s)?)?\s?\d+(\.\d+)?\s?([cdm]?)l$/ig // Fucking regexes.
}
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Search in Untappd',
    id: 'search-untappd',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info && info.selectionText && info.menuItemId === 'search-untappd') {
    const trimmedText = info.selectionText.replace(CONSTANTS.trim, '');
    const url = `${CONSTANTS.baseUrl}${encodeURIComponent(trimmedText)}`;
    chrome.tabs.create({ url });
  }
});
