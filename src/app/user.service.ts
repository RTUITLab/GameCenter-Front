import { Injectable, OnInit } from '@angular/core';
// для обращения к http
import { HttpClient } from '@angular/common/http';
////

// прототип получаемых данных
import {  IQueue, IAllGames, IPickedGames } from './DataInterface';
////

//
import { Observable } from 'rxjs';
////




@Injectable({
  providedIn: 'root'
})

export class UserService {
  public ic = 0;

  public game: IAllGames[]; // массив игр  типа интерфейса IAllGames[]

   /// private global_url = 'https://gamecenterback.azurewebsites.net/api/'; // сам сервер';
   private global_url = 'http://7565abbf.ngrok.io/api/';
  constructor(private http: HttpClient, // для предачи данных
  ) {
  }

  // private _url:string = 'https://jsonplaceholder.typicode.com/users/';//ссылка для получения данных

  public getAll(): Observable<IAllGames[]> {
    return this.http.get<IAllGames[]>(this.global_url + 'Gametype/'); // передаем все данные с ссылки
  }

  public addGame(game: string): Observable<Object> { // добавляем игру
    console.log('addGame');
    return this.http.post(this.global_url + `Gametype/` + game, '');

  }
  public delGame(game: string): Observable<Object> {// удаляем игру
    console.log('delGame ' + game);
    return this.http.delete<Object>(this.global_url + 'Gametype/delete/' + game);
  }
  public getAllPeople(): Observable<Object> { // получаем всех людей в очереди
    console.log(`getallpeople try to GET`);
    return this.http.get(this.global_url + `VkBot/getqueue/`);
  }
  public acceptUser(usernameId: string): Observable<Object> {
    console.log( `acceptUser` );
    return this.http.put<Object>(this.global_url + 'playermanager/accept/' + usernameId, '');
  }
  public declineUser(nameId: string , gamenameId: string, score: Number ): Observable<Object> {
    console.log( `declineUser`);
    return this.http.put<Object>(this.global_url + 'playermanager/refuse/' + nameId + '/' + gamenameId + '/' + score, '');
  }
  public declineAllUsers(name: string): Observable<Object> {
    console.log(`declineALLusers`);
    return this.http.put<Object>(this.global_url + `playermanager/deleteall/` + name, '');
  }

  public getAllPicked(): Observable<IPickedGames[]> {// получаем все выбранные игры
    console.log('getallpicked');
    return this.http.get<IPickedGames[]>(this.global_url + 'Gametype/selected/'); // передаем все данные с ссылки;
  }

  public pickGame(gameid: string): Observable<Object> {// выбираем игру
    console.log('pickGame ' + [gameid]);
    return this.http.put<Object>(this.global_url + 'Gametype/pickgames/', [gameid]); // посылаем запрос на изменение статуса на Selected
  }

  public getTop(): Observable<Object> {
    console.log(`loadTop`);
    return this.http.get<Object>(`${this.global_url}scores/`);
  }
  public getLast(): Observable<Object> {
    console.log(`loadLast`);
    return this.http.get<Object>(`${this.global_url}scores/last`);
  }
  public getRecords(gameid): Observable<Object> {
    console.log(`getRecords`);
    return this.http.get<Object>(`${this.global_url}scores/` + gameid);
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
    return this.http.put<Object>(this.global_url + 'Gametype/unpickgames/', [gameid]); // посылаем запрос на изменение статуса на Selected
  }

}






