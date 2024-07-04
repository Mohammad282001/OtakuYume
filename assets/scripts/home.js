function topPicksCard(id, imageUrl, title) {
  const mainCards = document.getElementById("cards");

  const divCol = document.createElement("div");
  divCol.setAttribute("class", "col");
  mainCards.appendChild(divCol);

  const divCardHome = document.createElement("div");
  divCardHome.setAttribute("class", "cardHome");
  divCol.appendChild(divCardHome);

  const linkPicks = document.createElement("a");
  linkPicks.href = `pages/Movie detiles.html?animeId=${id}`;
  linkPicks.onclick = () => {
    sessionStorage.setItem("animeId", id);
  };
  divCardHome.appendChild(linkPicks);

  const imageCard = document.createElement("img");
  imageCard.setAttribute("class", "card-img-top1");
  imageCard.src = imageUrl;
  imageCard.setAttribute("alt", "avatar");
  linkPicks.appendChild(imageCard);

  const divTitle = document.createElement("div");
  divTitle.setAttribute("class", "card-body");
  divCardHome.appendChild(divTitle);

  const pTitle = document.createElement("p");
  pTitle.setAttribute("class", "card-text");
  pTitle.style.color = " white";
  pTitle.innerHTML = title;
  divTitle.appendChild(pTitle);
}
/*****************************Coming Soon********************* */
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

/*****************************\Coming Soon********************* */

/**************************Top Movies*********************** */
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 2.5,
    slideShadows: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
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
  pText.innerHTML = synopsis
    ? synopsis.substring(0, 100) + "..."
    : "No synopsis available";
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

// if (sessionStorage.getItem("userID" , null) === null){

//   let navbar = document.getElementById("navbar");
//   navbar.innerHTML= `<a href="index.html"> <img src="./assets/images/logo.png"  alt=""  style="width: 3rem; height: 3rem; margin-right: 5rem ; margin-left:1rem  "></a>

//   <div class="logo-container" style="font-size: x-large; text-align:start; color: #ffffff; margin-top:-10px; margin-left: -60px; text-shadow: 1px 4px 4px #b43feb !important">
//     <h1 id="logo" ></h1>
//     OtakuYume
//   </div>
//                  <button type="button" id="search-button" class="btn" onclick="window.location.href='pages/login.html'" style= "background-color:#B43FEB ; color: white ; border-radius: 24px; border-color: #B43FEB; margin-right : 20px">Login</button>
//                   `;
//                   }

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
      data.data.slice(10, 35).forEach((information) => {
        createCard2(information.mal_id, information.images.jpg.image_url);
      });
      data.data.slice(14, 18).forEach((information) => {
        topPicksCard(
          information.mal_id,
          information.images.jpg.image_url,
          information.title
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
