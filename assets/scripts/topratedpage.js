
// the api
function Anime(id, title, synopsis, episodes, imageUrl, score) {
  this.id = id;
  this.title = title;
  this.synopsis = synopsis;
  this.episodes = episodes;
  this.imageUrl = imageUrl;
  this.score = score;
}

async function fetchAnimeAndRender(search, page) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&page=${page || 1}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log("response", data);

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

function renderAnime(animeList) {
  console.log("jjjj", animeList);
  const mainSection = document.getElementById("main-section");
  mainSection.innerHTML = ""; // Clear previous content

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.setAttribute("class", "movie-card");
    // card.classList.add("card");
       

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

// Call fetchAnimeAndRender with a default search query when the page loads
window.onload = function () {
  fetchAnimeAndRender(""); // Default search query example ('naruto')
// pagenation
  const pages = document.getElementById("pages");
  
  pages.addEventListener("click", (event) => {
    const pageNumber = event.target.innerHTML;
    fetchAnimeAndRender("", pageNumber); 
  });
};

// the seachbar function
document.querySelector(".search-icon").addEventListener("click", function () {
  document.querySelector(".searchbar").style.display = "flex";
  document.querySelector(".search-icon").style.display = "none";
});

// searchfunctionworks

async function fetchAnimeAndRender(search, page) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20&page=${page || 1}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data.score);

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

function renderAnime(animeList) {
  const mainSection = document.getElementById("main-section");
  mainSection.innerHTML = ""; // Clear previous content

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.setAttribute("class", "movie-card");
    card.innerHTML = `
    
          <a href = "Movie detiles.html?animeId=${anime.id}">
        <img src="${anime.imageUrl}" alt="${anime.title}">
      <div>
        <h2>${anime.title}</h2>
      </a>
        <p>Episodes: ${anime.episodes}</p>
        <div class="rating">&#9733; ${anime.score}</div>
      </div>
    `;
    mainSection.appendChild(card);
  });
}

// Search functionality
document.getElementById("search-button").addEventListener("click", async () => {
  const searchInput = document.getElementById("search-input").value;
  if (searchInput) {
    await fetchAnimeAndRender(searchInput);
  }
});

document.querySelector(".search-icon").addEventListener("click", function () {
  document.querySelector(".searchbar").style.display = "flex";
  document.querySelector(".search-icon").style.display = "none";
});

document
  .querySelector(".search-icon")
  .addEventListener("click", async function () {
    // Clear existing content
    const mainSection = document.getElementById("main-section");
    mainSection.innerHTML = "";

    // Show the search bar
    document.querySelector(".searchbar").style.display = "flex";
    document.querySelector(".search-icon").style.display = "none";

    // Optionally, you can immediately trigger the search if there is existing input
    const searchInput = document.getElementById("search-input").value.trim(); // Trim whitespace
    if (searchInput) {
      await fetchAnimeAndRender(searchInput);
    }
  });
  if (sessionStorage.getItem("userID" , null) === null){

    let navbar = document.getElementById("navbar");
    navbar.innerHTML= `<a href="/index.html"> <img src="../assets/images/logo.png"  alt=""  style="width: 3rem; height: 3rem;"></a>
                   <div class="collapse navbar-collapse" id="navbarSupportedContent" style="justify-content: center;">
                   </div>
                   <button type="button" id="search-button" class="btn" onclick="window.location.href='login.html'" style= "background-color:#B43FEB ; color: white ; border-radius: 24px; border-color: #B43FEB; margin-right:80px; ">Login</button>
                    `;
                    }
