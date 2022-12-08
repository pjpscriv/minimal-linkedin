/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PERSISTED_KEY_SETTINGS = "minimalism-settings";
var throttle = function throttle(fn, delay) {
  // Capture the current time
  var time = Date.now();

  // Here's our logic
  return function () {
    if (time + delay - Date.now() <= 0) {
      // Run the function we've passed to our throttler,
      // and reset the `time` variable (so we can check again).
      fn();
      time = Date.now();
    }
  };
};
var addStyleSheets = function addStyleSheets() {
  var head = document.querySelector("head");
  var mainStylesheet = document.createElement("link");
  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("css/minimal.css");
  head.appendChild(mainStylesheet);
};
var setDefaultSettings = function setDefaultSettings() {
  var defaults = {
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
    "nav:work:hide": true,
    "nav:recruiter:hide": true,
    "nav:advertise:hide": true,
    "left_pane:profile:hide": true,
    "left_pane:pages:hide": true,
    "left_pane:extras:hide": true,
    "right_pane:news:hide": true,
    "right_pane:ads:hide": true,
    "footer:hide": true,
    "feed:ads:hide": true,
    "feed:post_context:hide": true,
    "feed:post_author:simplify": true
  };
  return chrome.storage.sync.set(_defineProperty({}, PERSISTED_KEY_SETTINGS, defaults));
};
var keysOfToBeAppliedSettings = function keysOfToBeAppliedSettings(settings, group) {
  var keys = Object.keys(settings);
  if (typeof group === "string") {
    return keys.filter(function (key) {
      return key.startsWith(group);
    });
  } else if (Array.isArray(group)) {
    return group;
  }
};
var applySettings = function applySettings(settings, group) {
  var keys = keysOfToBeAppliedSettings(settings, group);
  keys.forEach(function (key) {
    if (!handlers[key]) return;
    var handler = handlers[key];
    handler(settings[key]);

    // apply all nav-based configs
    if (key === "nav:simplify") {
      loadAndApplySettings(["nav:labels:hide", "nav:home:hide", "nav:my_network:hide", "nav:jobs:hide", "nav:messaging:hide", "nav:notifications:hide"]);
    }
  });
};
var loadAndApplySettings = function loadAndApplySettings() {
  var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  chrome.storage.sync.get([PERSISTED_KEY_SETTINGS], function (value) {
    if (value[PERSISTED_KEY_SETTINGS]) {
      applySettings(value[PERSISTED_KEY_SETTINGS], group);
    } else {
      setDefaultSettings().then(function () {
        return loadAndApplySettings(group);
      });
    }
  });
};
var watchSettings = function watchSettings() {
  chrome.runtime.onMessage.addListener(function (message) {
    if (message.name === "settings:updated") loadAndApplySettings();
  });
};
var watchScroll = function watchScroll() {
  window.addEventListener("scroll", throttle(function () {
    return loadAndApplySettings("feed");
  }, 500));
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

var init = function init() {
  watchSettings();
  watchScroll();
  addStyleSheets();

  // addConfigShortcut();

  var booted = setInterval(function () {
    // this class gets applied to body when the boot is completed
    if (document.getElementsByClassName("boot-complete").length < 1) return;

    // Load and Apply Settings
    loadAndApplySettings();
    clearInterval(booted);
  }, 200);
};
init();
/******/ })()
;