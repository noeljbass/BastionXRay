document.addEventListener('DOMContentLoaded', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    document.getElementById('urlInput').value = tab.url;
});

document.getElementById('submitUrl').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    archiveUrl(url);
});

function archiveUrl(url) {
    if (!url) {
        document.getElementById('message').innerText = 'Please enter a valid URL.';
        document.getElementById('archivedLink').innerText = '';
        return;
    }

    chrome.runtime.sendMessage({ action: "archiveUrl", url: url }, (response) => {
        if (response.success) {
            document.getElementById('message').innerText = 'Archiving in progress...';
            document.getElementById('archivedLink').innerText = '';
        } else {
            document.getElementById('message').innerText = response.message;
            document.getElementById('archivedLink').innerText = '';
        }
    });
}
