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
  mainStylesheet.href = chrome.runtime.getURL("src/css/minimal.css");
  head.appendChild(mainStylesheet);
};

const changeBranding = () => {
  const brandingContainer = document.getElementsByClassName(
    "global-nav__branding-logo"
  )[0];
  const brandingIcon = brandingContainer.getElementsByTagName("li-icon")[0];

  fetch(chrome.runtime.getURL("images/icon.svg"))
    .then((response) => response.text())
    .then((svg) => {
      brandingIcon.innerHTML = svg;
    });
};

const applySettings = (settings, group) => {
  const keys = Object.keys(settings);
  keys.forEach((key) => {
    if (!key.startsWith(group)) return;

    if (!handlers[key]) return;

    const handler = handlers[key];
    handler(settings[key]);
  });
};

const loadAndApplySettings = (group = "") => {
  chrome.storage.sync.get([PERSISTED_KEY_SETTINGS], (value) => {
    if (value[PERSISTED_KEY_SETTINGS]) {
      applySettings(value[PERSISTED_KEY_SETTINGS], group);
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

const init = () => {
  watchSettings();

  watchScroll();

  addStyleSheets();

  const booted = setInterval(() => {
    // this class gets applied to body when the boot is completed
    if (document.getElementsByClassName("boot-complete").length < 1) return;

    // Load and Apply Settings
    loadAndApplySettings();

    clearInterval(booted);
  }, 100);
};

init();
