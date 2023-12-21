import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AlbumComponent} from "./pages/album/album.component";
import {SearchSongsComponent} from "./pages/search-songs/search-songs.component";
import {WorshipProgramComponent} from "./pages/worship-program/worship-program.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'album/:id', component: AlbumComponent},
  {path: 'search-songs', component: SearchSongsComponent},
  {path: 'worship-program', component: WorshipProgramComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // exports: [RouterModule]
})
export class AppRoutingModule { }
