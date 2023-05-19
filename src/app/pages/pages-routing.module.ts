import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./list-movies/list-movies.module').then(m => m.ListMoviesModule),
  },
  {
    path: 'movie/:id',
    loadChildren: () => import('./movie-details/movie-details.module').then(m => m.MovieDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
