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
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  constructor(
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService,
    private _hubService: HubService,
  ) { }

  pickedGames: IData[];


  private loadPickedGames() {// подгружаем все игры
    this._userServise.getAllPicked().subscribe((data: IData []) => {// забираем данные из переменной в наш массив
       this.pickedGames = data; // присваиваем данные массиву игр
       console.log(this.pickedGames); // проверяем массив пришедших данных
    });
  }

  ngOnInit() {
    this.loadPickedGames(); // подгружаем все выбранные игры
    this._hubService.pickNotifier.subscribe(
      n => this.loadPickedGames(),
      err => console.log(err),
      () => console.log('_hubService.pickNotifier complete')
    );
    this._hubService.unpickNotifier.subscribe(
      n => this.loadPickedGames(),
      err => console.log(err),
      () => console.log('_hubService.unpickNotifier complete')
    );
    this._hubService.deleteNotifier.subscribe(
      n => this.loadPickedGames(),
      err => console.log(err),
      () => console.log('_hubService.deleteNotifier complete')
    );
  }

}
