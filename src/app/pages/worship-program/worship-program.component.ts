import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DBService} from "../../service/db.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorshipDTO} from "../../model/dto/worship-programDTO";
import {HistoryService} from "../../service/history.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SongDTO} from "../../model/dto/songDTO";
import {MomentDTO} from "../../model/dto/momentDTO";

@Component({
  selector: 'app-worship-program',
  templateUrl: './worship-program.component.html',
  styleUrls: ['./worship-program.component.scss']
})
export class WorshipProgramComponent implements OnInit {

  id: number;
  showDeleteModal = false
  showAddLabelModal = false
  originalName: string;
  worshipProgram: WorshipDTO = null;
  form: FormGroup;

  constructor(
    private dbService: DBService,
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.dbService.getWorshipByID(this.id)
          .subscribe(data => {
            this.worshipProgram = data
            this.originalName = this.worshipProgram.name

            this.worshipProgram.moments.forEach(value => {
              if (value.songId !== null) {
                this.dbService.getSongByMomentID(value.songId)
                  .subscribe(data2 => {
                    value.song = data2
                  })
              }
            })
          })
      })

    this.form = this.formBuilder.group({
      id: [null],
      label: [null],
      songId: [null],
      worshipId: [null],
    })
  }

  sentToHistory(id: number): void {
    this.historyService.sendMusicToHistory(id)
  }

  toggleDeleteWorship() {
    this.showDeleteModal = !this.showDeleteModal
  }

  toggleAddLabel() {
    this.showAddLabelModal = !this.showAddLabelModal
  }

  addLabel() {
    console.log(this.form.value)
    this.dbService.getMoments().subscribe(data => {
      let id = 0
      if (data.length > 0) {
        id = data.pop().id
      }

      this.form.controls['id'].setValue(id + 1);
      this.form.controls['worshipId'].setValue(this.worshipProgram.id)
      console.log(this.form.value)
      this.dbService.postMoment(this.form.value).subscribe(moment => {
        let dto: MomentDTO = {
          id: moment.id,
          label: moment.label,
          songId: moment.songID,
          worshipId: moment.worshipId,
          song: null,
        }
        this.worshipProgram.moments.push(dto)
        this.form.reset()
        this.toggleAddLabel()
      })
    })
  }

  deleteWorship() {
    this.worshipProgram.moments.forEach(moment => {
      this.dbService.deleteMomentByID(moment.id).subscribe()
    })
    this.dbService.deleteWorshipByID(this.worshipProgram.id).subscribe()
    this.toggleDeleteWorship()
    this.router.navigate(['/home'])
  }

  deleteLabel(id: number, index: number) {
    this.dbService.deleteMomentByID(id).subscribe()
    this.worshipProgram.moments.splice(index, 1);
  }
}
