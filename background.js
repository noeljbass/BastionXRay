chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "archiveUrl") {
        const saveUrl = 'https://web.archive.org/save/' + encodeURIComponent(request.url);
        
        chrome.tabs.create({ url: saveUrl }, () => {
            sendResponse({ success: true, message: 'Tab opened for archiving.' });
        });
        
        return true; 
    }
});
