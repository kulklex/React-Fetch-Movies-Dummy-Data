/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
// import { movies } from "./getMovies";
import React, { useState, useEffect } from "react";
import "./movies.css";
import axios from "axios";

export default function Movies() {
  const [state, setState] = useState({
    hover: "",
    par: [],
    currentPage: 1,
    movies: []
  });

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${state.currentPage}`
      )
      .then((response) => {
        let data = response.data;
        setState({
          movies: [...data.results]
        })
      })
      .catch((err) => console.error(err));
  }, [state.currentPage]);

  const changeMovies = () => {
    axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${state.currentPage}`
    )
      .then((response) => {
        let data = response.data;
        setState({
          movies: [...data.results]
        })
      })
      .catch((err) => console.error(err));
  }

  const handleRightClick = () => {
    let tempar = []
    for(let i = 0; i<= state.par.length +1; i++){
      tempar.push(i)
    }
    setState({
      par: [...tempar],
      currentPage: state.currentPage+1
    }, changeMovies)
    
  } 

  const handleLeftClick = () => {
    setState({
      currentPage: state.currentPage-1
    })
  }
  
  const handleClick = (value) => {
    if(value !== state.currentPage) {
      setState({
        currentPage: value
      }, changeMovies)
    }
  }

  if (state.movies.length === 0) {
    return (
      <>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading....</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <h1 className="text-center">
            <strong>Trending </strong>
          </h1>
          <div className="moviesList">
            {state.movies.map(function(movieItem) {
              return (
                <div
                  key={movieItem.id}
                  className="card moviesCard"
                >
                  <img
                    className="card-img-top moviesImg"
                    src={`https://image.tmdb.org/t/p/original${movieItem.backdrop_path}`}
                    alt={movieItem.title}
                  />
                  <h5 className="card-title moviesTitle">
                    {movieItem.original_title}
                  </h5>
                  <div className="buttonWrapper">
                    {  (
                      <a className="btn btn-primary moviesButton">
                        Add to Favourites
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pageNavigation">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" onClick={handleLeftClick}>
                    Previous
                  </a>
                </li>
                {state.par?.map(function(value) {
                  return (
                    <li key={value.length} className="page-item">
                      <a className="page-link" onClick={handleClick(value)}>
                        {value}
                      </a>
                    </li>
                  );
                })}

                <li className="page-item">
                  <a className="page-link" onClick={handleRightClick}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
}
