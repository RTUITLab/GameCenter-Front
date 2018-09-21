import { Injectable } from '@angular/core';

// for SignalR
import { HubConnection } from '@aspnet/signalr';
import * as SignalR from '@aspnet/signalr';
////

import { GameManageComponent } from './game-manage/game-manage.component'; // окно управления играми
import { Observable, Subscriber } from 'rxjs';

import {IQueue} from './DataInterface';


@Injectable({
  providedIn: 'root',

})
export class HubService {
  public _hubConnection: HubConnection; // SignalR
 // public hub_url = 'https://gamecenterback.azurewebsites.net'; // сам сервер
 public hub_url = 'http://4412d474.ngrok.io';
  peopleQueue: IQueue[]; // массив людей в очереди

  public pickNotifier: Observable<Object>;
  private pickSubscriber: Subscriber<Object>;

  public unpickNotifier: Observable<Object>;
  private unpickSubscriber: Subscriber<Object>;

  public queueNotifier: Observable<Object>;
  private queueSubscriber: Subscriber<Object>;

  public addNotifier: Observable<Object>;
  private addSubscriber: Subscriber<Object>;

  public deleteNotifier: Observable<Object>;
  private deleteSubscriber: Subscriber<Object>;
  constructor(
  ) {
    console.log('HUB here');
    this.pickNotifier = new Observable<Object>(sub => this.pickSubscriber = sub);
    this.unpickNotifier = new Observable<Object>(sub => this.unpickSubscriber = sub);
    this.queueNotifier = new Observable<Object>(sub => this.queueSubscriber = sub );
    this.addNotifier = new Observable<Object>(sub => this.addSubscriber = sub);
    this.deleteNotifier = new Observable<Object>(sub => this.deleteSubscriber = sub);
  }
  public rotateToQueue() { // Отсылаем в очередь
    return this.peopleQueue;
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
      console.log('Received Pick');
      this.pickSubscriber.next();
    }
    );
    this._hubConnection.on('Unpick', () => { // получаем данные из сервер
      console.log('Received Unpick');
      this.unpickSubscriber.next();
    }
    );
    this._hubConnection.on('Queue', () => { // получаем данные из сервер
      console.log('Received NewQueue');
      this.queueSubscriber.next();
    }
    );
    this._hubConnection.on('Add', () => { // получаем данные из сервер
      console.log('Received Add');
      this.addSubscriber.next();
    }
    );
    this._hubConnection.on('Delete', () => { // получаем данные из сервер
      console.log('Received Delete');
      this.deleteSubscriber.next();
    }
    );
  }
}
