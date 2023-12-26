import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../service/history.service";
import {MatDialog} from "@angular/material/dialog";
import {Album} from "../../model/album";
import {Worship} from "../../model/worship";
import {DBService} from "../../service/db.service";
import {SongDTO} from "../../model/dto/songDTO";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  songs: SongDTO[] = [];
  showAlbumModal = false;
  showWorshipModal = false;
  form: FormGroup;

  constructor(
    private historyService: HistoryService,
    private dialog: MatDialog,
    private dbService: DBService,
    private formBuilder: FormBuilder,
    private router: Router
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

    this.form = this.formBuilder.group({
      id: [null],
      name: [null],
      image: [null],
    })
  }

  addAlbum(): void {
    this.dbService.getAlbums().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      this.form.controls['id'].setValue(id + 1);
      this.dbService.postAlbum(this.form.value).subscribe(data => {
        this.toggleAlbumModal()
        this.router.navigate(['/album', data.id])
      })
    })
  }

  addWorship(): void {
    this.dbService.getWorship().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      this.form.controls['id'].setValue(id + 1);

      this.dbService.postWorship(this.form.value).subscribe(data => {
        this.toggleWorshipModal()
        this.router.navigate(['/worship', data.id])
      })
    })
  }

  onAlbumCancel(): void {
    this.toggleAlbumModal()
  }

  onWorshipCancel(): void {
    this.toggleWorshipModal()
  }

  toggleAlbumModal() {
    this.form.reset()
    this.showAlbumModal = !this.showAlbumModal;
  }

  toggleWorshipModal() {
    this.form.reset()
    this.showWorshipModal = !this.showWorshipModal;
  }

}
