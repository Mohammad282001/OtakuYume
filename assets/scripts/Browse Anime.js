// Define Anime constructor function
function Anime(id, title, synopsis, episodes, imageUrl, score) {
  this.id = id;
  this.title = title;
  this.synopsis = synopsis;
  this.episodes = episodes;
  this.imageUrl = imageUrl;
  this.score = score;
}

// Pagination
const pages = document.getElementById("pages");



// Function to fetch anime based on selected type and age rating
async function fetchAnimeAndRender(
  search = "",
  antype = "",
  ageRating = "",
) {
  try {
    console.log(
      `Fetching data: search=${search}, type=${antype}, rating=${ageRating},`
    );
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&type=${antype}&rating=${ageRating}&sfw=true`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();

    // Check for expected data structure
    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error("Unexpected data format from API.");
    }

    // Limit to first 18 results for simplicity
    const animeList = data.data.slice(0, 18);

    // Map through anime and create Anime objects
    const animeObjects = animeList.map((anime) => {
      return new Anime(
        anime.mal_id,
        anime.title,
        anime.synopsis,
        anime.episodes,
        anime.images.jpg.image_url,
        anime.score
      );
    });

    // Render anime
    renderAnime(animeObjects);
  } catch (error) {
    console.error("Error fetching or rendering anime:", error);
    // Handle error appropriately (e.g., show error message to user)
  }
}

// Function to render anime cards
function renderAnime(animeList) {
  const mainSection = document.getElementById("main-section");
  mainSection.innerHTML = ""; // Clear previous content

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.setAttribute("class", "movie-card");
    card.innerHTML = `
      <a href="Movie detiles.html?animeId=${anime.id}&uu=99">
        <img src="${anime.imageUrl}" alt="${anime.title}">
        <div>
          <h2>${anime.title}</h2>
        </a>
        <p>Episodes: ${anime.episodes}</p>
        <div class="rating">&#9733; ${anime.score} </div>
      </div>
    `;
    mainSection.appendChild(card);
  });
}

// Call fetchAnimeAndRender with the default search query when the page loads
window.onload = function () {
  fetchAnimeAndRender("", "tv", "g"); // Default search query example ('tv' and 'G - All Ages')
};

// Get references to the dropdown elements
const antypeDropdown = document.getElementById("anitype");
const ageRatingDropdown = document.getElementById("ageRating");
const searchBox = document.getElementById("searchBox");

// Add event listener for the search box input
searchBox.addEventListener("input", function () {
  const searchInput = searchBox.value;
  const selectedType = antypeDropdown.value;
  const selectedRating = ageRatingDropdown.value;
  console.log(
    `Search input: search=${searchInput}, type=${selectedType}, rating=${selectedRating}`
  );
  fetchAnimeAndRender(searchInput, selectedType, selectedRating);
});

// Add event listener for anime type dropdown change
antypeDropdown.addEventListener("change", function () {
  const searchInput = searchBox.value;
  const selectedType = antypeDropdown.value;
  const selectedRating = ageRatingDropdown.value;
  console.log(
    `Anime type changed: type=${selectedType}, rating=${selectedRating}, search=${searchInput}`
  );
  fetchAnimeAndRender(searchInput, selectedType, selectedRating);
});

// Add event listener for age rating dropdown change
ageRatingDropdown.addEventListener("change", function () {
  const searchInput = searchBox.value;
  const selectedType = antypeDropdown.value;
  const selectedRating = ageRatingDropdown.value;
  console.log(
    `Age rating changed: type=${selectedType}, rating=${selectedRating}, search=${searchInput}`
  );
  fetchAnimeAndRender(searchInput, selectedType, selectedRating);
});
