const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

async function getTrendingTVPreview() {
  const { data } = await api('trending/tv/day');
  const series = data.results;

  const trendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
  trendingPreviewContainer.innerHTML = ''; // Limpia contenido previo

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
}

async function getCategegoriesPreview() {
  const { data } = await api('genre/tv/list');
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
}

// Llamar las funciones al cargar
getTrendingTVPreview();
getCategegoriesPreview();
