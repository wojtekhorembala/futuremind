import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IMovie } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  public movieData: IMovie;

  private get recordId(): string {
    return this.activatedRoute.snapshot.params.id;
  }

  private getMoviesListSubsc: Subscription;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMovieData();
  }

  ngOnDestroy(): void {
    this.getMoviesListSubsc?.unsubscribe();
  }

  private getMovieData(): void {
    this.getMoviesListSubsc = this.moviesService.getMovieData(this.recordId).subscribe(data => this.movieData = { ...data });
  }

}
