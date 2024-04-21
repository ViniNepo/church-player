import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  LucideAngularModule,
  Home,
  Search,
  Library,
  SquareEqual,
  ListFilter,
  Play,
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
  X,
  Trash2,
  LockKeyhole,
  LockKeyholeOpen,
  RefreshCcw,
  GripVertical,
} from 'lucide-angular';
import {SearchSongsComponent} from './pages/search-songs/search-songs.component';
import {AlbumComponent} from './pages/album/album.component';
import {HomeComponent} from './pages/home/home.component';
import {WorshipProgramComponent} from './pages/worship-program/worship-program.component';
import {RightMenuComponent} from './sidebar/right-menu/right-menu.component';
import {MenuComponent} from './sidebar/left-menu/menu.component';
import {SoundControlPanelComponent} from './sidebar/sound-control-panel/sound-control-panel.component';
import {HistoryService} from "./service/history.service";
import {SoundControlService} from "./service/sound-control.service";
import {UploadService} from "./service/upload.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DBService} from "./service/db.service";
import {HttpClientModule} from "@angular/common/http";
import {AlbumResolver} from "./guards/album-detail.resolver";
import {WorshipResolver} from "./guards/worship-detail.resolver";
import {NgSelectModule} from "@ng-select/ng-select";
import {SearchSongsDetailResolver} from "./guards/search-songs-detail.resolver";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";

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
      MoveUp,
      UploadCloud,
      Check,
      X,
      Trash2,
      LockKeyhole,
      LockKeyholeOpen,
      RefreshCcw,
      GripVertical,
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [
    DBService,
    SoundControlService,
    HistoryService,
    UploadService,
    AlbumResolver,
    WorshipResolver,
    SearchSongsDetailResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
