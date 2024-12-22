// HELPERS
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstElementChild;
}

const addStyle = (node, property, value) => {
  node.style.setProperty(property, value, "important");
};

const removeStyle = (node, property) => {
  node.style.removeProperty(property);
};

const addStyleByQuery = (query, property, value) => {
  if (!query || !property || !value) return;

  const nodes = document.querySelectorAll(query);
  nodes.forEach((node) => {
    addStyle(node, property, value);
  });
};

const removeStyleByQuery = (query, property) => {
  if (!query || !property) return;

  const nodes = document.querySelectorAll(query);
  nodes.forEach((node) => {
    removeStyle(node, property);
  });
};

// END HELPERS

// NAVIGATION
const replaceNavbarLogoToNew = () => {
  // if already exists
  if (document.getElementsByClassName("__ML-logo-new").length > 0) return;

  fetch(chrome.runtime.getURL("images/icon.svg"))
    .then((response) => response.text())
    .then((svg) => {
      let logoContainer = document.querySelector(
        ".global-nav__branding-logo li-icon[type=app-linkedin-bug-color-icon]"
      );
      let original = logoContainer.querySelector("svg");
      original.classList.add("__ML-logo-original");
      addStyle(original, "display", "none");

      let newLogo = htmlToElement(svg);
      newLogo.classList.add("__ML-logo-new");
      logoContainer.append(newLogo);
    });
};

const replaceNavbarLogoToOld = () => {
  let logoContainer = document.querySelector(
    ".global-nav__branding-logo li-icon[type=app-linkedin-bug-color-icon]"
  );
  let logos = logoContainer.querySelectorAll("svg");

  logos.forEach((logo) => {
    if (logo.classList.contains("__ML-logo-new")) {
      logo.remove();
    } else {
      removeStyle(logo, "display");
    }
  });
};

const replaceNavBrand = (toApply = true) => {
  if (!toApply) {
    replaceNavbarLogoToOld();
  } else {
    replaceNavbarLogoToNew();
  }
};

const simplifyNavbar = (toApply = true) => {
  // nothing to do as everything is handled by dependant configs
};

const hideNavLabels = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery("span.global-nav__primary-link-text", "display", "block");
  } else {
    removeStyleByQuery("span.global-nav__primary-link-text", "display");
  }
};

const hideDots = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(".notification-badge--show", "opacity", "1");
  } else {
    addStyleByQuery(".notification-badge--show", "opacity", "0");
  }
};

const hideNavLink = (label) => {
  const query = `.global-nav nav li:has(span.global-nav__primary-link-text[title="${label}"])`;
  return (toApply = true) => {
    if (!toApply) {
      removeStyleByQuery(query, "display");
    } else {
      addStyleByQuery(query, "display", "none");
    }
  };
};
// END NAVIGATION

// LEFT PANE
const hideLeftPane = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(".scaffold-layout__sidebar", "display", "block");
  } else {
    removeStyleByQuery(".scaffold-layout__sidebar", "display");
  }
};

const hideLeftPaneProfile = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(".feed-identity-module", "display", "block");
  } else {
    removeStyleByQuery(".feed-identity-module", "display");
  }
};

const hideLeftPanePages = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(
      ".org-organization-admin-pages-entrypoint-card__card",
      "display",
      "block"
    );
  } else {
    removeStyleByQuery(
      ".org-organization-admin-pages-entrypoint-card__card",
      "display"
    );
  }
};
const hideLeftPaneExtras = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(".community-panel", "display", "block");
  } else {
    removeStyleByQuery(".community-panel", "display");
  }
};

// END LEFT PANE

// RIGHT PANE
const hideRightPane = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery("aside.scaffold-layout__aside", "display", "block");
  } else {
    removeStyleByQuery("aside.scaffold-layout__aside", "display");
  }
};

const hideRightPaneNews = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery("section:has(.news-module)", "display", "block");
  } else {
    removeStyleByQuery("section:has(.news-module)", "display");
  }
};

const hideRightPaneAds = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(".ad-banner-container", "display", "block");
  } else {
    removeStyleByQuery(".ad-banner-container", "display");
  }
};

const hideFooter = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(".global-footer-compact", "display", "block");
  } else {
    removeStyleByQuery(".global-footer-compact", "display");
  }
};

// END RIGHT PANE

// MESSAGING OVERLAY
const hideFloatingMessaging = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(".msg-overlay-list-bubble", "display", "flex");
  } else {
    removeStyleByQuery(".msg-overlay-list-bubble", "display");
  }
};
// END MESSAGING OVERLAY

// FEED

const hideFeedSorter = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(
      "div:has(> button > hr.feed-index-sort-border)",
      "display",
      "block"
    );
  } else {
    removeStyleByQuery(
      "div:has(> button > hr.feed-index-sort-border)",
      "display"
    );
  }
};

const hideFeedAds = (toApply = true) => {
  const nodes = document.querySelectorAll(".scaffold-finite-scroll__content > div");

  nodes.forEach((node) => {
    if (node.textContent.includes("Promoted")) {
      if (!toApply) {
        removeStyle(node.parentElement, "display");
      } else {
        addStyle(node.parentElement, "display", "none");
      }
    }
  });
};

const hideFeedPostContext = (toApply) => {
  if (!toApply) {
    addStyleByQuery(".update-components-header", "display", "block");
  } else {
    removeStyleByQuery(".update-components-header", "display");
  }
};

const hideFeedPostAuthorBio = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(
      ".update-components-actor__description",
      "display",
      "block"
    );
  } else {
    removeStyleByQuery(".update-components-actor__description", "display");
  }
};

const hideFeedPostTime = (toApply = true) => {
  if (!toApply) {
    removeStyleByQuery(".update-components-actor__sub-description", "display");
  } else {
    addStyleByQuery(
      ".update-components-actor__sub-description",
      "display",
      "none"
    );
  }
};

const hideFeedFollowButton = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(
      ".update-components-actor__follow-button",
      "display",
      "block"
    );
  } else {
    removeStyleByQuery(".update-components-actor__follow-button", "display");
  }
};

const hideFeedJobsCarousel = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(
      "div:has(>div[data-id] .update-components-carousel--jobs)",
      "display",
      "block"
    );
  } else {
    removeStyleByQuery(
      "div:has(>div[data-id] .update-components-carousel--jobs)",
      "display"
    );
  }
};

// END FEED

window.handlers = {
  "nav:simplify": simplifyNavbar,
  "nav:brand:replace": replaceNavBrand,
  "nav:dots:hide": hideDots,
  "nav:labels:hide": hideNavLabels,
  "nav:home:hide": hideNavLink("Home"),
  "nav:my_network:hide": hideNavLink("My Network"),
  "nav:jobs:hide": hideNavLink("Jobs"),
  "nav:messaging:hide": hideNavLink("Messaging"),
  "nav:notifications:hide": hideNavLink("Notifications"),
  "nav:work:hide": hideNavLink("Work"),

  "nav:labels:hide": hideNavLabels,
  "nav:home:hide": hideNavLink("Home"),
  "nav:my_network:hide": hideNavLink("My Network"),
  "nav:jobs:hide": hideNavLink("Jobs"),
  "nav:messaging:hide": hideNavLink("Messaging"),
  "nav:notifications:hide": hideNavLink("Notifications"),
  "nav:work:hide": hideNavLink("Work"),
  "nav:recruiter:hide": hideNavLink("Recruiter"),
  "nav:advertise:hide": hideNavLink("Advertise"),

  "floating_messaging:hide": hideFloatingMessaging,
  "floating_messaging:hide": hideFloatingMessaging,

  "left_pane:hide": hideLeftPane,
  "left_pane:profile:hide": hideLeftPaneProfile,
  "left_pane:pages:hide": hideLeftPanePages,
  "left_pane:extras:hide": hideLeftPaneExtras,

  "right_pane:hide": hideRightPane,
  "right_pane:news:hide": hideRightPaneNews,
  "right_pane:ads:hide": hideRightPaneAds,
  "footer:hide": hideFooter,

  "feed:sorter:hide": hideFeedSorter,
  "feed:ads:hide": hideFeedAds,
  "feed:jobs:hide": hideFeedJobsCarousel,
  "feed:post_context:hide": hideFeedPostContext,
  "feed:post_author_bio:hide": hideFeedPostAuthorBio,
  "feed:post_time:hide": hideFeedPostTime,
  "feed:follow:hide": hideFeedFollowButton,
};
