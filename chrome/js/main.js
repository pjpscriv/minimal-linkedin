(()=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n,i){return(n=function(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,n||"default");if("object"!==e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===e(n)?n:String(n)}(n))in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i,t}var n="minimalism-settings",i=function(){return chrome.storage.sync.set(t({},n,{"nav:simplify":!0,"left_pane:hide":!0,"right_pane:hide":!0,"feed:simplify":!0,"floating_messaging:hide":!0,"nav:brand:replace":!0,"nav:labels:hide":!0,"nav:home:hide":!1,"nav:my_network:hide":!1,"nav:jobs:hide":!1,"nav:messaging:hide":!1,"nav:notifications:hide":!1,"nav:work:hide":!0,"nav:recruiter:hide":!0,"nav:advertise:hide":!0,"left_pane:profile:hide":!0,"left_pane:pages:hide":!0,"left_pane:extras:hide":!0,"right_pane:news:hide":!0,"right_pane:ads:hide":!0,"footer:hide":!0,"feed:ads:hide":!0,"feed:jobs:hide":!0,"feed:post_context:hide":!0,"feed:post_author_bio:hide":!0,"feed:post_time:hide":!1,"feed:follow:hide":!0}))},r=function(e,t){var n=function(e,t){var n=Object.keys(e);return"string"==typeof t?n.filter((function(e){return e.startsWith(t)})):Array.isArray(t)?t:void 0}(e,t);n.forEach((function(t){handlers[t]&&(0,handlers[t])(e[t])}))},o=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";chrome.storage.sync.get([n],(function(n){n["minimalism-settings"]?r(n["minimalism-settings"],t):i().then((function(){return e(t)}))}))},a=function(){var e,t,n;window.addEventListener("scroll",(e=function(){return o("feed")},t=500,n=Date.now(),function(){n+t-Date.now()<=0&&(e(),n=Date.now())}))};!function(){var e,t;chrome.runtime.onMessage.addListener((function(e){"settings:updated"===e.name&&o()})),a(),e=document.querySelector("head"),(t=document.createElement("link")).rel="stylesheet",t.type="text/css",t.href=chrome.runtime.getURL("css/minimal.css"),e.appendChild(t);var n=setInterval((function(){document.getElementsByClassName("boot-complete").length<1||(o(),clearInterval(n))}),200)}()})();