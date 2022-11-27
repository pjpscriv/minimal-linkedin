const PERSISTED_KEY_SETTINGS = "minimalism-settings";

// chrome.storage.sync.get([PERSISTED_KEY_SETTINGS], (settings) => {
//   console.log(settings, JSON.stringify(settings), "settings");
// });

chrome.runtime.onMessage.addListener((message) => {
  //   console.log(message);
  //   if (type === "settings:update") {
  //     chrome.storage.sync.set({ PERSISTED_KEY_SETTINGS: payload });
  //   }
});

chrome.action.onClicked.addListener((tab) => {
  //   console.log("hello world");
  //   chrome.storage.local.get(["name"], ({ name }) => {
  //     chrome.tabs.sendMessage(tab.id, { name });
  //   });
});
