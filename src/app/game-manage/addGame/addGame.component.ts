import { Component, OnInit , Inject} from '@angular/core';

// from https://material.angular.io/components/dialog/examples Всплывающее окно для Добавления / удаления игр
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
////

@Component({
  selector: 'app-add-game',
  templateUrl: './addGame.component.html',
  styleUrls: ['./addGame.component.css', './addGame.component-mob.css' ]
})

export class AddGameComponent implements OnInit {
  constructor(
    // from https://material.angular.io/components/dialog/examples Всплывающее окно для Добавления / удаления игр
      public dialogRef: MatDialogRef<AddGameComponent>, // для всплывающего окна
      @Inject(MAT_DIALOG_DATA) public data: any, // для всплывающего окна
    ////
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
