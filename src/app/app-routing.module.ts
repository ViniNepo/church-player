import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AlbumComponent} from "./pages/album/album.component";
import {SearchSongsComponent} from "./pages/search-songs/search-songs.component";
import {WorshipProgramComponent} from "./pages/worship-program/worship-program.component";
import {AlbumResolver} from "./guards/album-detail.resolver";
import {WorshipResolver} from "./guards/worship-detail.resolver";
import {SearchSongsDetailResolver} from "./guards/search-songs-detail.resolver";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'album/:id', component: AlbumComponent,
    resolve: {album: AlbumResolver}},
  {path: 'search-songs', component: SearchSongsComponent},
  {path: 'worship/:id', component: WorshipProgramComponent,
    resolve: {worship: WorshipResolver, songs: SearchSongsDetailResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
