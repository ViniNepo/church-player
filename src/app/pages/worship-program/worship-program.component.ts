import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DBService} from "../../service/db.service";
import {ActivatedRoute} from "@angular/router";
import {WorshipDTO} from "../../model/dto/worship-programDTO";
import {HistoryService} from "../../service/history.service";

@Component({
  selector: 'app-worship-program',
  templateUrl: './worship-program.component.html',
  styleUrls: ['./worship-program.component.scss']
})
export class WorshipProgramComponent implements OnInit {

  id: number;
  worshipProgram: WorshipDTO = null;

  constructor(
    private dbService: DBService,
    private route: ActivatedRoute,
    private historyService: HistoryService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.dbService.getWorshipByID(this.id)
          .subscribe(data => {
            this.worshipProgram = data
            console.log(data)

            this.worshipProgram.moments.forEach(value => {
              this.dbService.getSongByMomentID(value.songId)
                .subscribe(data2 => {
                  value.song = data2
                  console.log(value.song)
                })
            })
          })

      })

  }

  sentToHistory(id: number): void {
    this.historyService.sendMusicToHistory(id)
  }

  addSong() {
    // console.log(val);
    // this.musics.splice(val, 1);
  }
  deleteSong(val: number) {
    console.log(val);
    // this.musics.splice(val, 1);
  }
}
