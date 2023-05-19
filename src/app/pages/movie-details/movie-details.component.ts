import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie } from 'src/app/interfaces/movies.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public movieData: IMovie;

  private get recordId(): string {
    return this.activatedRoute.snapshot.params.id;
  }

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMovieData();
  }

  private getMovieData(): void {
    this.moviesService.getMovieData(this.recordId).subscribe(data => this.movieData = { ...data });
  }

}
