function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
}

function updateActiveTabTime() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!tabs.length) return;

        const activeTabId = tabs[0].id;
        
        chrome.storage.local.get(['tabTimers'], function (result) {
            const tabTimers = result.tabTimers || {};
            const activeTabTimer = tabTimers[activeTabId] || { totalTime: 0 };

            const tabTimeElement = document.getElementById('tab-time');
            tabTimeElement.textContent = `Active Tab: ${formatTime(activeTabTimer.totalTime)}`;
        });
    });
}

setInterval(updateActiveTabTime, 1000);

updateActiveTabTime();
