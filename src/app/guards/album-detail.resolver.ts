import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AlbumDTO} from "../model/dto/albumDTO";
import {DBService} from "../service/db.service";

@Injectable({ providedIn: 'root' })
export class AlbumResolver implements Resolve<AlbumDTO> {
  constructor(private dbService: DBService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {

    let id = route.params['id'];

    return this.dbService.getAlbumByID(id);
  }
}
