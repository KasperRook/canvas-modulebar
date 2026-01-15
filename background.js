chrome.runtime.onInstalled.addListener(() => {
    // Open the popup when the extension is installed
    chrome.action.openPopup();
});
