import { Injectable ,OnInit} from '@angular/core';
//для обращения к http
import {HttpClient} from '@angular/common/http'
////

//прототип получаемых данных
import { IData ,TestPickedGamesIData} from './DataInterface';
////

//
import{Observable} from 'rxjs'
////

//for SignalR
import { HubConnection } from '@aspnet/signalr';
////



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient ,//для предачи данных

  ) { }

  private addGame_url:string = 'https://gamecenterback.azurewebsites.net/api/GameType/';//все игры
  private delGame_url:string = 'https://gamecenterback.azurewebsites.net/api/GameType/delete/';//все игры
  private pickGame_url:string = 'https://gamecenterback.azurewebsites.net/api/GameType/pickgames';//ссылка для выбора игр
  private unpickGame_url:string = 'https://gamecenterback.azurewebsites.net/api/GameType/unpickgames';//ссылка для удаления из выбранных
  private pickedGames_url:string = 'https://gamecenterback.azurewebsites.net/api/GameType/selected/';//все выбранные игры
  //private _url:string = 'https://jsonplaceholder.typicode.com/users/';//ссылка для получения данных
 
  public getAll():Observable<IData []>{
    return this.http.get<IData []>(this.addGame_url);//передаем все данные с ссылки
  }

  public addGame(game:string):Observable<Object>{//добавляем игру
    console.log("addGame");
    return this.http.post(this.addGame_url + game,'');
 
  }
  public delGame(game:string):Observable<Object>{//удаляем игру
    console.log("delGame "+game);
     return this.http.delete<Object>(this.delGame_url + game);
  }

  public getAllPicked():Observable<Object>{//получаем все выбранные игры
    return this.http.get<Object>(this.pickedGames_url);//передаем все данные с ссылки
  }

  public pickGame(gameid:string):Observable<Object>{//выбираем игру
    console.log("pickGame "+ [gameid]);
    return this.http.put<Object>(this.pickGame_url,[gameid]);//посылаем запрос на изменение статуса на Selected
  }

  public unpickGame(gameid:string):Observable<Object>{//удаляем игру из выбранных 
    console.log("unpickGame "+ [gameid]);
    return this.http.put<Object>(this.unpickGame_url,[gameid]);//посылаем запрос на изменение статуса на Selected
  }

}

export class SomeComponent implements OnInit {
  private _hubConnection: HubConnection;
  nick = '';
  message = '';
  messages: string[] = [];

  public sendMessage(): void {
    this._hubConnection
      .invoke('sendToAll', this.nick, this.message)
      .catch(err => console.error(err));
  }

  ngOnInit() {
    this.nick = window.prompt('Your name:', 'John');

    //this._hubConnection = new HubConnection('http://localhost:5000/chat');

    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

      this._hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
        const text = `${nick}: ${receivedMessage}`;
        this.messages.push(text);
      });

    }
}


 


