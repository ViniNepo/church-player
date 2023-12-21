import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddSongDialogComponent} from "../../dialog/add-song-dialog/add-song-dialog.component";
import {Music} from "../../model/music";
import {HistoryService} from "../../service/history.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {

  musics: Music[] = [];

  constructor(
    private dialog: MatDialog,
    private historyService: HistoryService,
    private route: ActivatedRoute
  ) {
    console.log(this.route);
  }

  ngOnInit() {
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddSongDialogComponent);

    dialogRef.afterClosed().subscribe((result: Music) => {
      console.log(result);
      this.musics.push(result)
    });
  }

  showModal = false;

  deleteSong(val: number) {
    console.log(val);
    this.musics.splice(val, 1);
  }

  playSong(id: number) {
    this.historyService.sendMusicToHistory(id)
  }

}
