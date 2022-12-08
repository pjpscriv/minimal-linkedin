/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PERSISTED_KEY_SETTINGS = "minimalism-settings";
var handleSettingsUpdated = function handleSettingsUpdated(value) {
  chrome.storage.sync.set(_defineProperty({}, PERSISTED_KEY_SETTINGS, value));
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      name: "settings:updated"
    });
  });
};
var loadSettings = function loadSettings(callback) {
  chrome.storage.sync.get([PERSISTED_KEY_SETTINGS], function (value) {
    if (value[PERSISTED_KEY_SETTINGS]) callback(value[PERSISTED_KEY_SETTINGS]);
  });
};
window.addEventListener("message", function (event) {
  var payload = JSON.parse(event.data);
  if (!payload) return;
  if (payload.name === "settings:updated") {
    return handleSettingsUpdated(payload.value);
  }
}, false);
var iframe = document.getElementById("iframe-config");
iframe.onload = function () {
  loadSettings(function (value) {
    var payload = {
      name: "settings:loaded",
      value: value
    };
    iframe.contentWindow.postMessage(JSON.stringify(payload), "*");
  });
};
/******/ })()
;