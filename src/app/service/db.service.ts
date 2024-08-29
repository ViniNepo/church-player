import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateSongDTO, SongDTO, SongUpdateOrderDTO, SongWithAlbumDTO} from "../model/dto/songDTO";
import {Album} from "../model/album";
import {Worship} from "../model/worship";
import {CreateWorshipDTO, WorshipDTO} from "../model/dto/worship-programDTO";
import {BehaviorSubject, catchError, Observable, take, tap, throwError} from "rxjs";
import {Song} from "../model/song";
import {AlbumDTO, CreateAlbumDTO} from "../model/dto/albumDTO";
import {Moment} from "../model/moment";
import {CreateMomentDTO, MomentOrderDTO} from "../model/dto/momentDTO";
import {CreateSectionDTO} from "../model/dto/sectionDTO";

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient) {
  }

  private dataSource = new BehaviorSubject<any>(null);

  // Observable que será usado para assinar
  currentData = this.dataSource.asObservable();

  // Método para atualizar os dados
  changeData(data: any) {
    this.dataSource.next(data);
  }

  playSong(path: string) {
    return this.http.get(`/api/file-control/${path}`).pipe(
      catchError(error => {
        console.error('Error while trying to play song', error);
        return throwError(error);
      })
    );
  }


  //ALBUMS
  createAlbum(album: CreateAlbumDTO) {
    return this.http.post('/api/albums', album).pipe(
      catchError(error => {
        console.error('Creating album failed', error);
        return throwError(error);
      })
    );
  }
  findAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('/api/albums').pipe(
      catchError(error => {
        console.error('Error getting all albums', error);
        return throwError(error);
      })
    );
  }

  findAlbumByID(id: string): Observable<AlbumDTO> {
    return this.http.get<AlbumDTO>(`/api/albums/${id}`).pipe(
      catchError(error => {
        console.error('Error getting album by id', error);
        return throwError(error);
      })
    );
  }

  updateAlbum(album: Album) {
    return this.http.patch<Album>('/api/albums', album).pipe(
      catchError(error => {
        console.error('Update failed', error);
        return throwError(error);
      })
    );
  }

  deleteAlbum(id: string) {
    return this.http.delete(`/api/albums/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  //SONGS
  deleteSong(id: string) {
    return this.http.delete(`/api/songs/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  createSong(songs: CreateSongDTO[]) {
    return this.http.post(`/api/songs`, songs).pipe(
      catchError(error => {
        console.error('Creating failed', error);
        return throwError(error);
      })
    );
  }

  updateSong(song: Song) {
    return this.http.patch<Song>('/api/songs', song).pipe(
      catchError(error => {
        console.error('Update failed', error);
        return throwError(error);
      })
    );
  }

  updateSongOrder(songs: SongUpdateOrderDTO[]) {
    return this.http.patch<SongUpdateOrderDTO[]>('/api/songs/orders', songs).pipe(
      catchError(error => {
        console.error('Update orders failed', error);
        return throwError(error);
      })
    );
  }

  findAll(): Observable<SongWithAlbumDTO[]> {
    return this.http.get<SongWithAlbumDTO[]>(`/api/songs`).pipe(
      catchError(error => {
        console.error('Error getting all songs', error);
        return throwError(error);
      })
    );
  }

  //WORSHIP
  createWorship(worship: CreateWorshipDTO) {
    return this.http.post('/api/worships', worship).pipe(
      catchError(error => {
        console.error('Creating worship failed', error);
        return throwError(error);
      })
    );
  }
  findAllWorships(): Observable<Worship[]> {
    return this.http.get<Worship[]>('/api/worships');
  }

  getWorshipByID(id: string): Observable<WorshipDTO> {
    return this.http.get<WorshipDTO>(`/api/worships/${id}`)
  }

  updateWorship(worship: Worship) {
    return this.http.patch<Worship>('/api/worships', worship).pipe(
      catchError(error => {
        console.error('Update worship failed', error);
        return throwError(error);
      })
    );
  }

  deleteWorship(id: string) {
    return this.http.delete(`/api/worships/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  //MOMENTS
  updateMoment(moment: Moment) {
    return this.http.patch<Moment>('/api/moments', moment).pipe(
      catchError(error => {
        console.error('Update moment failed', error);
        return throwError(error);
      })
    );
  }

  updateMomentsOrder(moments: MomentOrderDTO[]) {
    return this.http.patch<SongUpdateOrderDTO[]>('/api/moments/orders', moments).pipe(
      catchError(error => {
        console.error('Update moments failed', error);
        return throwError(error);
      })
    );
  }

  createMoment(moment: CreateMomentDTO) {
    return this.http.post('/api/moments', moment).pipe(
      catchError(error => {
        console.error('Creating moment failed', error);
        return throwError(error);
      })
    );
  }

  deleteMoment(id: string) {
    return this.http.delete(`/api/moments/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }

  //SECTIONS
  createSection(section: CreateSectionDTO) {
    return this.http.post('/api/sections', section).pipe(
      catchError(error => {
        console.error('Creating section failed', error);
        return throwError(error);
      })
    );
  }

  deleteSection(id: string) {
    return this.http.delete(`/api/sections/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }
}
