import { Component, OnInit } from '@angular/core';

// from https://material.angular.io/components/autocomplete/examples Фильтр вводимого названия
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, find } from 'rxjs/operators';
////

// from https://material.angular.io/components/dialog/examples Всплывающее окно для Добавления / удаления игр
import { MatDialog } from '@angular/material';
import { AddGameComponent } from './addGame/addGame.component';
import { DelGameComponent } from './del-game/del-game.component';
////

// сервис для операций с данными
import { UserService } from '../user.service';
////

// прототип получаемых данных
import { IAllGames , IPickedGames } from '../DataInterface';
////

// уведомления
import { ToastrService } from 'ngx-toastr';
////

// связь с другими пользователями
import { HubService } from '../hub.service';
////



@Component({
  selector: 'app-game-manage',
  templateUrl: './game-manage.component.html',
  styleUrls: ['./game-manage.component.scss',
    './game-manage.component-mob.scss'] // для ширины экрана 900px
})


export class GameManageComponent implements OnInit {


  constructor(
    public dialog: MatDialog, // всплывающее окно для добавления игры
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService, // уведомления
    private _hubService: HubService // связь с другими пользователями
  ) { }

  public games: IAllGames[]; // массив игр  типа интерфейса IAllGames[]

  // pickedGames: IPickedGames[]; // массив выбранных игр  типа интерфейса IPickedGames[]
  pickedGames: IPickedGames [] = [
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
   { name: 'sergei',
    gameId: 'serf'},
  ];
  // from https://material.angular.io/components/autocomplete/examples || фильтр автозаполнения поля ввода

  myControl = new FormControl();
  filteredGames: Observable<string[]>; // отфильтрованные данные из input
  unPickedGames: Observable<string[]>;
  ////

  public newGame: string; // переменная для добавления игры по имени actGame
  private oldGame: string; // переменная для удаления игры по имени actGame

  private addGame(): void { // функция для кнопки для открытия всплывающего окна

    const dialogRef = this.dialog.open(AddGameComponent, {
      width: '512px', // ширина всплывающего окна
      height: '228px', // высота всплывающего окна
      data: { Game: this.newGame } // название новой игры из Inputa
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newGame = result;
      if (this.newGame !== undefined) {
        // добавляем игру по имени this.newGame
        this._userServise.addGame(this.newGame)
          .subscribe(
            _ => this.loadAllGames(),
            e => {
              this.toastr.error(`Игра ${this.newGame} уже существует`, `Игра не была добалена`);
            },
            () => this.toastr.success(`Игра ${this.newGame} добавлена`)
          );
      }
    });
  }
  private delGame(): void { // функция для кнопки для открытия всплывающего окна

    const dialogRef = this.dialog.open(DelGameComponent, {
      width: '512px', // ширина всплывающего окна
      height: '228px', // высота всплывающего окна
      data: { oldGame: this.oldGame } // название новой игры из Inputa
    });

    dialogRef.afterClosed().subscribe(result => {
      this.oldGame = result;
      if (this.oldGame !== undefined) {
        // добавляем игру по имени this.newGame
        this._userServise.delGame(this.oldGame)
          .subscribe(
            _ => {
              this.loadAllGames();
              this.loadPickedGames();
            },
            e => {
              this.toastr.error(`Игра ${this.oldGame} уже удалена или её не существует`, `Игра не была удалена`);
            },
            () => this.toastr.success(`Игра ${this.oldGame} удалена`)
          );
      }
    });
  }

  public loadAllGames() { // подгружаем все игры
    return this._userServise.getAll().subscribe((data: IAllGames[]) => { // забираем данные из переменной в наш массив
      this.games = data; // присваиваем данные массиву игр
      this.myControl.setValue(''); // важная штука
    });
  }

  public loadPickedGames() { // подгружаем все игры
    this._userServise.getAllPicked().subscribe((data: IPickedGames[]) => { // забираем данные из переменной в наш массив
      this.pickedGames = data; // присваиваем данные массиву игр
    });
  }
  private pick(Gamename: string) { // выбираем игру
    const gameId = this.games.find(g => g.name === Gamename).gameId;
    this._userServise.pickGame(gameId)
      .subscribe(
        _ => {this.loadPickedGames();
          // from https://material.angular.io/components/autocomplete/examples || фильтр автозаполнения поля ввода

          this.filteredGames = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)) // посылаем значение в фильтр

          ); },
         ////
        e => { this.toastr.error(`Игра ${Gamename} уже выбрана`, `Игра не была выбрана`); },
        () => this.toastr.success(`Игра ${Gamename} была выбрана`)
      ); // обновляем статус на Selected

  }
  private unpick(game: string) { // удаляем из выбранных игр
    const gameName = this.games.find(g => g.gameId === game).name;
    this._userServise.unpickGame(game)
      .subscribe(
        _ => this.loadPickedGames(),
        e => this.toastr.error(`Игра ${gameName} уже удалена из выбранных`, `Игра не была удалена из выбранных`),
        () => this.toastr.success(`Игра ${gameName} удалена из выбранных`)
      );

  }

  ngOnInit() {

    // from https://material.angular.io/components/autocomplete/examples || фильтр автозаполнения поля ввода

      this.filteredGames = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)) // посылаем значение в фильтр

      );
    ////

    this.loadAllGames(); // подгружаем все игры
    this.loadPickedGames(); // подгружаем все выбранные игры
    console.log(this.pickedGames);
    // SignalR || Связь с другими пользователями
    this._hubService.pickNotifier.subscribe( // подписываемся на событие выбора игры,совершенного другим пользователем
      n => this.loadPickedGames(),
      err => console.log(err),
      () => console.log('_hubService.pickNotifier complete')
    );
    this._hubService.unpickNotifier.subscribe( // подписываемся на событие удаления игры из выбранных игр,совершенного другим пользователем
      n => this.loadPickedGames(),
      err => console.log(err),
      () => console.log('_hubService.unpickNotifier complete')
    );
    this._hubService.addNotifier.subscribe( // подписываемся на событие добавления игры,совершенного другим пользователем
      n => this.loadAllGames(),
      err => console.log(err),
      () => console.log('_hubService.addNotifier complete')
    );
    this._hubService.deleteNotifier.subscribe( // подписываемся на событие удаления игры,совершенного другим пользователем
      n => {this.loadAllGames();
            this.loadPickedGames(); },
      err => console.log(err),
      () => console.log('_hubService.deleteNotifier complete')
    );
    ////
  }
  // from https://material.angular.io/components/autocomplete/examples || фильтр автозаполнения поля ввода
  private _filter(value: any): string[] {

    const filterValue = value.toLowerCase();

    if (!this.games) {
      return ['wait for load']; // возвращем , если еще не загружены данные
    }

    return this.games
      .map(game => game.name)  // отбираем среди данных только имена игр
      .filter(game => game.toLowerCase().indexOf(filterValue) !== -1); // фильтруем по словосочетаниям
  }
  ////


}
