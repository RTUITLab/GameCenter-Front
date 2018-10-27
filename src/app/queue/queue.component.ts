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
import { DelUserComponent } from './del-user/del-user.component';
import { MatDialog } from '@angular/material';
////

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css',
                'queue.component-mob.css']
})
export class QueueComponent implements OnInit {

  constructor(
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService, // уведомления
    private _hubService: HubService, // связь с другими пользователями
    public dialog: MatDialog, // всплывающее окно для добавления игры

  ) { }

  pickedGames: IPickedGames[]; // массив выбранных игр  типа интерфейса IPickedGames[]
  peopleQueue: IQueue[]; // массив людей в очереди
  score: any; // переменная для счёта человека

  private loadPickedGames() {// подгружаем все игры
    this._userServise.getAllPicked().subscribe((data: IPickedGames []) => {// забираем данные из переменной в наш массив
       this.pickedGames = data; // присваиваем данные массиву игр
    });
  }
  private loadPeople() { // подгружаем очередь
    this._userServise.getAllPeople().subscribe((data: IQueue[]) => {// забираем данные из переменной в наш массив
      this.peopleQueue = data; // присваиваем данные массиву игр
      console.log(JSON.stringify(this.peopleQueue) + 'QUeueLOADALLPEOPLE '); // проверяем массив пришедших данных
   });
  }
  private decline_all(gameId: string) { // отменяем все заявки конкретной игры
    this._userServise.declineAllUsers(gameId)
          .subscribe(
            _ => {
              this.loadPickedGames(); // подгружаем выбранные игры
              this.loadPeople(); // подгружаем людей в очередь
            },
            e => {
              this.toastr.error('Все желающие не были отклонены | Ошибка');
            },
            () => this.toastr.success('Все желающие отклонены')
          );
  }
  private accept_user(usernameId: string) { // принимаем заявку желающего поиграть
    this._userServise.acceptUser(usernameId)
    .subscribe(
      _ => {
        this.loadPickedGames(); // подгружает выбранные игры
        this.loadPeople(); // подгружаем людей в очередь
        this._hubService.queueSubscriber.next();
      },
      e => {
        this.toastr.error(`Пользователь не одобрен | Ошибка`);
      },
      () => this.toastr.success(`Пользователь одобрен`)
    );
  }
  private declineUser(nameId: string, gamenameId: string): void { // удаляем желающего из очереди

    const dialogRef = this.dialog.open(DelUserComponent, {
      width: 'fit-content', // ширина всплывающего окна
      height: 'fit-content', // высота всплывающего окна
      data: { score: this.score } // счёт игрока из окна ввода счёта
    });
    dialogRef.afterClosed().subscribe(result => { // окно для добавления счёта
      this.score = result;
      if (this.score !== undefined) { // проверка введено ли вообще значение счёта
        this.score = parseInt(this.score, 10); // преобразование строки в number в 10-тичной системе счисления
        if (Number.isInteger(this.score)) { // проверка преобразованного значения на тип int
          this._userServise.declineUser(nameId, gamenameId, this.score) // отсылаем запрос серверу на удаление из очереди
          .subscribe(
            _ => {
              this.loadPeople(); // подгружаем людей в очередь
              this.loadPickedGames(); // подгружаем выбранные игры
            },
            e => {
              this.toastr.error(`Пользователь не был удалён из очереди | Ошибка`);
            },
            () => this.toastr.success(`Пользователь удален из очереди`)
          );
        } else {
            this.toastr.error(`Счёт не является числом`, `Счёт не был добавлен`);
          }
      }
    });
  }

  ngOnInit() {
    this.loadPickedGames(); // подгружаем все выбранные игры
    this.loadPeople(); // Подгружаем людей в очередь
    console.log(JSON.stringify(this.peopleQueue) + `QUEUESngOnInit`);
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
    this._hubService.addNotifier.subscribe( // подписываемся на событие выбора игры,совершенного другим пользователем
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
