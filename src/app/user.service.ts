import { Injectable, OnInit } from '@angular/core';
// для обращения к http
import { HttpClient } from '@angular/common/http';
////

// прототип получаемых данных
import {  IQueue, IAllGames, IPickedGames } from './DataInterface';
////

//
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
////




@Injectable({
  providedIn: 'root'
})

export class UserService {
  public ic = 0;

  public game: IAllGames[]; // массив игр  типа интерфейса IAllGames[]

    public global_url = environment.baseUrl + 'api/';
  // public global_url = 'http://42aae2d7.ngrok.io/api/';
   // public global_url = 'http://8c98036f.ngrok.io/api/';
  constructor(private http: HttpClient, // для предачи данных
  ) {
  }

  // private _url:string = 'https://jsonplaceholder.typicode.com/users/';//ссылка для получения данных

  public getAll(): Observable<IAllGames[]> {
    return this.http.get<IAllGames[]>(this.global_url + 'Gametype/getall/'); // передаем все данные с ссылки
  }

  public addGame(game: string): Observable<Object> { // добавляем игру
    console.log('addGame');
    return this.http.post(this.global_url + `Gametype/`, {GameType: game});

  }
  public delGame(game: string): Observable<Object> {// удаляем игру
    console.log('delGame ' + game);
    return this.http.delete<Object>(this.global_url + 'Gametype/delete/' + game);
  }
  public getAllPeople(): Observable<Object> { // получаем всех людей в очереди
    console.log(`getallpeople try to GET`);
    return this.http.get(`${this.global_url}registration/queue/`);
  }
  public AddToQueue(nick: string, gameId: string): Observable<Object> { // получаем всех людей в очереди
    console.log(`${nick} ${gameId}`);
    return this.http.post(`${this.global_url}registration/`, {GameId: gameId, Username: nick} );
  }
  public acceptUser(usernameId: string): Observable<Object> {
    console.log( `acceptUser` );
    return this.http.put<Object>(this.global_url + 'PlayerManager/accept/' , {Id: usernameId});
  }
  public declineUser(nameId: string , gamenameId: string, score: Number ): Observable<Object> {
    console.log( `declineUser`);
    return this.http.put<Object>(this.global_url + 'PlayerManager/refuse/' + nameId + '/' + gamenameId + '/' + score, '');
  }
  public declineAllUsers(name: string): Observable<Object> {
    console.log(`declineALLusers`);
    return this.http.delete<Object>(this.global_url + `PlayerManager/deleteall/` + name);
  }

  public getAllPicked(): Observable<IPickedGames[]> {// получаем все выбранные игры
    console.log('getallpicked');
    return this.http.get<IPickedGames[]>(this.global_url + 'Gametype/selected/'); // передаем все данные с ссылки;
  }

  public pickGame(gameid: string): Observable<Object> {// выбираем игру
    console.log('pickGame ' + [gameid]);
    return this.http.put<Object>(this.global_url + 'Gametype/pickgame/', {Id: gameid}); // посылаем запрос на изменение статуса на Selected
  }
  public unpickGame(gameid: string): Observable<Object> {// удаляем игру из выбранных
    console.log('unpickGame ' + [gameid]);
    // посылаем запрос на изменение статуса на Selected
    return this.http.put<Object>(this.global_url + 'Gametype/unpickgame/', {Id: gameid});
  }
  public delAllRecords(gameid: string): Observable<Object> {// удаляем рекорды
    console.log('delALlRecords ' + [gameid]);
    return this.http.delete<Object>(this.global_url + 'scores/delete_all/' + gameid); // посылаем запрос на удаление всех рекордов
  }
  public getTop(): Observable<Object> {
    console.log(`loadTop`);
    return this.http.get<Object>(`${this.global_url}scores/top`);
  }
  public getLast(): Observable<Object> {
    console.log(`loadLast`);
    return this.http.get<Object>(`${this.global_url}scores/last`);
  }
  public getRecords(gameid): Observable<Object> {
    console.log(`getRecords`);
    return this.http.get<Object>(`${this.global_url}scores/` + gameid);
  }
  public delRecord(scoreid): Observable<Object> {
    console.log(`delRecord`);
    return this.http.delete<Object>(`${this.global_url}scores/delete/` + scoreid);
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

}






