// Define Anime constructor function
function Anime(id, title, synopsis, episodes, imageUrl, score) {
  this.id = id;
  this.title = title;
  this.synopsis = synopsis;
  this.episodes = episodes;
  this.imageUrl = imageUrl;
  this.score = score;
}

// pagenation
const pages = document.getElementById("pages");

pages.addEventListener("click", (event) => {
  const pageNumber = event.target.innerHTML; // 1, 2, 3

  //
  console.log(pageNumber);
  fetchAnimeAndRender("", "", pageNumber);
});
// Function to fetch anime based on selected type and age rating
async function fetchAnimeAndRender(antype, ageRating, page) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?type=${antype}&rating=${ageRating}&page=${
        page || 1
      }`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();

    // Check for expected data structure
    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error("Unexpected data format from API.");
    }

    // Limit to first 20 results for simplicity
    const animeList = data.data.slice(0, 20);

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
      <img src="${anime.imageUrl}" alt="${anime.title}">
      <div>
        <h2>${anime.title}</h2>
        <p>Episodes: ${anime.episodes}</p>
        <div class="rating">&#9733; ${anime.score} </div>
      </div>
    `;
    mainSection.appendChild(card);
  });
}

// Call fetchAnimeAndRender with the default search query when the page loads
window.onload = function () {
  fetchAnimeAndRender("tv", "g"); // Default search query example ('tv' and 'G - All Ages')
};

// Get references to the dropdown elements
const antypeDropdown = document.getElementById("anitype");
const ageRatingDropdown = document.getElementById("ageRating");

// Add event listener for anime type dropdown change
antypeDropdown.addEventListener("change", function () {
  const selectedType = antypeDropdown.value;
  const selectedRating = ageRatingDropdown.value;
  fetchAnimeAndRender(selectedType, selectedRating);
});

// Add event listener for age rating dropdown change
ageRatingDropdown.addEventListener("change", function () {
  const selectedType = antypeDropdown.value;
  const selectedRating = ageRatingDropdown.value;
  fetchAnimeAndRender(selectedType, selectedRating);
});
