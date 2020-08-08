import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { LoginComponent } from './components/login/login.component';
import { VerifyTokenGuard } from './services/guards/verify-token.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [VerifyTokenGuard],
  component: HomeComponent },
  { path: 'search', canActivate: [VerifyTokenGuard], component: SearchComponent },
  { path: 'artist/:id', canActivate: [VerifyTokenGuard], component: ArtistaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
