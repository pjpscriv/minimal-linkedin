/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
var PERSISTED_KEY_SETTINGS = "minimalism-settings";
var init = function init() {
  Alpine.data("minimalism", function () {
    return {
      settings: {},
      config: {
        groups: [{
          name: "Overall",
          collapsible: false,
          options: [{
            key: "nav:simplify",
            icon: "config/nav.svg",
            name: "Simplify Navigation",
            "default": true
          }, {
            key: "left_pane:hide",
            icon: "config/left-pane.svg",
            name: "Hide Left Pane",
            "default": true
          }, {
            key: "right_pane:hide",
            icon: "config/right-pane.svg",
            name: "Hide Right Pane",
            "default": true
          }, {
            key: "feed:simplify",
            icon: "config/feed.svg",
            name: "Simplify Feed",
            "default": true
          }, {
            key: "floating_messaging:hide",
            icon: "config/messages.svg",
            name: "Hide Floating Messaging",
            "default": true
          }]
        }, {
          name: "Navigation",
          collapsible: true,
          is_collapsed: true,
          options: [{
            key: "nav:labels:hide",
            icon: "config/label.svg",
            name: "Hide Labels",
            "default": false
          }, {
            key: "nav:home:hide",
            icon: "nav-home.svg",
            name: "Hide \"Home\"",
            "default": false
          }, {
            key: "nav:my_network:hide",
            icon: "nav-network.svg",
            name: "Hide \"My Network\"",
            "default": false
          }, {
            key: "nav:jobs:hide",
            icon: "nav-jobs.svg",
            name: "Hide \"Jobs\"",
            "default": false
          }, {
            key: "nav:messaging:hide",
            icon: "nav-messages.svg",
            name: "Hide \"Messaging\"",
            "default": false
          }, {
            key: "nav:notifications:hide",
            icon: "nav-notifications.svg",
            name: "Hide \"Notifications\"",
            "default": false
          }]
        }, {
          name: "Left Pane",
          collapsible: true,
          is_collapsed: true,
          options: [{
            key: "left_pane:profile:hide",
            icon: "config/person.svg",
            name: "Hide Profile Card",
            "default": true
          }, {
            key: "left_pane:pages:hide",
            icon: "config/company.svg",
            name: "Hide Pages",
            "default": true
          }, {
            key: "left_pane:extras:hide",
            icon: "config/community.svg",
            name: "Hide Extras",
            description: "Hide Recents, Groups, Events, and other stuff.",
            "default": true
          }]
        }, {
          name: "Right Pane",
          collapsible: true,
          is_collapsed: true,
          options: [{
            key: "right_pane:news:hide",
            icon: "config/news.svg",
            name: "Hide News",
            "default": true
          }, {
            key: "right_pane:ads:hide",
            icon: "config/ads.svg",
            name: "Hide Ads",
            "default": true
          }, {
            key: "footer:hide",
            icon: "config/footer.svg",
            name: "Hide Footer",
            "default": true
          }]
        }, {
          name: "Feed",
          collapsible: true,
          is_collapsed: true,
          options: [{
            key: "feed:ads:hide",
            icon: "config/ads.svg",
            name: "Hide Promoted Posts",
            "default": true
          }, {
            key: "feed:post_context:hide",
            icon: "config/description.svg",
            name: "Hide Post Context",
            description: "Hide 'Your friend likes this' above posts.",
            "default": true
          }, {
            key: "feed:post_author:simplify",
            icon: "config/person.svg",
            name: "Simplify Post's Author",
            description: "Hides the author's bio and post's timestamp.",
            "default": true
          }]
        }]
      },
      init: function init() {
        this.loadSettings();
        this.$watch("settings", this.onSettingsChange.bind(this));
      },
      loadSettings: function loadSettings() {
        var _this = this;
        window.addEventListener("message", function (event) {
          var payload = JSON.parse(event.data);
          if (!payload) return;
          if (payload.name === "settings:loaded") {
            _this.settings = payload.value;
            _this.fillDefaultSettings();
            _this.onSettingsChange(_this.settings);
          }
        }, false);
      },
      fillDefaultSettings: function fillDefaultSettings() {
        var _this2 = this;
        this.config.groups.forEach(function (group) {
          group.options.forEach(function (option) {
            if (_this2.settings[option.key] === undefined) {
              _this2.settings[option.key] = option["default"];
            }
          });
        });
      },
      adjustDependableSettings: function adjustDependableSettings(key) {
        var _this3 = this;
        var dependencies = {
          "left_pane:hide": ["left_pane:profile:hide", "left_pane:pages:hide", "left_pane:extras:hide"],
          "right_pane:hide": ["right_pane:news:hide", "right_pane:ads:hide", "footer:hide"],
          "feed:simplify": ["feed:ads:hide", "feed:post_context:hide", "feed:post_author:simplify"]
        };

        // 1. When parent is toggled, all children must behave like parent
        // 2. If any one children is OFF, parent has to be OFF

        Object.keys(dependencies).forEach(function (depended) {
          // if toggled setting is a parent
          if (depended === key) {
            // toggle children to be all to be same as parent
            dependencies[depended].forEach(function (depending) {
              _this3.settings[depending] = _this3.settings[key];
            });
          }

          // else if toggled setting is a child of this parent
          else if (dependencies[depended].indexOf(key) !== -1) {
            // if any children is OFF, turn parent OFF
            if (!_this3.settings[key]) {
              _this3.settings[depended] = false;
            }
          }
        });
      },
      onSettingsChange: function onSettingsChange(value, oldValue) {
        if (!value) return;
        this.adjustDependableSettings(value, oldValue);
        var payload = {
          name: "settings:updated",
          value: value
        };
        window.parent.postMessage(JSON.stringify(payload), "*");
      },
      isOn: function isOn(key) {
        return !!this.settings[key];
      },
      toggle: function toggle(key) {
        this.settings[key] = !this.settings[key];
        this.adjustDependableSettings(key);
      }
    };
  });
};
document.addEventListener("alpine:init", init);
/******/ })()
;