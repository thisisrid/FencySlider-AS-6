const imagesArea = document.querySelector(".images");
const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const searchBtn = document.getElementById("search-btn");
const sliderBtn = document.getElementById("create-slider");
const sliderContainer = document.getElementById("sliders");
// selected image
let sliders = [];

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = "15674931-a9d714b6e9d654524df198e00&q";

// show images
const showImages = (images) => {
  imagesArea.style.display = "block";
  gallery.innerHTML = "";
  // show gallery title
  galleryHeader.style.display = "flex";

  images.forEach((image) => {
    let div = document.createElement("div");
    div.className = "col-lg-3 col-md-4 col-xs-6 img-item mb-2";
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">
    <div class="bg-dark">
    <h6 class="text-white pl-1">Views: ${image.views}</h6>
    <h6 class="text-white pl-1">Downloads: ${image.downloads}</h6>
    <div class="text-center p-2" >
    <small class="bg-danger rounded-2 text-white p-1 mx-1"><i class="bi bi-hand-thumbs-up"></i> ${image.likes}</small>
    <small class="bg-danger rounded-2 text-white p-1"><i class="bi bi-chat-square-text"></i> ${image.comments}</small>
    </div>
    </div>`;
    gallery.appendChild(div);
  });
  toggleSpinner();
};

const getImages = async (query) => {
  toggleSpinner();
  const url = `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`;
  const response = await fetch(url);
  const data = await response.json();
  showImages(data.hits);
};

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle("added");
  item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    sliders.splice(item, 1);
  }
};

var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert("Select at least 2 image.");
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = "";
  const prevNext = document.createElement("div");
  prevNext.className =
    "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext);
  document.querySelector(".main").style.display = "block";
  // hide image aria
  imagesArea.style.display = "none";
  let getDuration = document.getElementById("duration").value;
  if (getDuration > 0) {
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, getDuration);
  } else {
    getDuration = 1500;
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, getDuration);
  }

  sliders.forEach((slide) => {
    let item = document.createElement("div");
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item);
  });
  changeSlide(0);
};

// change slider index
const changeItem = (index) => {
  changeSlide((slideIndex += index));
};

// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll(".slider-item");
  if (index < 0) {
    slideIndex = items.length - 1;
    index = slideIndex;
  }

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach((item) => {
    item.style.display = "none";
  });

  items[index].style.display = "block";
};

searchBtn.addEventListener("click", function () {
  document.querySelector(".main").style.display = "none";
  clearInterval(timer);
  const search = document.getElementById("search");
  getImages(search.value);
  sliders.length = 0;
});

sliderBtn.addEventListener("click", function () {
  createSlider();
});

//Newly Added Input Area -Enter Key Function
function handle(e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
  return false;
}

//Bonus TASK!!///////////////////
//1.. spinner added
const toggleSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.classList.toggle("d-none");
};

//2.. Added gallery items Details;
// such as Views, Downloads, Likes & Comments
// line No: 26-31
