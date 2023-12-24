import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SongDTO} from "../model/dto/songDTO";
import {Album} from "../model/album";
import {Worship} from "../model/worship";
import {WorshipDTO} from "../model/dto/worship-programDTO";
import {AlbumDTO} from "../model/dto/albumDTO";
import {IdDTO} from "../model/dto/id";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient) { }

  getSearchSongs() {
    return this.http.get<SongDTO[]>("http://localhost:3000/songs?_sort=name&_expand=album")
  }

  getAlbums() {
    return this.http.get<Album[]>("http://localhost:3000/albums?_sort=name")
  }

  getWorship() {
    return this.http.get<Worship[]>("http://localhost:3000/worships?_sort=name")
  }

  getWorshipByID(id: number) {
    return this.http.get<WorshipDTO>(`http://localhost:3000/worships/${id}?_sort=name&_embed=moments`)
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

  getHistory() {
    return this.http.get<IdDTO[]>(`http://localhost:3000/history`)
  }

  postHistory(id: number) {
    let idDTO: IdDTO = {id: id}
    return this.http.post<IdDTO>(`http://localhost:3000/history`, idDTO)
  }

  deleteHistoryByID(id: number) {
    return this.http.delete(`http://localhost:3000/history/${id}`)
  }

}
