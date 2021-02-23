import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthApprovedComponent } from './auth-approved/auth-approved.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthResolver } from './resolvers/auth-resolver';
import { MovieResolver } from './resolvers/movie-resolver';
import { AuthGuard } from './util/authGuard';

const routes: Routes = [
  {
    path:'', 
    component: HomeComponent
  },
  {
    path: 'movie/:id', 
    component: MovieDetailsComponent,
    resolve: {
      resolvedMovie: MovieResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'approved',
    component: AuthApprovedComponent,
    resolve: {
      resolvedSession: AuthResolver
    }
  },
  {
    path:'404',
    component: NotFoundComponent
  },
  {
    path:'**', 
    redirectTo: '', 
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
