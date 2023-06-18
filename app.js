const accessKey = "J_1Sx5y0zsQycYKQCDyGKfak7fMasr4Rs_qQbBfBHwc";
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const imageResults = document.getElementById('image-results');
const loadMoreButton = document.getElementById('load-more-button');
const errorMessage = document.getElementById('error-message');

let keyword = "";
let page = 1;

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission
  page = 1;
  searchImages();
});

loadMoreButton.addEventListener('click', () => {
  page++;
  searchImages();
});

searchInput.addEventListener('input', () => {
  if (searchInput.value.trim() !== "") {
    errorMessage.style.display = 'none';
  }
});

async function searchImages() {
  keyword = searchInput.value.trim();

  if (keyword === '') {
    errorMessage.style.display = 'block';
    return;
  }

  errorMessage.style.display = 'none';

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    displayImages(results);
    updateLoadMoreButton(data.total_pages);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayImages(images) {
  if (page === 1) {
    imageResults.innerHTML = '';
  }

  images.forEach((result) => {
    const imageCard = document.createElement("div");
    imageCard.classList.add("image-card");

    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);

    imageCard.appendChild(imageLink);
    imageResults.appendChild(imageCard);
  });
}

function updateLoadMoreButton(totalPages) {
  if (page < totalPages) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
}
