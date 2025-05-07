const BASE_URL = 'https://api.themoviedb.org/3';
const HEADERS = {
  'Content-Type': 'application/json;charset=utf-8',
};

async function getTrendingTVPreview() {
  try {
    const response = await fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`, {
      headers: HEADERS,
    });
    const data = await response.json();
    const series = data.results;

    const trendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
    trendingPreviewContainer.innerHTML = '';

    series.forEach(serie => {
      const seriesContainer = document.createElement('div');
      seriesContainer.classList.add('movie-container');

      const seriesImg = document.createElement('img');
      seriesImg.classList.add('movie-img');
      seriesImg.setAttribute('alt', serie.name);
      seriesImg.setAttribute(
        'src',
        'https://image.tmdb.org/t/p/w300' + serie.poster_path,
      );

      seriesContainer.appendChild(seriesImg);
      trendingPreviewContainer.appendChild(seriesContainer);
    });
  } catch (error) {
    console.error('Error cargando series del momento:', error);
  }
}

async function getCategegoriesPreview() {
  try {
    const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`, {
      headers: HEADERS,
    });
    const data = await response.json();
    const categories = data.genres;

    const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    previewCategoriesContainer.innerHTML = '';

    categories.forEach(category => {
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');

      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('category-title');
      categoryTitle.setAttribute('id', 'id' + category.id);
      categoryTitle.textContent = category.name;

      categoryContainer.appendChild(categoryTitle);
      previewCategoriesContainer.appendChild(categoryContainer);
    });
  } catch (error) {
    console.error('Error cargando categorías:', error);
  }
}

// Llamar las funciones al cargar
getTrendingTVPreview();
getCategegoriesPreview();
