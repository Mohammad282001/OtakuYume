const linksSidebar = [
  { nameSidebar: "MENU", noHover: true },
  { nameSidebar: "Home", url: "/index.html", iconSidebar: "fas fa-home" },

  {
    nameSidebar: "Browse Anime",
    url: "/pages/Browse Anime.html",
    iconSidebar: "fas fa-filter",
  },
  {
    nameSidebar: "Top Rated",
    url: "/pages/topratedpage.html",
    iconSidebar: "far fa-star",
  },
  {
    nameSidebar: "About us",
    url: "/pages/aboutUs.html",
    iconSidebar: "fas fa-address-card",
    id: "About",
  },

  {
    nameSidebar: "Contact us",
    url: "/pages/contactUs.html",
    iconSidebar: "fas fa-envelope",
  },

  { nameSidebar: "Setting", url: "/pages/profile.html", iconSidebar: "fas fa-cog" },
  {
    nameSidebar: "Log out",
    url: "/index.html",
    iconSidebar: "fas fa-sign-out-alt",
    id: "logouttest"
  },
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

  a.insertAdjacentHTML(
    "beforeend",
    `<span class="link-text">${link.nameSidebar}</span>`
  );
  liSidebar.appendChild(a);
  ulSidebar.appendChild(liSidebar);
});

sidebar.appendChild(ulSidebar);


const logoutButton = document.getElementById("logouttest");

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("userID");
  signOut(auth)
    .then(() => {
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});