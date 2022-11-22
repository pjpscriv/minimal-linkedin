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

const init = () => {
  addStyleSheets();

  setTimeout(() => {
    changeBranding();
  }, 1000);
};

init();
