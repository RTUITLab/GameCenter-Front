import { Component, OnInit } from '@angular/core';

// from https://material.angular.io/components/autocomplete/examples Фильтр вводимого названия
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
import { IData } from '../DataInterface';
////

// уведомления
import { ToastrService } from 'ngx-toastr';
import { HubService } from '../hub.service';
////



@Component({
  selector: 'app-game-manage',
  templateUrl: './game-manage.component.html',
  styleUrls: ['./game-manage.component.css',
    './game-manage.component-mob.css'] // для ширины экрана 900px
})


export class GameManageComponent implements OnInit {


  constructor(
    public dialog: MatDialog, // всплывающее окно для добавления игры
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService, // уведомления
    private _hubService: HubService
  ) { }

  public games: IData[]; // массив игр  типа интерфейса IData[]

  pickedGames: IData[]; // массив выбранных игр  типа интерфейса IData[]

  // from https://material.angular.io/components/autocomplete/examples

  myControl = new FormControl();
  filteredGames: Observable<string[]>; // отфильтрованные данные из input
  ////

  public newGame: string; // переменная для добавления игры по имени actGame
  private oldGame: string; // переменная для добавления игры по имени actGame

  ////////////////////
  /*
  private _hubConnection: HubConnection;
  message = '1516';
  messages: string[] = [];
  data;
  private global_url:string = 'http://51425529.ngrok.io/api/GameType/';//сам сервер

  public sendMessage(): void {
    this.data =  `Sent: ${this.message}`;

    if(this._hubConnection){
      this._hubConnection.invoke('Pick',this.data); //посылаем данные на сервер
      console.log(this.data);
    }
    //this.messages.push(data);//локально заносим данные

    /*this._hubConnection
    .invoke('sendToAll', this.nick, this.message)
    .catch(err => console.error(err));
  }
  ////////////////////
  */
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
      console.log(result);
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
    return this._userServise.getAll().subscribe((data: IData[]) => { // забираем данные из переменной в наш массив
      this.games = data; // присваиваем данные массиву игр
      this.myControl.setValue(''); // важная штука
      console.log('Game-manage-all');
      console.log(this.games); // проверяем массив пришедших данных
    });
  }

  public loadPickedGames() { // подгружаем все игры
    this._userServise.getAllPicked().subscribe((data: IData[]) => { // забираем данные из переменной в наш массив
      this.pickedGames = data; // присваиваем данные массиву игр
      console.log(data); // проверяем массив пришедших данных
    });
  }

  private pick(Gamename: string) { // выбираем игру
    const gameId = this.games.find(g => g.name === Gamename).gameId;
    this._userServise.pickGame(gameId)
      .subscribe(
        _ => this.loadPickedGames(),
        e => { this.toastr.error(`Игра ${Gamename} уже выбрана`, `Игра не была выбрана`); },
        () => this.toastr.success(`Игра ${Gamename} была выбрана`)
      ); // обновляем статус на Selected

  }
  /*private pick(Gamename:string){ // выбираем игру
    const gameId = this.games.find(g => g.name === Gamename).gameId;
    this._userServise.pickGame(gameId)
        .then(()=>{
                   this.toastr.success(`Игра ${Gamename} была выбрана`)})
        .catch(()=>this.toastr.error(`Игра ${Gamename} уже выбрана`,`Игра не была выбрана`));
        this.loadPickedGames();
  }
*/
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

     // from https://material.angular.io/components/autocomplete/examples

    this.filteredGames = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)) // посылаем значение в фильтр

    );
    ////

    this.loadAllGames(); // подгружаем все игры
    this.loadPickedGames(); // подгружаем все выбранные игры
    this._hubService.pickNotifier.subscribe(
      n => this.loadPickedGames(),
      err => console.log(err),
      () => console.log('_hubService.pickNotifier complete')
    );
    //////////////////
    /*
      this._hubConnection = new SignalR.HubConnectionBuilder()
        .withUrl('http://51425529.ngrok.io/hub') // ссылка на сервер,с каким устанавливаем соединение
        .build(); // подготавливаем к старту

     // this._hubConnection = new HubConnection('http://localhost:5000/chat');

    this._hubConnection
      .start() // устанавливаем соединение
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :'+ err) );



      this._hubConnection.on('Pick', (data: any) => {    // получаем данные из сервера
        const received = `Received: ${data}`;
        console.log(received);
        this.messages.push(received);          // записываем в локальные данные
      });
*/
  }




   // from https://material.angular.io/components/autocomplete/examples
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
