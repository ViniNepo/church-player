import {Component, OnInit} from '@angular/core';
import {Music} from "../../model/music";
import {HistoryService} from "../../service/history.service";
import {MatDialog} from "@angular/material/dialog";
import {AddAlbumDialogComponent} from "../../dialog/add-album-dialog/add-album-dialog.component";
import {Album} from "../../model/album";
import {AddWorshipDialogComponent} from "../../dialog/add-worship-dialog/add-worship-dialog.component";
import {Worship} from "../../model/worship";
import {DBService} from "../../service/db.service";
import {SongDTO} from "../../model/dto/songDTO";

@Component({
  selector: 'app-left-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  songs: SongDTO[] = [];

  constructor(
    private historyService: HistoryService,
    private dialog: MatDialog,
    private dbService: DBService
  ) {
  }

  ngOnInit() {
    this.historyService.historyEmitter.subscribe(
      song => {
        for (let i = 0; i < this.songs.length; i++) {
          if (this.songs[i].id === song.id) {
            this.songs.splice(i, 1);
          }
        }
        this.songs.unshift(song)
      }
    )
    this.historyService.getHistory()
  }

  addAlbum(): void {
    const dialogRef = this.dialog.open(AddAlbumDialogComponent);

    dialogRef.afterClosed().subscribe((result: Album) => {
      if (result !== undefined) {
        console.log(result);

        // this.albumService.post(result);
      }
    });
  }

  addWorship(): void {
    const dialogRef = this.dialog.open(AddWorshipDialogComponent);

    dialogRef.afterClosed().subscribe((result: Worship) => {
      if (result !== undefined) {
        console.log(result);

        // this.worshipService.post(result);
      }
    });
  }

}
