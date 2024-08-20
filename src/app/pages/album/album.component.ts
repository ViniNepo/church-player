import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DBService} from "../../service/db.service";
import {AlbumDTO} from "../../model/dto/albumDTO";
import {FormBuilder} from "@angular/forms";
import {SongDTO} from "../../model/dto/songDTO";
import {ToastrService} from "ngx-toastr";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {BehaviorSubject, catchError, of} from "rxjs";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {

  id: number;
  editName = false;
  showDeleteModal = false
  showDeleteSongModal = false
  showAddSongModal = false
  originalName: string;
  album: AlbumDTO;
  files: Array<File>
  error$ = new BehaviorSubject<string | null>(null);


  constructor(
    private route: ActivatedRoute,
    private dbService: DBService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { album: AlbumDTO }) => {
        this.album = data.album
        this.originalName = this.album.title
      }
    )
  }

  playSong(song: SongDTO) {
  }

  toggleAddMusic() {
    this.files = []
    this.showAddSongModal = !this.showAddSongModal
  }

  toggleDeleteAlbum() {
    this.showDeleteModal = !this.showDeleteModal
  }

  toggleDeleteSong() {
    this.showDeleteSongModal = !this.showDeleteSongModal
  }

  editAlbumName() {
    this.editName = !this.editName
  }

  cancelEditAlbumName() {
    this.album.title = this.originalName
    this.editAlbumName()
  }

  onChange(event) {
    this.files = event.target.files
    console.log(this.files)
  }

  saveAlbumName() {
    this.dbService.updateAlbum(this.album).subscribe({
      next: () => {
        console.log('Album updated:');
      },
      error: (error) => {
        this.album.title = this.originalName
        console.error('Error updating album:', error);
      }
    });
    this.editAlbumName()
  }

  addSong() {
    console.log(this.files)
  }

  deleteSong(song: SongDTO, index: number) {

  }

  deleteAlbum() {
    this.dbService.deleteAlbum(this.album.id).subscribe({
      next: () => {
        this.toggleDeleteAlbum()
        console.log('Album deleted:');
      },
      error: (error) => {
        this.toggleDeleteAlbum()
        console.error('Error deleting album:', error);
      }
    });
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
