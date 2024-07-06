function Anime(id, title, synopsis, episodes, imageUrl, score) {
  this.id = id;
  this.title = title;
  this.synopsis = synopsis;
  this.episodes = episodes;
  this.imageUrl = imageUrl;
  this.score = score;
}
let isTop = false;

console.log(isTop);
async function fetchAnimeAndRender(
  search = "",
  antype = "",
  ageRating = "",
  isTop,
  page = ""
) {
  let top = isTop ? "/top" : "";
  try {
    console.log(
      `Fetching data: search=${search}, type=${antype}, rating=${ageRating} isTop=${top} `
    );
    const response = await fetch(
      `https://api.jikan.moe/v4${top}/anime?q=${search}&type=${antype}&rating=${ageRating}&page=${
        page || 1
      }`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error("Unexpected data format from API.");
    }
    const animeList = data.data.slice(0, 20);
    const animeObjects = animeList.map(
      (anime) =>
        new Anime(
          anime.mal_id,
          anime.title,
          anime.synopsis,
          anime.episodes,
          anime.images.jpg.image_url,
          anime.score
        )
    );
    renderAnime(animeObjects);
  } catch (error) {
    console.error("Error fetching or rendering anime:", error);
  }
}

function renderAnime(animeList) {
  const innerContainer = document.getElementById("container-inner");
  innerContainer.innerHTML = "";
  animeList.forEach((anime) => {
    const cardParent = document.createElement("div");
    const card = document.createElement("div");
    cardParent.className = "col";
    card.className = "card";

    card.innerHTML = `
      <a href="Movie detiles.html?animeId=${anime.id}&uu=99">
        <img src="${anime.imageUrl}" class="card-img-top" alt="..." style="max-height:20rem">
      </a>
      <div class="card-body" style="background-color:rgb(33, 37, 41); height:10rem;">
        <p class="card-text-title" style="color:#ffffff;">${anime.title}</p>
        <p class="card-text" style="color:#ffffff;">Episodes: ${anime.episodes}</p>
        <p class="card-text1" style="color:#ffffff;">&#9733; ${anime.score}</p>
      </div>
    `;
    cardParent.appendChild(card);
    innerContainer.appendChild(cardParent);
  });
}

const antypeDropdown = document.getElementById("anitype");
const ageRatingDropdown = document.getElementById("ageRating");
const searchBox = document.getElementById("searchBox");
const sortByDropdown = document.getElementById("sortBy");
const pagination = document.getElementById("pages");

searchBox.addEventListener("input", handleSearch);
antypeDropdown.addEventListener("change", handleDropdownChange);
ageRatingDropdown.addEventListener("change", handleDropdownChange);
sortByDropdown.addEventListener("change", handleDropdownChange);
pagination.addEventListener("click", handleClickChange);

function handleSearch() {
  const searchInput = searchBox.value;
  const selectedType = antypeDropdown.value;
  const selectedRating = ageRatingDropdown.value;
  const selectedSort = sortByDropdown.value;
  if (selectedSort == "true") isTop = true;
  else isTop = false;
  fetchAnimeAndRender(searchInput, selectedType, selectedRating, selectedSort);
}
function handleDropdownChange() {
  const searchInput = searchBox.value;
  const selectedType = antypeDropdown.value;
  const selectedRating = ageRatingDropdown.value;
  const selectedSort = sortByDropdown.value;
  if (selectedSort == "true") isTop = true;
  else isTop = false;
  fetchAnimeAndRender(searchInput, selectedType, selectedRating, selectedSort);
}
function handleClickChange(event) {
  const searchInput = searchBox.value;
  const selectedType = antypeDropdown.value;
  const selectedRating = ageRatingDropdown.value;
  const selectedSort = sortByDropdown.value;
  if (event.target.tagName === "BUTTON") {
    var pageNum = event.target.innerHTML;
    console.log(pageNum);
  }
  if (selectedSort == "true") isTop = true;
  else isTop = false;
  fetchAnimeAndRender(
    searchInput,
    selectedType,
    selectedRating,
    isTop,
    pageNum
  );
}
window.onload = function () {
  fetchAnimeAndRender("", "tv", "g", "", "");
};
