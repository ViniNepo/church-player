import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {flatMap, Observable, of} from "rxjs";
import {DBService} from "../service/db.service";
import {WorshipDTO} from "../model/dto/worship-programDTO";
import {SongDTO} from "../model/dto/songDTO";

@Injectable({ providedIn: 'root' })
export class WorshipResolver implements Resolve<WorshipDTO> {
  private worshipDto: Observable<WorshipDTO>;
  private songsDto: Observable<SongDTO>;
  songs$ = of(SongDTO);
  constructor(private dbService: DBService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {

    let id = route.params['id'];

    // worship => {
    //   worship.moments.forEach(moment => {
    //     if (moment.songId != null) {
    //       this.dbService.getSongByMomentID(moment.songId).subscribe(song => {
    //         moment.song = song
    //         console.log(song)
    //       })
    //     }
    //   })

    // this.dbService.getWorshipByID(id).pipe(
      // flatMap(data => data.moments.forEach(moment => )),
      // )

    this.dbService.getWorshipByID(id).pipe()

    return this.dbService.getWorshipByID(id)
      // next: (worship) => {
      //   console.log(worship)
        // worship.moments.forEach(moment => {
        //   if (moment.songId != null) {
            // this.dbService.getSongByMomentID(moment.songId).subscribe(res => {
            //   moment.song = res
            //   console.log(moment.songId)
            // })
          // }
        // })
      // }

  }
}
