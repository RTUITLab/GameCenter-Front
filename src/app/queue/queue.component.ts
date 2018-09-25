import { Component, OnInit } from '@angular/core';

// прототип получаемых данных
import { IPickedGames, IQueue} from '../DataInterface';
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
    private toastr: ToastrService, // уведомления
    private _hubService: HubService, // связь с другими пользователями
  ) { }

  pickedGames: IPickedGames[]; // массив выбранных игр  типа интерфейса IPickedGames[]
  peopleQueue: IQueue[]; // массив людей в очереди


  private loadPickedGames() {// подгружаем все игры
    this._userServise.getAllPicked().subscribe((data: IPickedGames []) => {// забираем данные из переменной в наш массив
       this.pickedGames = data; // присваиваем данные массиву игр
    });
  }
  private loadPeople() { // подгружаем очередь
    this._userServise.getAllPeople().subscribe((data: IQueue []) => {// забираем данные из переменной в наш массив
      this.peopleQueue = data; // присваиваем данные массиву игр
      console.log(data + 'QUeue '); // проверяем массив пришедших данных
   });
  }
  private sendPeople() {
    this._hubService._hubConnection.invoke('New', {});
  }

  private decline_all(name: string) { // отменяем все заявки конкретной игры
  }
  private decline_user(name: string) { // отклоняем заявку желающего поиграть
  }
  private accept_user(name: string) { // отклоняем заявку желающего поиграть
  }

  ngOnInit() {
    this.loadPickedGames(); // подгружаем все выбранные игры
    this.loadPeople(); // Подгружаем людей в очередь
    console.log(this.peopleQueue + `QUEUESngOnInit`);
    // SignalR || Связь с другими пользователями
    this._hubService.pickNotifier.subscribe( // подписываемся на событие выбора игры,совершенного другим пользователем
      n => this.loadPickedGames(),
      err => console.log(err),
      () => console.log('_hubService.pickNotifier complete')
    );
    this._hubService.queueNotifier.subscribe( // подписываемся на событие выбора игры,совершенного другим пользователем
      n => this.loadPeople(),
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
