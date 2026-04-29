// Test to see if js file linked
console.log("IT’S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Adding nav bar through js
const BASE_PATH =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/" // Local server
    : "/website/"; // GitHub Pages repo name

let pages = [
  { url: "", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "CV/", title: "CV" },
  { url: "Contact", title: "Contact" },
];

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  url = !url.startsWith("http") ? BASE_PATH + url : url;

  nav.insertAdjacentHTML(
    "beforeend",
    `<a class="nav-item" href="${url}">${title}</a>`,
  );
}

// Handling current link for nav bar
let navLinks = $$("nav a");

let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname,
);
currentLink?.classList.add("current");

// Dark mode
document.body.insertAdjacentHTML(
  "afterbegin",
  `
	<label class="color-scheme">
		Theme:
		<select class="theme-select" aria-label="Theme selector">
			<option value='auto'>Auto</option>
      <option value='light'>Light</option>
      <option value='dark'>Dark</option>
		</select>
	</label>`,
);

const THEME_KEY = "themePreference";
const themeSelect = document.querySelector(".theme-select");

function applyTheme(theme) {
  const normalizedTheme = ["auto", "light", "dark"].includes(theme)
    ? theme
    : "auto";

  document.documentElement.dataset.theme = normalizedTheme;
  localStorage.setItem(THEME_KEY, normalizedTheme);
}

const savedTheme = localStorage.getItem(THEME_KEY) || "auto";
themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener("change", (event) => {
  applyTheme(event.target.value);
});

// Display GitHub stats
export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
  } catch (error) {
    console.error("Error fetching or parsing JSON data:", error);
  }
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
