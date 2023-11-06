/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/handlers.js":
/*!****************************!*\
  !*** ./src/js/handlers.js ***!
  \****************************/
/***/ (() => {

var _window$handlers;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// HELPERS
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstElementChild;
}
var addStyle = function addStyle(node, property, value) {
  node.style.setProperty(property, value, "important");
};
var removeStyle = function removeStyle(node, property) {
  node.style.removeProperty(property);
};
var addStyleByQuery = function addStyleByQuery(query, property, value) {
  if (!query || !property || !value) return;
  var nodes = document.querySelectorAll(query);
  nodes.forEach(function (node) {
    addStyle(node, property, value);
  });
};
var removeStyleByQuery = function removeStyleByQuery(query, property) {
  if (!query || !property) return;
  var nodes = document.querySelectorAll(query);
  nodes.forEach(function (node) {
    removeStyle(node, property);
  });
};

// END HELPERS

// NAVIGATION
var replaceNavbarLogoToNew = function replaceNavbarLogoToNew() {
  // if already exists
  if (document.getElementsByClassName("__ML-logo-new").length > 0) return;
  fetch(chrome.runtime.getURL("images/icon.svg")).then(function (response) {
    return response.text();
  }).then(function (svg) {
    var logoContainer = document.querySelector(".global-nav__branding-logo li-icon[type=app-linkedin-bug-color-icon]");
    var original = logoContainer.querySelector("svg");
    original.classList.add("__ML-logo-original");
    addStyle(original, "display", "none");
    var newLogo = htmlToElement(svg);
    newLogo.classList.add("__ML-logo-new");
    logoContainer.append(newLogo);
  });
};
var replaceNavbarLogoToOld = function replaceNavbarLogoToOld() {
  var logoContainer = document.querySelector(".global-nav__branding-logo li-icon[type=app-linkedin-bug-color-icon]");
  var logos = logoContainer.querySelectorAll("svg");
  logos.forEach(function (logo) {
    if (logo.classList.contains("__ML-logo-new")) {
      logo.remove();
    } else {
      removeStyle(logo, "display");
    }
  });
};
var replaceNavBrand = function replaceNavBrand() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    replaceNavbarLogoToOld();
  } else {
    replaceNavbarLogoToNew();
  }
};
var simplifyNavbar = function simplifyNavbar() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
} // nothing to do as everything is handled by dependant configs
;

var hideNavLabels = function hideNavLabels() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery("span.global-nav__primary-link-text", "display", "block");
  } else {
    removeStyleByQuery("span.global-nav__primary-link-text", "display");
  }
};
var hideDots = function hideDots() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".notification-badge--show", "opacity", "1");
  } else {
    addStyleByQuery(".notification-badge--show", "opacity", "0");
  }
};
var hideNavLink = function hideNavLink(label) {
  var query = ".global-nav nav li:has(span.global-nav__primary-link-text[title=\"".concat(label, "\"])");
  return function () {
    var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (!toApply) {
      removeStyleByQuery(query, "display");
    } else {
      addStyleByQuery(query, "display", "none");
    }
  };
};
// END NAVIGATION

// LEFT PANE
var hideLeftPane = function hideLeftPane() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".scaffold-layout__sidebar", "display", "block");
  } else {
    removeStyleByQuery(".scaffold-layout__sidebar", "display");
  }
};
var hideLeftPaneProfile = function hideLeftPaneProfile() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".feed-identity-module", "display", "block");
  } else {
    removeStyleByQuery(".feed-identity-module", "display");
  }
};
var hideLeftPanePages = function hideLeftPanePages() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".org-organization-admin-pages-entrypoint-card__card", "display", "block");
  } else {
    removeStyleByQuery(".org-organization-admin-pages-entrypoint-card__card", "display");
  }
};
var hideLeftPaneExtras = function hideLeftPaneExtras() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".community-panel", "display", "block");
  } else {
    removeStyleByQuery(".community-panel", "display");
  }
};

// END LEFT PANE

// RIGHT PANE
var hideRightPane = function hideRightPane() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery("aside.scaffold-layout__aside", "display", "block");
  } else {
    removeStyleByQuery("aside.scaffold-layout__aside", "display");
  }
};
var hideRightPaneNews = function hideRightPaneNews() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery("section:has(.news-module)", "display", "block");
  } else {
    removeStyleByQuery("section:has(.news-module)", "display");
  }
};
var hideRightPaneAds = function hideRightPaneAds() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".ad-banner-container", "display", "block");
  } else {
    removeStyleByQuery(".ad-banner-container", "display");
  }
};
var hideFooter = function hideFooter() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".global-footer-compact", "display", "block");
  } else {
    removeStyleByQuery(".global-footer-compact", "display");
  }
};

// END RIGHT PANE

// MESSAGING OVERLAY
var hideFloatingMessaging = function hideFloatingMessaging() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".msg-overlay-list-bubble", "display", "flex");
  } else {
    removeStyleByQuery(".msg-overlay-list-bubble", "display");
  }
};
// END MESSAGING OVERLAY

// FEED

var hideFeedSorter = function hideFeedSorter() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery("div:has(> button > hr.feed-index-sort-border)", "display", "block");
  } else {
    removeStyleByQuery("div:has(> button > hr.feed-index-sort-border)", "display");
  }
};
var hideFeedAds = function hideFeedAds() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var nodes = document.querySelectorAll(".update-components-actor");
  nodes.forEach(function (node) {
    if (node.textContent.includes("Promoted")) {
      if (!toApply) {
        removeStyle(node.parentElement, "display");
      } else {
        addStyle(node.parentElement, "display", "none");
      }
    }
  });
};
var hideFeedPostContext = function hideFeedPostContext(toApply) {
  if (!toApply) {
    addStyleByQuery(".update-components-header", "display", "block");
  } else {
    removeStyleByQuery(".update-components-header", "display");
  }
};
var hideFeedPostAuthorBio = function hideFeedPostAuthorBio() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".update-components-actor__description", "display", "block");
  } else {
    removeStyleByQuery(".update-components-actor__description", "display");
  }
};
var hideFeedPostTime = function hideFeedPostTime() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    removeStyleByQuery(".update-components-actor__sub-description", "display");
  } else {
    addStyleByQuery(".update-components-actor__sub-description", "display", "none");
  }
};
var hideFeedFollowButton = function hideFeedFollowButton() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery(".update-components-actor__follow-button", "display", "block");
  } else {
    removeStyleByQuery(".update-components-actor__follow-button", "display");
  }
};
var hideFeedJobsCarousel = function hideFeedJobsCarousel() {
  var toApply = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!toApply) {
    addStyleByQuery("div:has(>div[data-id] .update-components-carousel--jobs)", "display", "block");
  } else {
    removeStyleByQuery("div:has(>div[data-id] .update-components-carousel--jobs)", "display");
  }
};

// END FEED

window.handlers = (_window$handlers = {
  "nav:simplify": simplifyNavbar,
  "nav:brand:replace": replaceNavBrand,
  "nav:dots:hide": hideDots,
  "nav:labels:hide": hideNavLabels,
  "nav:home:hide": hideNavLink("Home"),
  "nav:my_network:hide": hideNavLink("My Network"),
  "nav:jobs:hide": hideNavLink("Jobs"),
  "nav:messaging:hide": hideNavLink("Messaging"),
  "nav:notifications:hide": hideNavLink("Notifications"),
  "nav:work:hide": hideNavLink("Work")
}, _defineProperty(_window$handlers, "nav:labels:hide", hideNavLabels), _defineProperty(_window$handlers, "nav:home:hide", hideNavLink("Home")), _defineProperty(_window$handlers, "nav:my_network:hide", hideNavLink("My Network")), _defineProperty(_window$handlers, "nav:jobs:hide", hideNavLink("Jobs")), _defineProperty(_window$handlers, "nav:messaging:hide", hideNavLink("Messaging")), _defineProperty(_window$handlers, "nav:notifications:hide", hideNavLink("Notifications")), _defineProperty(_window$handlers, "nav:work:hide", hideNavLink("Work")), _defineProperty(_window$handlers, "nav:recruiter:hide", hideNavLink("Recruiter")), _defineProperty(_window$handlers, "nav:advertise:hide", hideNavLink("Advertise")), _defineProperty(_window$handlers, "floating_messaging:hide", hideFloatingMessaging), _defineProperty(_window$handlers, "floating_messaging:hide", hideFloatingMessaging), _defineProperty(_window$handlers, "left_pane:hide", hideLeftPane), _defineProperty(_window$handlers, "left_pane:profile:hide", hideLeftPaneProfile), _defineProperty(_window$handlers, "left_pane:pages:hide", hideLeftPanePages), _defineProperty(_window$handlers, "left_pane:extras:hide", hideLeftPaneExtras), _defineProperty(_window$handlers, "right_pane:hide", hideRightPane), _defineProperty(_window$handlers, "right_pane:news:hide", hideRightPaneNews), _defineProperty(_window$handlers, "right_pane:ads:hide", hideRightPaneAds), _defineProperty(_window$handlers, "footer:hide", hideFooter), _defineProperty(_window$handlers, "feed:sorter:hide", hideFeedSorter), _defineProperty(_window$handlers, "feed:ads:hide", hideFeedAds), _defineProperty(_window$handlers, "feed:jobs:hide", hideFeedJobsCarousel), _defineProperty(_window$handlers, "feed:post_context:hide", hideFeedPostContext), _defineProperty(_window$handlers, "feed:post_author_bio:hide", hideFeedPostAuthorBio), _defineProperty(_window$handlers, "feed:post_time:hide", hideFeedPostTime), _defineProperty(_window$handlers, "feed:follow:hide", hideFeedFollowButton), _window$handlers);

/***/ }),

/***/ "./src/css/app.css":
/*!*************************!*\
  !*** ./src/css/app.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/minimal.css":
/*!*****************************!*\
  !*** ./src/css/minimal.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/chrome/js/handlers": 0,
/******/ 			"chrome/css/minimal": 0,
/******/ 			"chrome/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["chrome/css/minimal","chrome/css/app"], () => (__webpack_require__("./src/js/handlers.js")))
/******/ 	__webpack_require__.O(undefined, ["chrome/css/minimal","chrome/css/app"], () => (__webpack_require__("./src/css/app.css")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["chrome/css/minimal","chrome/css/app"], () => (__webpack_require__("./src/css/minimal.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;