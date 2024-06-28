async function getPopularMovies() {
  const tmdbApiKey = "2579531334965821937afb74eaaae9f1";
  const fetchUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${tmdbApiKey}&page=1`;

  try {
    const response = await fetch(fetchUrl);
    const json = await response.json();

    const movieList = [];
    const data = json.results;

    data.forEach((movieNode) => {
      const title = movieNode.title;
      let backdrop = movieNode.backdrop_path;
      let posterPath = movieNode.poster_path;

      posterPath = `https://image.tmdb.org/t/p/w1280${posterPath}`;
      backdrop = `https://image.tmdb.org/t/p/w1280${backdrop}`;

      const movie = {
        title: title,
        backdrop: backdrop,
        posterPath: posterPath,
      };
      movieList.push(movie);
    });

    return movieList;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

function displayMovies(movieList) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = "";

  movieList.forEach((movie) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = movie.posterPath;
    img.alt = movie.title;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";

    const icon = document.createElement("i");
    icon.className = "fas fa-download";

    // Create anchor tag for the title
    const titleLink = document.createElement("a");
    titleLink.href = "#";
    titleLink.textContent = " " + movie.title;
    titleLink.addEventListener("click", () => download(movie.title));

    cardTitle.appendChild(icon);
    cardTitle.appendChild(titleLink);

    cardBody.appendChild(cardTitle);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    movieContainer.appendChild(col);
  });
}

function download(title) {
  console.log(`Downloading movie: ${title}`);

  fetch(
    "https://torrent-api-py-nx0x.onrender.com/api/v1/search?site=piratebay&query=" +
      title
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data && data.data) {
        // Save the data to local storage
        localStorage.setItem("movieData", JSON.stringify(data.data));
        // Redirect to the new page
        window.location.href = "results.html";
      } else {
        console.error("Invalid data format:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getPopularMovies().then((movieList) => {
  displayMovies(movieList);
});
