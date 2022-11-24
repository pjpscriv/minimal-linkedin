const addStyleSheets = () => {
  const head = document.querySelector("head");
  const mainStylesheet = document.createElement("link");
  mainStylesheet.rel = "stylesheet";
  mainStylesheet.type = "text/css";
  mainStylesheet.href = chrome.runtime.getURL("src/css/minimal.css");
  head.appendChild(mainStylesheet);
};

const changeBranding = () => {
  const brandingContainer = document.getElementsByClassName(
    "global-nav__branding-logo"
  )[0];
  const brandingIcon = brandingContainer.getElementsByTagName("li-icon")[0];

  fetch(chrome.runtime.getURL("images/icon.svg"))
    .then((response) => response.text())
    .then((svg) => {
      brandingIcon.innerHTML = svg;
    });
};

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
    console.log("user menu not found");
    return;
  }

  const originalUserMenuLabel = originalUserMenu.getElementsByClassName(
    "global-nav__primary-link-text"
  )[0];
  if (!originalUserMenuLabel) {
    console.log("user menu label not found");
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

const replaceNavbar = () => {
  fetch(chrome.runtime.getURL("src/pages/nav.html"))
    .then((response) => response.text())
    .then((html) => {
      const preparedNav = prepareNavbar(html);
      let nav = document.getElementById("global-nav");
      //   nav.parentNode.replaceChild(preparedNav, nav);
      nav.parentNode.insertBefore(preparedNav, nav);
    });
};

const init = () => {
  addStyleSheets();

  const booted = setInterval(() => {
    // this class gets applied to body when the boot is completed
    if (document.getElementsByClassName("boot-complete").length < 1) return;

    // Replace Navbar
    replaceNavbar();

    clearInterval(booted);
  }, 100);

  //   setTimeout(() => {
  //     changeBranding();
  //   }, 1000);
};

init();
