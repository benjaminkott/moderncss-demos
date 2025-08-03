const lazyCompatTable = document.querySelector('lazy-compat-table');
const component = lazyCompatTable.shadowRoot.querySelector('compat-table');
const browsers = [
    "chrome",
    "edge",
    "firefox",
    "opera",
    "safari",
    "chrome_android",
    "firefox_android",
    "opera_android",
    "safari_ios"
];

component.browsers = browsers;
component._browsers = browsers;
component.requestUpdate();

const shadowRoot = component.shadowRoot;
shadowRoot.querySelectorAll('.bc-head-txt-label, .bc-on-github, .bc-legend').forEach(el => el.remove());

const sheet = new CSSStyleSheet();
sheet.replaceSync(`.icon { margin: .5rem; }`);
component.shadowRoot.adoptedStyleSheets = [
  ...component.shadowRoot.adoptedStyleSheets,
  sheet,
];
