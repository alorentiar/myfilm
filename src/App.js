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
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";

//react router
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainFilm from "./components/MainFilm";

const App = () => {
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
  }, [setSearchVal]);

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
      <div>
        <nav className="navbar navbar-light bg-light nav-custom ">
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
          <MovieListHeading heading="MyFilm"></MovieListHeading>
          {/* <button
            className="btn btn-primary button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button
            className="btn btn-primary button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button> */}
          <button
            className="btn btn-primary button"
            onClick={() => {
              navigate("/mainfilm");
            }}
          >
            Daftar Film
          </button>
        </nav>
      </div>

      <Routes>
        {/* in development */}
        {/* <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route> */}
        <Route path="/mainfilm" element={<MainFilm />}></Route>
      </Routes>
      {/* ini mainnya */}
    </div>
  );
};

export default App;
