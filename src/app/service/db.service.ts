import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {SongDTO} from "../model/dto/songDTO";
import {Album} from "../model/album";
import {Worship} from "../model/worship";
import {WorshipDTO} from "../model/dto/worship-programDTO";
import {AlbumDTO} from "../model/dto/albumDTO";
import {HistoryDTO, IdDTO} from "../model/dto/historyDTO";
import {Song} from "../model/song";
import {Moment} from "../model/moment";
import {Observable, take, tap} from "rxjs";
import {History} from "../model/history";

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient) {
  }

  getSearchSongs() {
    return this.http.get<SongDTO[]>("http://localhost:3000/songs?_expand=album&_sort=name")
  }

  getSearchSongsByQuery(query: string) {
    return this.http.get<SongDTO[]>(`http://localhost:3000/songs?_expand=album&_sort=name&q=${query}`)
  }

  getAlbums() {
    return this.http.get<Album[]>("http://localhost:3000/albums").pipe(take(1))
  }

  getWorship() {
    return this.http.get<Worship[]>("http://localhost:3000/worships").pipe(take(1))
  }

  getSongs() {
    return this.http.get<Song[]>(`http://localhost:3000/songs`).pipe(take(1))
  }

  getHistory() {
    return this.http.get<HistoryDTO[]>(`http://localhost:3000/history?_expand=song&_expand=album`).pipe(take(1))
  }

  getHistoryDesc() {
    return this.http.get<HistoryDTO[]>(`http://localhost:3000/history?_expand=song&_expand=album&_sort=id&_order=desc`).pipe(take(1))
  }

  getMoments() {
    return this.http.get<Moment[]>(`http://localhost:3000/moments`).pipe(take(1))
  }

  getWorshipByID(id: number) {
    return this.http.get<WorshipDTO>(`http://localhost:3000/worships/${id}?_embed=moments`)
  }

  getSongByMomentID(id: number) {
    return this.http.get<SongDTO>(`http://localhost:3000/songs/${id}?_expand=album`)
  }

  getAlbumByID(id: number) {
    return this.http.get<AlbumDTO>(`http://localhost:3000/albums/${id}?_embed=songs`).pipe(take(1))
  }

  getSongByID(id: number) {
    return this.http.get<SongDTO>(`http://localhost:3000/songs/${id}?_expand=album`).pipe(take(1))
  }

  postHistory(dto: IdDTO) {
    return this.http.post<History>(`http://localhost:3000/history`, dto).pipe(take(1))
  }

  postWorship(worship: Worship) {
    return this.http.post<Worship>(`http://localhost:3000/worships`, worship).pipe(take(1))
  }

  postAlbum(album: Album) {
    return this.http.post<Album>(`http://localhost:3000/albums`, album).pipe(take(1))
  }

  postSong(song: Song) {
    return this.http.post<Song>(`http://localhost:3000/songs`, song).pipe(take(1))
  }

  postMoment(moment: Moment) {
    return this.http.post<Moment>(`http://localhost:3000/moments`, moment).pipe(take(1))
  }

  putMoment(moment: Moment) {
    return this.http.put<Moment>(`http://localhost:3000/moments/${moment.id}`, moment).pipe(take(1))
  }

  putAlbumName(album: Album) {
    return this.http.put<Album>(`http://localhost:3000/albums/${album.id}`, album).pipe(take(1))
  }

  putWorshipName(worship: Worship) {
    return this.http.put<Worship>(`http://localhost:3000/worships/${worship.id}`, worship).pipe(take(1))
  }

  patchSongTime(id, times) {
    let time = {"times_played": times}
    return this.http.patch<Song>(`http://localhost:3000/songs/${id}`, time).pipe(take(1))
  }

  deleteSongBtID(id: number) {
    return this.http.delete(`http://localhost:3000/songs/${id}`).pipe(take(1))
  }

  deleteAlbum(id: number) {
    return this.http.delete(`http://localhost:3000/albums/${id}`).pipe(take(1))
  }

  deleteHistoryByID(id: number) {
    return this.http.delete(`http://localhost:3000/history/${id}`).pipe(take(1))
  }

  deleteMomentByID(id: number) {
    return this.http.delete(`http://localhost:3000/moments/${id}`).pipe(take(1))
  }

  deleteWorshipByID(id: number) {
    return this.http.delete(`http://localhost:3000/worships/${id}`).pipe(take(1))
  }

  uploadImage(files: Array<File>) {
    let formData = new FormData();
    formData.append("file", files[0]);

    return this.http.post('/api/uploadImage', formData)
      .subscribe((response) => {
        console.log('response received is ', response);
      })
  }

  uploadFile(files: Array<File>) {
    let formData = new FormData();
    formData.append("file", files[0]);

    this.http.post('/api/uploadFile', formData)
      .subscribe((response) => {
        console.log('response received is ', response);
      })
  }

  openFile(fileName: string): Observable<any> {
    console.log('aqui')
    return this.http.get(`/api/open-file?fileName=${fileName}`)
  }

  // openFile() {
  //   if (!this.fileName) {
  //     console.error('Nome do arquivo não fornecido.');
  //     return;
  //   }
  //
  //   this.fileService.openFile(this.fileName).subscribe(
  //     (data) => {
  //       this.response = data;
  //     },
  //     (error) => {
  //       console.error('Erro ao abrir o arquivo:', error);
  //       this.response = 'Erro ao abrir o arquivo';
  //     }
  //   );
  // }

}
