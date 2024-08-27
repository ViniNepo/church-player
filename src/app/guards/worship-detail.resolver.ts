import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {DBService} from "../service/db.service";
import {WorshipDTO} from "../model/dto/worship-programDTO";

@Injectable({providedIn: 'root'})
export class WorshipResolver implements Resolve<WorshipDTO> {
  constructor(private dbService: DBService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    let id = route.params['id'];

    return this.dbService.getWorshipByID(id)
  }
}
