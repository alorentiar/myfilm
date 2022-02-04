import "../App.css";
import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./searchBox";
import "../bootstrap/css/bootstrap.min.css";
import AddFavourites from "./AddFavourites";
import RemoveFavourites from "./RemoveFavourites";
import SignUp from "./SignUp";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function MainFilm() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  let navigate = useNavigate();

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
    <>
      <div className="col d-flex align-items-center mt-4 mb-4"></div>
      <SearchBox searchVal={searchVal} setSearchVal={setSearchVal} />
      <br></br>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="List Film"></MovieListHeading>
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
    </>
  );
}

export default MainFilm;
