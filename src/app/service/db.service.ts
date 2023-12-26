import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SongDTO} from "../model/dto/songDTO";
import {Album} from "../model/album";
import {Worship} from "../model/worship";
import {WorshipDTO} from "../model/dto/worship-programDTO";
import {AlbumDTO} from "../model/dto/albumDTO";
import {IdDTO} from "../model/dto/id";
import {Song} from "../model/song";
import {Moment} from "../model/moment";

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient) { }

  getSearchSongs() {
    return this.http.get<SongDTO[]>("http://localhost:3000/songs?_expand=album")
  }

  getSearchSongsByQuery(query: string) {
    return this.http.get<SongDTO[]>(`http://localhost:3000/songs?_expand=album&q=${query}&_sort=name`)
  }

  getAlbums() {
    return this.http.get<Album[]>("http://localhost:3000/albums")
  }

  getWorship() {
    return this.http.get<Worship[]>("http://localhost:3000/worships")
  }

  getSongs() {
    return this.http.get<Song[]>(`http://localhost:3000/songs`)
  }

  getHistory() {
    return this.http.get<IdDTO[]>(`http://localhost:3000/history`)
  }

  getMoments() {
    return this.http.get<Moment[]>(`http://localhost:3000/moments`)
  }

  getWorshipByID(id: number) {
    return this.http.get<WorshipDTO>(`http://localhost:3000/worships/${id}?_embed=moments`)
  }

  getSongByMomentID(id: number) {
    return this.http.get<SongDTO>(`http://localhost:3000/songs/${id}?_expand=album`)
  }

  getAlbumByID(id: number) {
    return this.http.get<AlbumDTO>(`http://localhost:3000/albums/${id}?_embed=songs`)
  }

  getSongByID(id: number) {
    return this.http.get<SongDTO>(`http://localhost:3000/songs/${id}?_expand=album`)
  }

  postHistory(id: number) {
    let idDTO: IdDTO = {id: id}
    return this.http.post<IdDTO>(`http://localhost:3000/history`, idDTO)
  }

  postWorship(worship: Worship) {
    return this.http.post<Worship>(`http://localhost:3000/worships`, worship)
  }

  postAlbum(album: Album) {
    return this.http.post<Album>(`http://localhost:3000/albums`, album)
  }

  postSong(song: Song) {
    return this.http.post<Song>(`http://localhost:3000/songs`, song)
  }

  postMoment(moment: Moment) {
    return this.http.post<Moment>(`http://localhost:3000/moments`, moment)
  }

  putMoment(moment: Moment) {
    return this.http.post<Moment>(`http://localhost:3000/moments`, moment)
  }

  putAlbumName(album: Album) {
    return this.http.put<Album>(`http://localhost:3000/albums/${album.id}`, album)
  }

  deleteSong(id: number) {
    return this.http.delete(`http://localhost:3000/songs/${id}`)
  }

  deleteAlbum(id: number) {
    return this.http.delete(`http://localhost:3000/albums/${id}`)
  }

  deleteHistoryByID(id: number) {
    return this.http.delete(`http://localhost:3000/history/${id}`)
  }

  deleteMomentByID(id: number) {
    return this.http.delete(`http://localhost:3000/moments/${id}`)
  }

  deleteWorshipByID(id: number) {
    return this.http.delete(`http://localhost:3000/worships/${id}`)
  }

}
