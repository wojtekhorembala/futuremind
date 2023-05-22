import { MovieType } from "../enum/movie.enum";

export interface IMoviesFilterPostData {
    s: string;
    page: string;
    type?: MovieType;
    y?: string;
}
  
export interface IMovie {
    Poster: string;
    Title: string;
    Type: MovieType;
    Year: string;
    imdbID: string;
}

export interface IMovieDetails extends IMovie {
    Rated: string;
    Plot: string;
    // ... i wiele wiecej
}

export interface IGetMovies {
    Response: string; // true/false
    Search: IMovie[];
    totalResults: string;
}
