import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddSongDialogComponent} from "../../dialog/add-song-dialog/add-song-dialog.component";
import {Music} from "../../model/music";
import {HistoryService} from "../../service/history.service";
import {ActivatedRoute} from "@angular/router";
import {DBService} from "../../service/db.service";
import {AlbumDTO} from "../../model/dto/albumDTO";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {

  id: number;
  editName = false;
  nameAlbum: string;
  originalText: string;
  album: AlbumDTO = null;

  constructor(
    private dialog: MatDialog,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private dbService: DBService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.dbService.getAlbumByID(this.id)
          .subscribe(data => {
            this.album = data
            console.log(data)
          })
      }
    )

    this.nameAlbum = "outro nume";

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddSongDialogComponent);

    dialogRef.afterClosed().subscribe((result: Music) => {
      console.log(result);
      if (result !== undefined) {
        // this.musics.push(result)
      }
    });
  }

  showModal = false;

  deleteSong(val: number) {
    console.log(val);
    // this.musics.splice(val, 1);
  }

  playSong(id: number) {
    this.historyService.sendMusicToHistory(id)
  }

  editAlbumName() {
    this.originalText = this.nameAlbum;
    this.editName = !this.editName
  }

  saveAlbumName() {
    //save
    this.editAlbumName()
  }

  cancelEditAlbumName() {
    this.nameAlbum = this.originalText;
    this.editAlbumName()
  }

}
