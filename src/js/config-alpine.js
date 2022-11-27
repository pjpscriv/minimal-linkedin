const PERSISTED_KEY_SETTINGS = "minimalism-settings";

var init = function () {
  Alpine.data("minimalism", function () {
    return {
      settings: {},
      config: {
        groups: [
          {
            name: "Overall",
            collapsible: false,
            options: [
              {
                key: "nav_simplify",
                icon: "config-nav.svg",
                name: "Simplify Navigation",
                default: true,
              },
              {
                key: "left_pane_hide",
                icon: "config-nav.svg",
                name: "Hide Left Pane",
                default: true,
              },
              {
                key: "right_pane_hide",
                icon: "config-nav.svg",
                name: "Hide Right Pane",
                default: true,
              },
              {
                key: "feed_simplify",
                icon: "config-nav.svg",
                name: "Simplify Feed",
                default: true,
              },
              {
                key: "notification_dots_hide",
                icon: "config-nav.svg",
                name: "Hide Notification Dots",
                description:
                  "Removes the red dots if you have unread notifications",
                default: true,
              },
              {
                key: "messages_tab_hide",
                icon: "config-nav.svg",
                name: "Hide Messages Tab",
                default: true,
              },
            ],
          },
          {
            name: "Left Pane",
            collapsible: true,
            is_collapsed: false,
            options: [
              {
                key: "profile_card_hide",
                icon: "config-nav.svg",
                name: "Hide Profile Card",
                default: true,
              },
              {
                key: "left_pane_hide",
                icon: "config-nav.svg",
                name: "Hide Left Pane",
                default: true,
              },
              {
                key: "right_pane_hide",
                icon: "config-nav.svg",
                name: "Hide Right Pane",
                default: true,
              },
              {
                key: "feed_simplify",
                icon: "config-nav.svg",
                name: "Simplify Feed",
                default: true,
              },
              {
                key: "notification_dots_hide",
                icon: "config-nav.svg",
                name: "Hide Notification Dots",
                description:
                  "Removes the red dots if you have unread notifications",
                default: true,
              },
              {
                key: "messages_tab_hide",
                icon: "config-nav.svg",
                name: "Hide Messages Tab",
                default: true,
              },
            ],
          },
        ],
      },
      loadedSettings: "",

      init: function () {
        this.listenToParent();

        this.config.groups.forEach((group) => {
          group.options.forEach((option) => {
            if (this.settings[option.key] === undefined) {
              this.settings[option.key] = option.default;
            }
          });
        });

        this.$watch("settings", this.onSettingsChange);
      },

      listenToParent: function () {
        window.addEventListener(
          "message",
          (event) => {
            const payload = JSON.parse(event.data);
            if (!payload) return;

            if (payload.name === "settings:loaded") {
              this.settings = payload.value;
            }
          },
          false
        );
      },

      onSettingsChange: function (value) {
        if (!value) return;

        const payload = {
          name: "settings:updated",
          value: value,
        };
        window.parent.postMessage(JSON.stringify(payload), "*");
      },

      isOn: function (key) {
        return !!this.settings[key];
      },
      toggle: function (key) {
        this.settings[key] = !this.settings[key];
      },
    };
  });
};
document.addEventListener("alpine:init", init);
