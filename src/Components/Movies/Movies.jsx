import { movies } from "./getMovies";
import React from "react";
import "./movies.css";

export default function Movies() {
  let movie = movies.results;
  if (movie === "" || movie.length === 0) {
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
            {movie.map((movieItem) => {
              return (
                <div key={movieItem.id} className="card moviesCard">
                  <img
                    className="card-img-top moviesImg"
                    src={`https://image.tmdb.org/t/p/original${movieItem.backdrop_path}`}
                    alt={movieItem.title}
                  />
                  <h5 className="card-title moviesTitle">
                    {movieItem.original_title}
                  </h5>
                  <div className="buttonWrapper">
                    <a href="#" className="btn btn-primary moviesButton">
                      Add to Favourites
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pageNavigation">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
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
