// const addStylesByQuery = (query, property, value) => {
//   if (!query || !property || !value) return;

//   const nodes = document.querySelectorAll(query);
//   nodes.forEach((node) => {
//     node.style[property] = value;
//   });
// };

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

const applySettings = (settings) => {
  const keys = Object.keys(settings);
  keys.forEach((key) => {
    if (!handlers[key]) return;

    const handler = handlers[key];
    handler(settings[key]);
  });
};

const loadAndApplySettings = () => {
  const PERSISTED_KEY_SETTINGS = "minimalism-settings";

  chrome.storage.sync.get([PERSISTED_KEY_SETTINGS], (value) => {
    if (value[PERSISTED_KEY_SETTINGS]) {
      applySettings(value[PERSISTED_KEY_SETTINGS]);
    }
  });
};

const watchSettings = () => {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.name === "settings:updated") loadAndApplySettings();
  });
};

const init = () => {
  watchSettings();

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
