const linksSidebar = [
  { nameSidebar: "MENU", noHover: true },
  { nameSidebar: "Discovery", url: "/index.html", iconSidebar: "fab fa-cc-discover" },
  { nameSidebar: "Top Rated", url: "/pages/topratedpage.html", iconSidebar: "far fa-star" },
  { nameSidebar: "Coming Soon", url: "#", iconSidebar: "fas fa-stopwatch" },
  {
    nameSidebar: "Dark Mode",
    url: "#",
    iconSidebar: "fas fa-moon",
    id: "dark-mode-link",
  },
  { nameSidebar: "Setting", url: "#", iconSidebar: "fas fa-cog" },
  { nameSidebar: "About us", url: "#", iconSidebar: "fas fa-address-card" },
];

const sidebar = document.getElementById("sidebar");
const ulSidebar = document.createElement("ul");

linksSidebar.forEach((link) => {
  const liSidebar = document.createElement("li");
  const a = document.createElement("a");

  if (link.iconSidebar) {
    const i = document.createElement("i");
    i.classList.add(...link.iconSidebar.split(" "));
    a.appendChild(i);
  }

  a.href = link.url || "#";
  a.classList.add("sidebar-link");

  if (link.noHover) {
    a.classList.add("menu");
  }

  if (link.id) {
    a.id = link.id;
  }

  if (link.nameSidebar === "Dark Mode") {
    const darkModeToggle = document.createElement("div");
    darkModeToggle.classList.add("dark-mode-toggle");
    darkModeToggle.addEventListener("click", toggleDarkMode);
    a.appendChild(darkModeToggle);
    const toggleButton = document.createElement("div");
    toggleButton.classList.add("toggle-button");
    darkModeToggle.appendChild(toggleButton);
  }

  a.insertAdjacentHTML(
    "beforeend",
    `<span class="link-text">${link.nameSidebar}</span>`
  );
  liSidebar.appendChild(a);
  ulSidebar.appendChild(liSidebar);
});

sidebar.appendChild(ulSidebar);

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  darkModeToggle.classList.toggle("on");
}
