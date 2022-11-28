// HELPERS
const addStyleByQuery = (query, property, value) => {
  if (!query || !property || !value) return;

  const nodes = document.querySelectorAll(query);
  nodes.forEach((node) => {
    node.style.setProperty(property, value, "important");
  });
};

const removeStyleByQuery = (query, property) => {
  if (!query || !property) return;

  const nodes = document.querySelectorAll(query);
  nodes.forEach((node) => {
    node.style.removeProperty(property);
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

const addUserMenutoNavbar = (nav) => {
  const originalUserMenu = document.getElementsByClassName("global-nav__me")[0];
  if (!originalUserMenu) {
    return;
  }

  const originalUserMenuLabel = originalUserMenu.getElementsByClassName(
    "global-nav__primary-link-text"
  )[0];
  if (!originalUserMenuLabel) {
    return;
  }

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
  addUserMenutoNavbar(nav);

  return nav;
};

const simplifyNavbar = (toApply = true) => {
  if (!toApply) {
    addStyleByQuery(".__ML-nav", "display", "none");
    addStyleByQuery(".global-nav__a11y-menu", "display", "flex");
    addStyleByQuery(".global-nav", "display", "block");
  } else {
    removeStyleByQuery(".global-nav__a11y-menu", "display");
    removeStyleByQuery(".global-nav", "display");

    fetch(chrome.runtime.getURL("src/pages/nav.html"))
      .then((response) => response.text())
      .then((html) => {
        const preparedNav = prepareNavbar(html);
        let nav = document.getElementById("global-nav");
        //   nav.parentNode.replaceChild(preparedNav, nav);
        nav.parentNode.insertBefore(preparedNav, nav);
      });
  }
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

window.handlers = {
  "nav:simplify": simplifyNavbar,
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
};
