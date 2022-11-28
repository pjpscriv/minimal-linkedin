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
                key: "nav:simplify",
                icon: "config/nav.svg",
                name: "Simplify Navigation",
                default: true,
              },
              {
                key: "left_pane:hide",
                icon: "config/left-pane.svg",
                name: "Hide Left Pane",
                default: true,
              },
              {
                key: "right_pane:hide",
                icon: "config/right-pane.svg",
                name: "Hide Right Pane",
                default: true,
              },
              // {
              //   key: "feed:simplify",
              //   icon: "config/feed.svg",
              //   name: "Simplify Feed",
              //   default: true,
              // },
              {
                key: "floating_messaging:hide",
                icon: "config/messages.svg",
                name: "Hide Floating Messaging",
                default: true,
              },
              // {
              //   key: "notification_dots:hide",
              //   icon: "config/notifications.svg",
              //   name: "Hide Notification Dots",
              //   description:
              //     "Removes the red dots if you have unread notifications",
              //   default: true,
              // },
            ],
          },
          {
            name: "Left Pane",
            collapsible: true,
            is_collapsed: true,
            options: [
              {
                key: "left_pane:profile:hide",
                icon: "config/person.svg",
                name: "Hide Profile Card",
                default: true,
              },
              {
                key: "left_pane:pages:hide",
                icon: "config/company.svg",
                name: "Hide Pages",
                default: true,
              },
              {
                key: "left_pane:extras:hide",
                icon: "config/community.svg",
                name: "Hide Extras",
                description: "Hide Recents, Groups, Events, and other stuff.",
                default: true,
              },
            ],
          },
          {
            name: "Right Pane",
            collapsible: true,
            is_collapsed: true,
            options: [
              {
                key: "right_pane:news:hide",
                icon: "config/news.svg",
                name: "Hide News",
                default: true,
              },
              {
                key: "right_pane:ads:hide",
                icon: "config/ads.svg",
                name: "Hide Ads",
                default: true,
              },
              {
                key: "footer:hide",
                icon: "config/footer.svg",
                name: "Hide Footer",
                default: true,
              },
            ],
          },
        ],
      },

      init: function () {
        this.loadSettings();

        this.$watch("settings", this.onSettingsChange);
      },

      loadSettings: function () {
        window.addEventListener(
          "message",
          (event) => {
            const payload = JSON.parse(event.data);
            if (!payload) return;

            if (payload.name === "settings:loaded") {
              this.settings = payload.value;
              this.fillDefaultSettings();
              this.onSettingsChange(this.settings);
            }
          },
          false
        );
      },

      fillDefaultSettings: function () {
        this.config.groups.forEach((group) => {
          group.options.forEach((option) => {
            if (this.settings[option.key] === undefined) {
              this.settings[option.key] = option.default;
            }
          });
        });
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
