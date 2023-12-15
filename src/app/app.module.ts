import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LucideAngularModule, Home, Search, Library, SquareEqual, ListFilter, Play, PlusSquare, Shuffle, SkipBack, SkipForward, Repeat, ListVideo, ChevronLeftCircle, ChevronRightCircle, ChevronLeft, ChevronRight, ChevronDown, VolumeX, Volume, Volume1, Volume2, Maximize2, Minimize2, SlidersHorizontal, Pencil, PencilLine, MinusCircle, AudioLines, History, MoveUp } from 'lucide-angular';
import { SearchSongsComponent } from './pages/search-songs/search-songs.component';
import { AlbumComponent } from './pages/album/album.component';
import { HomeComponent } from './pages/home/home.component';
import { WorshipProgramComponent } from './pages/worship-program/worship-program.component';
import { RightMenuComponent } from './sidebar/right-menu/right-menu.component';
import { MenuComponent } from './sidebar/left-menu/menu.component';
import { SoundControlPanelComponent } from './sidebar/sound-control-panel/sound-control-panel.component';
import {InterfaceService} from "./service/interface.service";
import {WorshipService} from "./service/worship.service";
import {AlbumService} from "./service/album.service";
import {PreviewService} from "./service/preview.service";
import {QueueService} from "./service/queue.service";
import {SoundControlService} from "./service/sound-control.service";
import {PlayerService} from "./service/player.service";
import {UploadService} from "./service/upload.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
      MoveUp
    }),
    MatFormFieldModule,
    FormsModule
  ],
  providers: [
    InterfaceService,
    WorshipService,
    AlbumService,
    PreviewService,
    QueueService,
    SoundControlService,
    PlayerService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
