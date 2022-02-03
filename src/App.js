// import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/searchBox";
import "./bootstrap/css/bootstrap.min.css";
import "./App.css";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchVal}&apikey=c27ee267`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchVal);
  }, [searchVal]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem("react-movie-app-favourites"));

    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favourites, movie];
    setFavourites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const RemoveFavouritesMovie = (movie) => {
    const newFavoriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);

    setFavourites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="MyFilm"></MovieListHeading>
        <SearchBox searchVal={searchVal} setSearchVal={setSearchVal} />
      </div>
      <div className="row">
        <MovieList movies={movies} handleFavouritesClick={addFavoriteMovie} favoriteComponent={AddFavourites} />
      </div>
      {/* wishlist */}
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Wishlist"></MovieListHeading>
      </div>
      <div className="row">
        <MovieList movies={favourites} handleFavouritesClick={RemoveFavouritesMovie} favoriteComponent={RemoveFavourites} />
      </div>
    </div>
  );
};

export default App;
