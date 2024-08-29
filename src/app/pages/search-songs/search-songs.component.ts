import {Component, OnInit} from '@angular/core';
import {DBService} from "../../service/db.service";
import {SongWithAlbumDTO} from "../../model/dto/songDTO";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {

  songs: SongWithAlbumDTO[]
  filteredSongs: SongWithAlbumDTO[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private dbService: DBService
  ) {
    this.route.data.subscribe(
      (data: { songs: SongWithAlbumDTO[] }) => {
        this.songs = data.songs
        this.songs = this.songs || []
        this.filteredSongs = this.songs
      }
    )
  }

  ngOnInit() {
  }

  playSong(song: SongWithAlbumDTO): void {
    this.dbService.playSong(song.file).subscribe({
      next: () => {
        console.log('song playing')
      },
      error: (error) => {
        console.error('Error getting songs:', error);
      }
    });
  }

  searchSong(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();

    // Se searchTerm estiver vazio, exibe todas as músicas, caso contrário, aplica o filtro
    this.filteredSongs = this.searchTerm ?
      this.songs.filter(song => song.title.toLowerCase().includes(this.searchTerm)) :
      this.songs;
  }
}
