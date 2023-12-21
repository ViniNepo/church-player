import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LucideAngularModule, Home, Search, Library, SquareEqual, ListFilter, Play, PlusSquare, Shuffle, SkipBack, SkipForward, Repeat, ListVideo, ChevronLeftCircle, ChevronRightCircle, ChevronLeft, ChevronRight, ChevronDown, VolumeX, Volume, Volume1, Volume2, Maximize2, Minimize2, SlidersHorizontal, Pencil, PencilLine, MinusCircle, AudioLines, History, MoveUp, UploadCloud, Check, X } from 'lucide-angular';
import { SearchSongsComponent } from './pages/search-songs/search-songs.component';
import { AlbumComponent } from './pages/album/album.component';
import { HomeComponent } from './pages/home/home.component';
import { WorshipProgramComponent } from './pages/worship-program/worship-program.component';
import { RightMenuComponent } from './sidebar/right-menu/right-menu.component';
import { MenuComponent } from './sidebar/left-menu/menu.component';
import { SoundControlPanelComponent } from './sidebar/sound-control-panel/sound-control-panel.component';
import {HistoryService} from "./service/history.service";
import {WorshipService} from "./service/worship.service";
import {AlbumService} from "./service/album.service";
import {SoundControlService} from "./service/sound-control.service";
import {UploadService} from "./service/upload.service";
import { AddSongDialogComponent } from './dialog/add-song-dialog/add-song-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddWorshipDialogComponent } from './dialog/add-worship-dialog/add-worship-dialog.component';
import { AddAlbumDialogComponent } from './dialog/add-album-dialog/add-album-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchSongsComponent,
    AlbumComponent,
    HomeComponent,
    WorshipProgramComponent,
    RightMenuComponent,
    MenuComponent,
    SoundControlPanelComponent,
    AddSongDialogComponent,
    AddWorshipDialogComponent,
    AddAlbumDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    LucideAngularModule.pick({
      Home,
      Search,
      Library,
      Play,
      SquareEqual,
      ListFilter,
      PlusSquare,
      Shuffle,
      SkipBack,
      SkipForward,
      Repeat,
      ListVideo,
      ChevronLeftCircle,
      ChevronRightCircle,
      ChevronLeft,
      ChevronRight,
      ChevronDown,
      VolumeX,
      Volume,
      Volume1,
      Volume2,
      Maximize2,
      Minimize2,
      SlidersHorizontal,
      Pencil,
      PencilLine,
      MinusCircle,
      AudioLines,
      History,
      MoveUp,
      UploadCloud,
      Check,
      X
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    WorshipService,
    AlbumService,
    SoundControlService,
    HistoryService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
