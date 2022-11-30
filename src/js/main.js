const PERSISTED_KEY_SETTINGS = "minimalism-settings";

const throttle = (fn, delay) => {
  // Capture the current time
  let time = Date.now();

  // Here's our logic
  return () => {
    if (time + delay - Date.now() <= 0) {
      // Run the function we've passed to our throttler,
      // and reset the `time` variable (so we can check again).
      fn();
      time = Date.now();
    }
  };
};

const addStyleSheets = () => {
  const head = document.querySelector("head");
  const mainStylesheet = document.createElement("link");
  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("css/minimal.css");
  head.appendChild(mainStylesheet);
};

const setDefaultSettings = () => {
  const defaults = {
    "nav:simplify": true,
    "left_pane:hide": true,
    "right_pane:hide": true,
    "feed:simplify": true,
    "floating_messaging:hide": true,
    "nav:labels:hide": false,
    "nav:home:hide": false,
    "nav:my_network:hide": false,
    "nav:jobs:hide": false,
    "nav:messaging:hide": false,
    "nav:notifications:hide": false,
    "left_pane:profile:hide": true,
    "left_pane:pages:hide": true,
    "left_pane:extras:hide": true,
    "right_pane:news:hide": true,
    "right_pane:ads:hide": true,
    "footer:hide": true,
    "feed:ads:hide": true,
    "feed:post_context:hide": true,
    "feed:post_author:simplify": true,
  };
  return chrome.storage.sync.set({ [PERSISTED_KEY_SETTINGS]: defaults });
};

const applySettings = (settings, group) => {
  const keys = Object.keys(settings);
  keys.forEach((key) => {
    if (!key.startsWith(group)) return;

    if (!handlers[key]) return;

    const handler = handlers[key];
    handler(settings[key]);

    // apply all nav-based configs
    if (key === "nav:simplify") {
      loadAndApplySettings("nav");
    }
  });
};

const loadAndApplySettings = (group = "") => {
  chrome.storage.sync.get([PERSISTED_KEY_SETTINGS], (value) => {
    if (value[PERSISTED_KEY_SETTINGS]) {
      applySettings(value[PERSISTED_KEY_SETTINGS], group);
    } else {
      setDefaultSettings().then(() => loadAndApplySettings(group));
    }
  });
};

const watchSettings = () => {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.name === "settings:updated") loadAndApplySettings();
  });
};

const watchScroll = () => {
  window.addEventListener(
    "scroll",
    throttle(() => loadAndApplySettings("feed"), 500)
  );
};

// const addConfigShortcut = () => {
//   fetch(chrome.runtime.getURL("partials/config-shortcut.html"))
//     .then((response) => response.text())
//     .then((html) => {
//       const shortcut = document.createElement("a");

//       shortcut.setAttribute("id", "__ML-config-shortcut");
//       shortcut.setAttribute("href", "#");
//       shortcut.innerHTML = html;
//       shortcut.getElementsByTagName("img")[0].src = chrome.runtime.getURL(
//         "images/icon-settings.svg"
//       );

//       shortcut.onclick = (e) => {
//         e.preventDefault();
//         chrome.action.openPopup();
//       };

//       document.body.insertBefore(shortcut, null);
//     });
// };

const init = () => {
  watchSettings();

  watchScroll();

  addStyleSheets();

  // addConfigShortcut();

  const booted = setInterval(() => {
    // this class gets applied to body when the boot is completed
    if (document.getElementsByClassName("boot-complete").length < 1) return;

    // Load and Apply Settings
    loadAndApplySettings();

    clearInterval(booted);
  }, 100);
};

init();
