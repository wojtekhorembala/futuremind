import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { MoviesService } from 'src/app/services/movies.service';
import { MovieType } from 'src/app/enum/movie.enum';
import { IGetMovies, IMovie, IMoviesFilterPostData } from 'src/app/interfaces/movies.interface';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnDestroy {

  public readonly movieTypes: MovieType[] = [MovieType.Episode, MovieType.Movie, MovieType.Series];
  public readonly displayedColumns: string[] = ['Title', 'Type', 'Year'];

  public formFilters: FormGroup = new FormGroup({
    movieTitle: new FormControl('', [Validators.required]),
    movieType: new FormControl(''),
    movieYear: new FormControl(''),
  });

  public paginationData: { 
    page: number,
    totalRecords: number,
  };
  public apiError: string;
  public moviesList: IMovie[] = [];
  public isLoadingData: boolean;

  private getMoviesListSubsc: Subscription;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
  ) {
    this.setDefaultPaginationData();
  }

  ngOnDestroy(): void {
    this.getMoviesListSubsc?.unsubscribe();
  }

  public get filtersRequestData(): IMoviesFilterPostData {
    const { movieTitle, movieYear, movieType } = this.formFilters.value;
    let defaultData: IMoviesFilterPostData = {
      s: movieTitle,
      page: `${ this.paginationData.page }`,
    };
    // Nie chce tworzyć za dużo logiki więc pozwole sobie tutaj użyć ifa, normalnie lepiej by było moim zdaniem dodać wszystko do jednego obiektu, a pozniej go przefiltrowac i usunac puste parametry
    if (movieType?.length) {
      defaultData = { ...defaultData, type: movieType };
    }
    if (movieYear) {
      defaultData = { ...defaultData, y: movieYear };
    }
    return defaultData;
  }

  public getMovies(): void {
    this.isLoadingData = true;
    this.getMoviesListSubsc = this.moviesService.getMovies(this.filtersRequestData).subscribe({
      next: (data) => this.onSuccessGetMovies(data),
      error: (error) => this.onErrorGetMovies(error),
    });
  }

  public onClickMovie(data: IMovie): void {
    this.router.navigate([`/movie/${ data.imdbID }`]);
  }

  public reset(): void {
    this.setDefaultPaginationData();
    this.formFilters.reset();
    this.moviesList = [];
    this.apiError = null;
  }

  public search(): void {
    if (this.formFilters.valid) {
      this.setDefaultPaginationData();
      this.getMovies();
      return;
    }
    alert('Wymagane pole nazwa filmu');
  }

  public onChangePage({ pageIndex }: PageEvent): void {
    this.paginationData = {
      ...this.paginationData,
      page: pageIndex + 1,
    }
    this.getMovies();
  }

  private setDefaultPaginationData(): void {
    this.paginationData = {
      page: 1,
      totalRecords: 0,
    };
  }

  private onErrorGetMovies(error: string): void {
    this.moviesList = [];
    this.apiError = error;
    this.isLoadingData = false;
  }

  private onSuccessGetMovies(data: IGetMovies): void {
    this.moviesList = [...data.Search];
    this.paginationData = {
      ...this.paginationData,
      totalRecords: Number(data.totalResults),
    };
    this.apiError = null;
    this.isLoadingData = false;
  }

}
