import {Component, OnInit} from '@angular/core';
import {Music} from "../../model/music";
import {HistoryService} from "../../service/history.service";
import {MatDialog} from "@angular/material/dialog";
import {AddSongDialogComponent} from "../../dialog/add-song-dialog/add-song-dialog.component";
import {AddAlbumDialogComponent} from "../../dialog/add-album-dialog/add-album-dialog.component";
import {Album} from "../../model/album";
import {AlbumService} from "../../service/album.service";
import {WorshipService} from "../../service/worship.service";
import {AddWorshipDialogComponent} from "../../dialog/add-worship-dialog/add-worship-dialog.component";
import {WorshipProgram} from "../../model/worship-program";

@Component({
  selector: 'app-left-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  musics: Music[] = [];

  constructor(
    private historyService: HistoryService,
    private dialog: MatDialog,
    private albumService: AlbumService,
    private worshipService: WorshipService
  ) {
  }

  ngOnInit() {
    this.historyService.historyEmitter.subscribe(
      id => {
        // TODO buscar musica por id
        let music: Music = {name: "Cristo já ressucitou", id: 1, duration: 1, timesPlayed: 1, file: "nature.jpg", number: 1}
        this.musics.push(music)
      }
    )
  }

  addAlbum(): void {
    const dialogRef = this.dialog.open(AddAlbumDialogComponent);

    dialogRef.afterClosed().subscribe((result: Album) => {
      if (result !== undefined) {
        console.log(result);

        this.albumService.post(result);
      }
    });
  }

  addWorship(): void {
    const dialogRef = this.dialog.open(AddWorshipDialogComponent);

    dialogRef.afterClosed().subscribe((result: WorshipProgram) => {
      if (result !== undefined) {
        console.log(result);

        this.worshipService.post(result);
      }
    });
  }

}
