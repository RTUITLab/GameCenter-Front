import { Component, OnInit } from '@angular/core';

// прототип получаемых данных
import { IPickedGames } from '../DataInterface';
////
// from https://material.angular.io/components/autocomplete/examples Фильтр вводимого названия
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, find } from 'rxjs/operators';
////
// сервис для операций с данными
import { UserService } from '../user.service';
////
// уведомления
import { ToastrService } from 'ngx-toastr';
////
// связь с другими пользователями
import { HubService } from '../hub.service';
////
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddQueueComponent implements OnInit {

  constructor(
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService, // уведомления
    private _hubService: HubService // связь с другими пользователями
  ) { }
  // pickedGames: IPickedGames[]; // массив выбранных игр  типа интерфейса IPickedGames[]
  public pickedGames: IPickedGames [] ;
  ////
    // from https://material.angular.io/components/autocomplete/examples || фильтр автозаполнения поля ввода

    myControl = new FormControl();
    filteredGames: Observable<string[]>; // отфильтрованные данные из input
    ////
    public loadPickedGames() { // подгружаем все игры
      this._userServise.getAllPicked().subscribe((data: IPickedGames[]) => { // забираем данные из переменной в наш массив
        this.pickedGames = data; // присваиваем данные массиву игр
        this.myControl.setValue(''); // важная штука
      });
    }
    public addToQueue(nick: string, pickedGame: string ) {
      if (nick === '') {
        this.toastr.error(`Псевдоним не введён`);
      } else {
        const gameId = this.pickedGames.find(g => g.gameName === pickedGame).gameId; // находим id выбранной игры для отправки
        console.log(nick + gameId);
        this._userServise.AddToQueue(nick, gameId).subscribe(
          _ => {},
          e => { this.filteredGames = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))); // посылаем значение в фильтр
            this.toastr.error(`Пользователь не добавлен в очередь`); },
          () => this.toastr.success(`Пользователь добавлен в очередь`)
        );
      }
    }
    ngOnInit() {
      this.loadPickedGames(); // подгружаем все выбранные игры
        // from https://material.angular.io/components/autocomplete/examples || фильтр автозаполнения поля ввода

        this.filteredGames = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)) // посылаем значение в фильтр
        );
      ////
  }
        // from https://material.angular.io/components/autocomplete/examples || фильтр автозаполнения поля ввода
  private _filter(value: any): string[] {
    console.log(JSON.stringify(this.pickedGames) + 'pickedGamess' );
    const filterValue = value.toLowerCase();

    if (!this.pickedGames) {
      return ['wait for load']; // возвращем , если еще не загружены данные
    }

    return this.pickedGames
      .map(game => game.gameName)  // отбираем среди данных только имена игр
      .filter(game => game.toLowerCase().indexOf(filterValue) !== -1); // фильтруем по словосочетаниям
  }
  ////

}

