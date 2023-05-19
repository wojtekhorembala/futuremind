import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable, of, switchMap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IGetMovies, IMovieDetails, IMoviesFilterPostData } from '../interfaces/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public readonly url = `${ environment.apiUrl }/?apikey=${ environment.apiKey }`; // normalnie użyłbym interceptora do dodania tokena w requescie

  constructor(
    private http: HttpClient
  ) { }

  public getMovies(data: IMoviesFilterPostData): Observable<IGetMovies> {
    const httpParams = new HttpParams({ fromObject: (data as any) }); // any, bo mi wywala błąd ze MovieType enum nie jest stringiem
    return this.http.get<IGetMovies>(this.url, { params: httpParams }).pipe(
      switchMap((response) => {
        if (response.Response === 'False') {
          return throwError(() => (response as any).Error);
        }
        return of(response);
      }),
    );
  }

  public getMovieData(id: string): Observable<IMovieDetails> {
    const httpParams = new HttpParams({ fromObject: { i: id } });
    return this.http.get<IMovieDetails>(this.url, { params: httpParams });
  }

}
