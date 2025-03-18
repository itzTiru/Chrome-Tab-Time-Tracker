let tabTimers = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
    if (!tabTimers[activeInfo.tabId]) {
    tabTimers[activeInfo.tabId] = {
      startTime: Date.now(),
      totalTime: 0
    };
  }
  
  chrome.storage.local.set({ tabTimers });
});

setInterval(() => {
  for (let tabId in tabTimers) {
    if (tabTimers[tabId]) {
      tabTimers[tabId].totalTime += Date.now() - tabTimers[tabId].startTime;
      tabTimers[tabId].startTime = Date.now();
    }
  }  
  chrome.storage.local.set({ tabTimers });
}, 1000);

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabTimers[tabId]) {
    tabTimers[tabId].totalTime += Date.now() - tabTimers[tabId].startTime;
    delete tabTimers[tabId];
    chrome.storage.local.set({ tabTimers });
  }
});
