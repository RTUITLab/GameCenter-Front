import { Component, OnInit , Inject} from '@angular/core';

// from https://material.angular.io/components/dialog/examples Всплывающее окно для Добавления / удаления игр
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
////

// сервис для операций с данными
import { UserService } from '../../user.service';
////

// интерфейс данных
import { IAllGames } from '../../DataInterface';
////

// from https://material.angular.io/components/autocomplete/examples Фильтр вводимого названия
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
////

@Component({
  selector: 'app-del-game',
  templateUrl: './del-game.component.html',
  styleUrls: ['./del-game.component.scss']
})
export class DelGameComponent implements OnInit {


  constructor(
    // from https://material.angular.io/components/dialog/examples Всплывающее окно для Добавления / удаления игр
      public dialogRef: MatDialogRef<DelGameComponent>, // для всплывающего окна
      @Inject(MAT_DIALOG_DATA) public data: any, // для всплывающего окна
    ////
    private _userService: UserService, // сервис для получения данных
  ) {}

  public games: IAllGames[]; // переменная для хранения данных о всех играх

  // from https://material.angular.io/components/autocomplete/examples
  myControl = new FormControl();
  filteredGames: Observable<string[]>; // отфильтрованные данные из input
  ////
  onNoClick(): void {
    this.dialogRef.close();
  }

  private loadAllGames() { // подгружаем все игры
   return this._userService.getAll().subscribe((data: IAllGames []) => { // забираем данные из переменной в наш массив
       this.games = data; // присваиваем данные массиву игр
        this.myControl.setValue(''); // важная штука
    });
  }

  ngOnInit() {
    // from https://material.angular.io/components/autocomplete/examples
      this.filteredGames = this.myControl.valueChanges.pipe(
       startWith(''),
        map(value => this._filter(value)) // посылаем значение в фильтр

      );
    ////

    this.loadAllGames(); // подгружаем все игры
  }
  // from https://material.angular.io/components/autocomplete/examples
    private _filter(value: any): string[] {

      const filterValue = value.toLowerCase();
      if (!this.games) {
        return [`wait for load`]; // возвращем , если еще не загружены данные
      }
      return this.games
      .map(game => game.name) // отбираем среди данных только имена игр
      .filter(game => game.toLowerCase().indexOf(filterValue) !== -1); // фильтруем по словосочетаниям
    }
  ////

}
