import { Injectable, OnInit } from '@angular/core';
// для обращения к http
import { HttpClient } from '@angular/common/http';
////

// прототип получаемых данных
import { IData } from './DataInterface';
////

//
import { Observable } from 'rxjs';
////




@Injectable({
  providedIn: 'root'
})

export class UserService {
  public ic = 0;

  public game: IData[]; // массив игр  типа интерфейса IData[]

  private global_url = 'http://d4bda822.ngrok.io/api/Gametype/'; // сам сервер
  constructor(private http: HttpClient, // для предачи данных
  ) {
  }

  // private _url:string = 'https://jsonplaceholder.typicode.com/users/';//ссылка для получения данных

  public getAll(): Observable<IData[]> {
    return this.http.get<IData[]>(this.global_url); // передаем все данные с ссылки
  }

  public addGame(game: string): Observable<Object> { // добавляем игру
    console.log('addGame');
    return this.http.post(this.global_url + game, '');

  }
  public delGame(game: string): Observable<Object> {// удаляем игру
    console.log('delGame ' + game);
    return this.http.delete<Object>(this.global_url + 'delete/' + game);
  }

  public getAllPicked(): Observable<IData[]> {// получаем все выбранные игры
    console.log('user-service');
    return this.http.get<IData[]>(this.global_url + 'selected/'); // передаем все данные с ссылки;
  }

  public pickGame(gameid: string): Observable<Object> {// выбираем игру
    console.log('pickGame ' + [gameid]);
    return this.http.put<Object>(this.global_url + 'pickgames/', [gameid]); // посылаем запрос на изменение статуса на Selected
  }
  /* public pickGame(gameid:string){
     console.log('pickGame '+ [gameid]);
     if(this._hubConnection){
       return this._hubConnection.invoke('Pick',gameid); //посылаем данные на сервер
     }
     this._hubConnection.on('Pick', (data: any) => {   //получаем данные из сервера
       const received = `Received: ${data}`;

     });
   }
   */
  public unpickGame(gameid: string): Observable<Object> {// удаляем игру из выбранных
    console.log('unpickGame ' + [gameid]);
    return this.http.put<Object>(this.global_url + 'unpickgames/', [gameid]); // посылаем запрос на изменение статуса на Selected
  }

}






