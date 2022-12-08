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
const addLogoToNavbar = (nav) => {
  const logo = nav.getElementsByClassName("__ML-logo")[0];
  logo.src = chrome.runtime.getURL("images/icon.svg");
};

const addIconsToNavMenu = (nav) => {
  const items = ["home", "network", "jobs", "messages", "notifications"];
  items.forEach((item) => {
    const link = nav.getElementsByClassName(`__ML-nav-${item}`)[0];
    const icon = link.getElementsByTagName("img")[0];
    icon.src = chrome.runtime.getURL(`images/nav-${item}.svg`);
  });
};

const setActiveNavItem = (nav) => {
  const pathname = window.location.pathname;

  const pathToNav = [
    ["/feed/", "home"],
    ["/mynetwork/", "network"],
    ["/jobs/", "jobs"],
    ["/messaging/", "messages"],
    ["/notifications/", "notifications"],
  ];

  pathToNav.forEach((path) => {
    if (!pathname.startsWith(path[0])) return;

    const link = nav.getElementsByClassName(`__ML-nav-${path[1]}`)[0];
    link.classList.add("__ML-nav-active");
  });
};

const setPendingDotToNavItems = (nav) => {
  const labelToNav = [
    ["Home", "home"],
    ["My Network", "network"],
    ["Jobs", "jobs"],
    ["Messaging", "messages"],
    ["Notifications", "notifications"],
  ];

  labelToNav.forEach((label) => {
    const original = document.querySelector(
      `span.global-nav__primary-link-text[title="${label[0]}"]`
    );

    if (
      original.previousElementSibling.getElementsByClassName(
        "notification-badge--show"
      ).length > 0
    ) {
      const link = nav.getElementsByClassName(`__ML-nav-${label[1]}`)[0];
      link.classList.add("__ML-nav-haspending");
    }
  });
};

const addSearchbarToNav = (nav) => {
  const theirs = document.getElementById("global-nav-search");
  if (!theirs) {
    return;
  }

  const ours = nav.getElementsByClassName("__ML-nav-search")[0];
  ours.insertBefore(theirs, null);
};

const addUserMenutoNavbar = (nav) => {
  const originalUserMenu = document.getElementsByClassName("global-nav__me")[0];
  if (!originalUserMenu) {
    return;
  }

  //   const originalUserMenuCloned = originalUserMenu.cloneNode(true);
  //   originalUserMenuCloned.addEventListener('click', originalUserMenu.onclick)

  const originalUserMenuLabel = originalUserMenu.getElementsByClassName(
    "global-nav__primary-link-text"
  )[0];
  if (!originalUserMenuLabel) {
    return;
  }

  // Remove the text "Me"
  let menuLabelChild = originalUserMenuLabel.firstChild;
  while (menuLabelChild) {
    let nextChild = menuLabelChild.nextSibling;
    if (menuLabelChild.nodeType == 3) {
      originalUserMenuLabel.removeChild(menuLabelChild);
    }
    menuLabelChild = nextChild;
  }
  const newUserMenuContainer = nav.getElementsByClassName("__ML-nav-user")[0];
  newUserMenuContainer.insertBefore(originalUserMenu, null);
};

const prepareNavbar = (html) => {
  const nav = document.createElement("header");
  nav.innerHTML = html;

  addLogoToNavbar(nav);
  addIconsToNavMenu(nav);
  setActiveNavItem(nav);
  setPendingDotToNavItems(nav);
  // addSearchbarToNav(nav);
  // addUserMenutoNavbar(nav);

  return nav;
};

const addSimpleNavbar = () => {
  //   already exists
  if (document.querySelectorAll("header:has(> .__ML-nav)").length > 0) return;

  fetch(chrome.runtime.getURL("partials/nav.html"))
    .then((response) => response.text())
    .then((html) => {
      const preparedNav = prepareNavbar(html);
      let nav = document.getElementById("global-nav");
      // nav.parentNode.replaceChild(preparedNav, nav);
      nav.parentNode.insertBefore(preparedNav, nav);
    });
};

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
    if (!logo.classList.contains("__ML-logo-original")) {
      logo.remove();
    } else {
      removeStyle(logo, "display");
    }
  });
};

const simplifyNavbar = (toApply = true) => {
  if (!toApply) {
    replaceNavbarLogoToOld();
    addStyleByQuery(".global-nav__a11y-menu", "display", "flex");
    addStyleByQuery(".global-nav", "display", "block");
    // addStyleByQuery(".__ML-nav", "display", "none");

    addStyleByQuery(".global-nav nav li", "display", "block");
    addStyleByQuery("span.global-nav__primary-link-text", "display", "flex");
  } else {
    // addSimpleNavbar();
    // removeStyleByQuery(".__ML-nav", "display");
    replaceNavbarLogoToNew();
    removeStyleByQuery(".global-nav__a11y-menu", "display");
    removeStyleByQuery(".global-nav", "display");

    removeStyleByQuery(".global-nav nav li", "display");
    removeStyleByQuery("span.global-nav__primary-link-text", "display");
  }
};

const hideNavLabels = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery("span.global-nav__primary-link-text", "display", "block");
  } else {
    removeStyleByQuery("span.global-nav__primary-link-text", "display");
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
    addStyleByQuery("#msg-overlay", "display", "flex");
  } else {
    removeStyleByQuery("#msg-overlay", "display");
  }
};
// END MESSAGING OVERLAY

// FEED

const hideFeedAds = (toApply = true) => {
  const nodes = document.querySelectorAll(".update-components-actor");

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

const simplifyFeedPostAuthor = (toApply) => {
  if (!toApply) {
    addStyleByQuery(".update-components-actor__meta", "display", "block");
    addStyleByQuery(
      ".update-components-actor__description",
      "display",
      "block"
    );
    addStyleByQuery(
      ".update-components-actor__sub-description",
      "display",
      "block"
    );
  } else {
    removeStyleByQuery(".update-components-actor__meta", "display");
    removeStyleByQuery(".update-components-actor__description", "display");
    removeStyleByQuery(".update-components-actor__sub-description", "display");
  }
};

// END FEED

window.handlers = {
  "nav:simplify": simplifyNavbar,
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

  "feed:ads:hide": hideFeedAds,
  "feed:post_context:hide": hideFeedPostContext,
  "feed:post_author:simplify": simplifyFeedPostAuthor,
};
