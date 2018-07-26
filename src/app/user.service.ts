import { Injectable ,OnInit} from '@angular/core';
//для обращения к http
import {HttpClient} from '@angular/common/http'
////

//прототип получаемых данных
import { IData} from './DataInterface';
////

//
import{Observable} from 'rxjs'
////

//for SignalR
import { HubConnection } from '@aspnet/signalr';
import * as SignalR from '@aspnet/signalr'
////



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient ,//для предачи данных
    
  ) { }
  
  private global_url:string = "http://51425529.ngrok.io/api/GameType/";//сам сервер
  //private _url:string = 'https://jsonplaceholder.typicode.com/users/';//ссылка для получения данных
  
  public getAll():Observable<IData []>{
    return this.http.get<IData []>(this.global_url);//передаем все данные с ссылки
  }
  
  public addGame(game:string):Observable<Object>{//добавляем игру
    console.log("addGame");
    return this.http.post(this.global_url + game,'');
    
  }
  public delGame(game:string):Observable<Object>{//удаляем игру
    console.log("delGame "+game);
    return this.http.delete<Object>(this.global_url + 'delete/' + game);
  }
  
  public getAllPicked():Observable<Object>{//получаем все выбранные игры
    return this.http.get<Object>(this.global_url + 'selected/');//передаем все данные с ссылки
  }
  
  public pickGame(gameid:string):Observable<Object>{//выбираем игру
    console.log("pickGame "+ [gameid]);
    return this.http.put<Object>(this.global_url + 'pickgames/',[gameid]);//посылаем запрос на изменение статуса на Selected
  }
  
  public unpickGame(gameid:string):Observable<Object>{//удаляем игру из выбранных 
    console.log("unpickGame "+ [gameid]);
    return this.http.put<Object>(this.global_url + 'unpickgames/',[gameid]);//посылаем запрос на изменение статуса на Selected
  }
  
}

export class SignalRService implements OnInit {
  private _hubConnection: HubConnection;
  message = '';
  messages: string[] = [];
  private global_url:string = "http://51425529.ngrok.io/api/GameType/";//сам сервер
  
  public sendMessage(): void {
    const data =  `Sent: ${this.message}`;
    
    if(this._hubConnection){
      this._hubConnection.invoke('Send',data); //посылаем данные на сервер 
    } 
    this.messages.push(data);//локально заносим данные 
    
    /*this._hubConnection
    .invoke('sendToAll', this.nick, this.message)
    .catch(err => console.error(err));*/
  }
  
  ngOnInit() {
    this._hubConnection = new SignalR.HubConnectionBuilder()
        .withUrl(this.global_url)//ссылка на сервер,с каким устанавливаем соединение
        .build();//подготавливаем к старту

    //this._hubConnection = new HubConnection('http://localhost:5000/chat');

    this._hubConnection
      .start()//устанавливаем соединение
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :'+ err) );

      this._hubConnection.on('Send', (data: any) => {   //получаем данные из сервера
        const received = `Received: ${data}`; 
        this.messages.push(received);         //записываем в локальные данные
      });

    }
}


 


