import { Component, OnInit } from '@angular/core';

// прототип получаемых данных
import { IData} from '../DataInterface';
////

// сервис для операций с данными
import {UserService} from '../user.service';
////

// уведомления
import { ToastrService } from 'ngx-toastr';
////

// связь с другими пользователями
import { HubService } from '../hub.service';
////

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  constructor(
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService, // уведомления
    private _hubService: HubService, // связь с другими пользователями
  ) { }

  pickedGames: IData[]; // массив выбранных игр  типа интерфейса IData[]


  private loadPickedGames() {// подгружаем все игры
    this._userServise.getAllPicked().subscribe((data: IData []) => {// забираем данные из переменной в наш массив
       this.pickedGames = data; // присваиваем данные массиву игр
       console.log(this.pickedGames); // проверяем массив пришедших данных
    });
  }

  ngOnInit() {
    this.loadPickedGames(); // подгружаем все выбранные игры
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
    this._hubService.deleteNotifier.subscribe( // подписываемся на событие удаления игры,совершенного другим пользователем
      n => this.loadPickedGames(),
      err => console.log(err),
      () => console.log('_hubService.deleteNotifier complete')
    );
    ////
  }


}
