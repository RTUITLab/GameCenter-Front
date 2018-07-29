import { Injectable } from '@angular/core';

// for SignalR
import { HubConnection } from '@aspnet/signalr';
import * as SignalR from '@aspnet/signalr';
////

import { GameManageComponent } from './game-manage/game-manage.component'; // окно управления играми
import { Observable, Subscriber } from '../../node_modules/rxjs';


@Injectable({
  providedIn: 'root',

})
export class HubService {
  public _hubConnection: HubConnection; // SignalR
  public hub_url = 'http://d75da873.ngrok.io'; // сам сервер

  public pickNotifier: Observable<Object>;
  private pickSubscriper: Subscriber<Object>;
  constructor(
  ) {
    console.log('HUB here');
    this.pickNotifier = new Observable<Object>(sub => this.pickSubscriper = sub);
  }
  public connect() {
    this._hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(this.hub_url + '/hub') // ссылка на сервер,с каким устанавливаем соединение
      .build(); // подготавливаем к старту

    // this._hubConnection = new HubConnection('http://localhost:5000/chat');

    this._hubConnection
      .start() // устанавливаем соединение
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :' + err));

    this._hubConnection.on('Pick', () => { // получаем данные из сервер
      console.log('Received');
      this.pickSubscriper.next();
    }
    );
  }
}
