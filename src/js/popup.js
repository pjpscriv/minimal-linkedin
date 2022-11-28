const PERSISTED_KEY_SETTINGS = "minimalism-settings";

const handleSettingsUpdated = (value) => {
  chrome.storage.sync.set({ [PERSISTED_KEY_SETTINGS]: value });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { name: "settings:updated" });
  });
};

const loadSettings = (callback) => {
  chrome.storage.sync.get([PERSISTED_KEY_SETTINGS], (value) => {
    if (value[PERSISTED_KEY_SETTINGS]) callback(value[PERSISTED_KEY_SETTINGS]);
  });
};

window.addEventListener(
  "message",
  (event) => {
    console.log(event);
    const payload = JSON.parse(event.data);
    if (!payload) return;

    if (payload.name === "settings:updated") {
      return handleSettingsUpdated(payload.value);
    }
  },
  false
);

const iframe = document.getElementById("iframe-config");
iframe.onload = () => {
  loadSettings((value) => {
    const payload = {
      name: "settings:loaded",
      value: value,
    };
    iframe.contentWindow.postMessage(JSON.stringify(payload), "*");
  });
};
