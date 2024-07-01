/***************************hearo ********************************* */
{/* <section id="hero-section">

 <h5 class="WelcomeMess">Welcome back Mr/Ms . Name</h5>  */}

 const heroName = document.getElementById("hero-section");
 const h5Name = document.createElement("h5");
 h5Name.setAttribute("class","WelcomeMess") ;
 

let userName = sessionStorage.getItem('userName');

if(userName){

  h5Name.innerHTML= `Welcome , ${userName}! Enjoy exploring the latest movies.`;

}else{
  h5Name.innerHTML= `Welcome! Enjoy exploring the latest movies.`;
}

heroName.insertBefore(h5Name, heroName.firstChild);

/*****************************Coming Soon********************* */
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;

          // Ensure the scrollbar thumb stays within bounds
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }

      // Remove event listeners on mouse up
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }

      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });

   // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

/*****************************\Coming Soon********************* */


/**************************Top Movies*********************** */
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop:true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 2.5,
    slideShadows: true,
  },
  autoplay:{

    delay:3000,
    disableOnInteraction:false,
  }

});

/**************************\Top Movies*********************** */

/******************top movies Dom********************************** */

function createCard(id, imageUrl, title, synopsis) {
  const mainDiv = document.getElementById("swiper-wrapper");

  const divTop = document.createElement("div");
  divTop.setAttribute("class", "content swiper-slide");
  mainDiv.appendChild(divTop);

  const link = document.createElement("a");
  link.href = `pages/Movie detiles.html?animeId=${id}`;
  link.onclick = () => {
  sessionStorage.setItem("animeId", id);
  };
  divTop.appendChild(link);

  const imageTop = document.createElement("img");
  imageTop.setAttribute("alt", "image");
  imageTop.src = imageUrl;
  link.appendChild(imageTop);

  const DivText = document.createElement("div");
  DivText.setAttribute("class", "text-content");
  divTop.appendChild(DivText);

  const h3Text = document.createElement("h3");
  h3Text.innerHTML = title;
  DivText.appendChild(h3Text);

  const pText = document.createElement("p");
  pText.innerHTML = synopsis ? synopsis.substring(0, 100) + '...' : 'No synopsis available';
  DivText.appendChild(pText);
}

// Fetch data from jikan.moe


  fetch(`https://api.jikan.moe/v4/anime`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      
      if (Array.isArray(data.data)) {
        data.data.slice(0, 25).forEach((information) => {
          createCard(
            information.mal_id,
            information.images.jpg.image_url,
            information.title,
            information.synopsis
          );
        });
      } else {
        console.error("Data is not an array:", data);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  
  
    if (sessionStorage.getItem("userID" , null) === null){

      let navbar = document.getElementById("navbar");
      navbar.innerHTML= `<a href="index.html"> <img src="./assets/images/logo.png"  alt=""  style="width: 3rem; height: 3rem;"></a>
                         <div class="collapse navbar-collapse" id="navbarSupportedContent" style="justify-content: center;">
                         </div>
                         <button type="button" id="search-button" class="btn" onclick="window.location.href='pages/login.html'" style= "background-color:#B43FEB ; color: white ; border-radius: 24px; border-color: #B43FEB; margin-left : 10px">Login</button>
                          `;
                          }

                          

fetch(`https://api.jikan.moe/v4/anime`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    
    if (Array.isArray(data.data)) {
      data.data.slice(0, 25).forEach((information) => {
        createCard(
          information.mal_id,
          information.images.jpg.image_url,
          information.title,
          information.synopsis
        );
      });
    } else {
      console.error("Data is not an array:", data);
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });


  /***********************coming soon dom********************** */

  
  
  // <ul class="image-list" id="image-list">
  // <img class="image-item" src="./assets/images/Card Film.png" alt="img-1" />

  function createCard2(id, imageUrl) {

    const mainDiv2 = document.getElementById("image-list");
    const linkComing = document.createElement("a");
    linkComing.href = `pages/Movie detiles.html?animeId=${id}`;
    linkComing.onclick = () => {
    sessionStorage.setItem("animeId", id);
    };
    mainDiv2.appendChild(linkComing);
  
    const imageComing = document.createElement("img");
    imageComing.setAttribute("alt", "image");
    imageComing.src = imageUrl;
    linkComing.appendChild(imageComing);
  
  }
  

  fetch(`https://api.jikan.moe/v4/anime`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    
    if (Array.isArray(data.data)) {
      data.data.slice(10,35).forEach((information) => {
        createCard2(
          information.mal_id,
          information.images.jpg.image_url
          
        );
      });
    } else {
      console.error("Data is not an array:", data);
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

  
  

  

// // Call fetchAnimeAndRender with a default search query when the page loads
// window.onload = function () {
//   fetchAnimeAndRender(""); // Default search query example ('naruto')
// // pagenation
//   const pages = document.getElementById("pages");
  
//   pages.addEventListener("click", (event) => {
//     const pageNumber = 1;
//     fetchAnimeAndRender("", pageNumber); 
//   });
// };

// // the seachbar function
// // document.querySelector(".search-icon").addEventListener("click", function () {
// //   document.querySelector(".searchbar").style.display = "flex";
// //   document.querySelector(".search-icon").style.display = "none";
// // });

// // searchfunctionworks

// async function fetchAnimeAndRender(search, page) {
//   try {
//     const response = await fetch(
//       `https://api.jikan.moe/v4/anime?q=${search}&limit=20&page=${page || 1}`
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok.");
//     }
//     const data = await response.json();
//     console.log(data.score);

//     // Check for expected data structure
//     if (!data || !data.data || !Array.isArray(data.data)) {
//       throw new Error("Unexpected data format from API.");
//     }

//     // Limit to first 20 results for simplicity
//     const animeList = data.data.slice(0, 20);

//     // Map through anime and create Anime objects
//     const animeObjects = animeList.map((anime) => {
//       return new Anime(
//         anime.mal_id,
//         anime.title,
//         anime.synopsis,
//         anime.episodes,
//         anime.images.jpg.image_url,
//         anime.score
//       );
//     });

//     // Render anime
//     renderAnime(animeObjects);
    
//   } catch (error) {
//     console.error("Error fetching or rendering anime:", error);
//     // Handle error appropriately (e.g., show error message to user)
//   }
//  } 

// function renderAnime(animeList) {
//   const mainSection = document.getElementById("main-section");
//   mainSection.innerHTML = ""; // Clear previous content

//   animeList.forEach((anime) => {
//     const card = document.createElement("div");
//     card.setAttribute("class", "movie-card");
//     card.innerHTML = `
    
//           <a href = "Movie detiles.html?animeId=${anime.id}">
//         <img src="${anime.imageUrl}" alt="${anime.title}">
//       <div>
//         <h2>${anime.title}</h2>
//       </a>
//         <p>Episodes: ${anime.episodes}</p>
//         <div class="rating">&#9733; ${anime.score}</div>
//       </div>
//     `;
//     mainSection.appendChild(card);
//   });
// }

// // Search functionality
// document.getElementById("search-button").addEventListener("click", async () => {
//   const searchInput = document.getElementById("search-input").value;
//   if (searchInput) {
//     await fetchAnimeAndRender(searchInput);
//   }
// });

// document.querySelector(".search-icon").addEventListener("click", function () {
//   document.querySelector(".searchbar").style.display = "flex";
//   document.querySelector(".search-icon").style.display = "none";
// });