import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DBService} from "../../service/db.service";
import {AlbumDTO} from "../../model/dto/albumDTO";
import {CreateSongDTO, SongDTO, SongUpdateOrderDTO} from "../../model/dto/songDTO";
import {ToastrService} from "ngx-toastr";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Song} from "../../model/song";

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
  showEditCover = false
  originalName: string;
  originalSongName: string;
  originalSongNumber: number;
  album: AlbumDTO;
  selectedSong: SongDTO = null;
  selectedCover: Array<File>
  files: Array<File>
  albumImage: string | null = null
  editSongIndex: number | null = null;


  constructor(
    private route: ActivatedRoute,
    private dbService: DBService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { album: AlbumDTO }) => {
        this.album = data.album
        this.album.songs = this.album.songs || []
        this.albumImage = this.album.image_url
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

  toggleDeleteSong(song: SongDTO) {
    this.selectedSong = song
    this.showDeleteSongModal = !this.showDeleteSongModal
  }

  toggleEditCover() {
    this.showEditCover = !this.showEditCover
  }

  editAlbumName() {
    this.editName = !this.editName
  }

  cancelEditAlbumName() {
    this.album.title = this.originalName
    this.editAlbumName()
  }


  editSongDetails(index: number, song: SongDTO) {
    this.originalSongName = song.title
    this.originalSongNumber = song.song_number
    this.editSongIndex = index;
  }

  cancelEditSongDetails(song: SongDTO) {
    song.title = this.originalSongName
    song.song_number = this.originalSongNumber
    this.editSongIndex = null;
  }

  updateSongDetails(songDTO: SongDTO) {
    const song = new Song(songDTO.id, songDTO.title, songDTO.song_number, songDTO.file, songDTO.song_order, this.album.id)
    this.dbService.updateSong(song).subscribe({
      next: () => {
        console.log('Song updated:');
      },
      error: (error) => {
        songDTO.title = this.originalSongName
        songDTO.song_number = this.originalSongNumber
        alert("deu ruim")
        console.error('Error updating selected song:', error);
      }
    });
    this.editSongIndex = null;
  }

  onChange(event) {
    const files: File[] = event.target.files;

    if (files.length > 50) {
      alert('You can only upload up to 50 files.');
      this.toggleAddMusic()
      return;
    }

    this.files = files
  }

  onChangeCover(event) {
    this.selectedCover = event.target.files
    console.log(this.selectedCover)
  }

  updateAlbum() {
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

  editAlbumCover() {
    this.album.image_url = this.selectedCover[0].name
    console.log(this.album)
    this.dbService.updateAlbum(this.album).subscribe({
      next: () => {
        this.albumImage = this.album.image_url
        console.log('Album updated:');
      },
      error: (error) => {
        this.album.title = this.originalName
        console.error('Error updating album:', error);
      }
    });
    this.toggleEditCover()
  }

  addSong() {
    let songs: CreateSongDTO[] = []
    for (let i = 0; i < this.files.length; i++) {
      const song = new CreateSongDTO(this.files[i].name, this.album.id)
      songs.push(song)
    }

    this.dbService.createSong(songs).subscribe({
      next: () => {
        this.dbService.findAlbumByID(this.album.id).subscribe({
          next: (album: AlbumDTO) => {
            this.album.songs = album.songs
            this.toggleAddMusic()
          },
          error: (error) => {
            this.toggleAddMusic()
            console.error('Error updating songs list:', error);
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
        console.log('Song added:');
      },
      error: (error) => {
        this.toggleAddMusic()
        console.error('Error add song:', error);
      }
    });
  }

  deleteSong() {
    this.dbService.deleteSong(this.selectedSong.id).subscribe({
      next: () => {
        this.dbService.findAlbumByID(this.album.id).subscribe({
          next: (album: AlbumDTO) => {
            this.album.songs = album.songs
            this.toggleDeleteSong(null)
          },
          error: (error) => {
            this.toggleDeleteSong(null)
            console.error('Error updating songs list:', error);
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
        console.log('Song deleted:');
      },
      error: (error) => {
        this.toggleDeleteSong(null)
        console.error('Error deleting song:', error);
      }
    });
  }

  deleteAlbum() {
    this.dbService.deleteAlbum(this.album.id).subscribe({
      next: () => {
        this.toggleDeleteAlbum()
        console.log('Album deleted:');
        this.router.navigate(['/home'])
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

    let songsOrder: SongUpdateOrderDTO[] = []

    for (let i = 0; i < this.album.songs.length; i++) {
      let songOrder: SongUpdateOrderDTO = new SongUpdateOrderDTO(this.album.songs[i].id, i)
      songsOrder.push(songOrder)
    }

    this.dbService.updateSongOrder(songsOrder).subscribe({
      next: () => {
        console.log('Album order updated:');
      },
      error: (error) => {
        this.album.title = this.originalName
        console.error('Error updating album:', error);
      }
    });
  }
}
