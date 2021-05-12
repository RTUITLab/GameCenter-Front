import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

// сервис для операций с данными
import { UserService } from '../user.service';
////

// прототип получаемых данных
import { IAllGames } from '../DataInterface';
////

// уведомления
import { ToastrService } from 'ngx-toastr';
////

// связь с другими пользователями
import { HubService } from '../hub.service';
////
import { IRating } from '../DataInterface';

@Component({
  selector: 'app-record-manage',
  templateUrl: './record-manage.component.html',
  styleUrls: ['./record-manage.component.scss', './record-manage.component-mob.scss']
})
export class RecordManageComponent implements OnInit {
  public games: IAllGames[]; // массив игр  типа интерфейса IAllGames[]
  Records: IRating[]; // лист рекордов
  tempVarForRecord: string;
  displayedColumns: string[] = ['rating', 'name', 'score', 'date', 'delete']; // отображаемые колонки таблицы
  dataSource: MatTableDataSource<IRating>; // переменная для отображения листа Records
  pickedGameId: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService, // уведомления
    private _hubService: HubService // связь с другими пользователями
  ) {
  }
  public delScore(scoreId: string) {
    console.log('delScore' + scoreId);
    this._userServise.delRecord(scoreId).subscribe(
      _ => this.loadRecords(this.pickedGameId),
      e => {
        this.toastr.error(`Рекорд не были удален`);
      },
      () => this.toastr.success(`Рекорд удален`)
      );
  }
  public loadAllGames() { // подгружаем все игры
    this._userServise.getAll().subscribe((data: IAllGames[]) => { // забираем данные из переменной в наш массив
      this.games = data; // присваиваем данные массиву игр
    });
  }
  public loadRecords(gameId) { // подгружаем все рекорды
    this.tempVarForRecord = gameId;
    console.log('loadRECOrdINRECORDMANAGe');
    this._userServise.getRecords(gameId).subscribe((data: IRating[]) => {
      this.Records = data;
      this.pickedGameId = gameId;
      this.dataSource = new MatTableDataSource(this.Records); // Данные для таблицы с рекордами
      this.dataSource.sort = this.sort; // Сортировка в таблице
      this.dataSource.paginator = this.paginator; // для того чтобы менять страницы
    });
  }
  public deleteAllRecords() {
    this._userServise.delAllRecords(this.pickedGameId).subscribe(
    _ => this.loadRecords(this.pickedGameId),
    e => {
      this.toastr.error(`Рекорды не были удалены`);
    },
    () => this.toastr.success(`Рекорды удалены`)
    );
  }


  ngOnInit() {
    this.loadAllGames(); // подгружаем все игры
    // SignalR || Связь с другими пользователями
    this._hubService.addNotifier.subscribe( // подписываемся на событие добавления игры,совершенного другим пользователем
      n => this.loadAllGames(),
      err => console.log(err),
      () => console.log('_hubService.addNotifier complete')
    );
    this._hubService.deleteNotifier.subscribe( // подписываемся на событие удаления игры,совершенного другим пользователем
      n => this.loadAllGames(),
      err => console.log(err),
      () => console.log('_hubService.deleteNotifier complete')
    );
    this._hubService.deleteRecordNotifier.subscribe( // подписываемся на событие удаления рекорда игры,совершенного другим пользователем
      n => this.loadRecords(this.tempVarForRecord),
      err => console.log(err),
      () => console.log('_hubService.deleteNotifier complete')
    );
    ////
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // фильтруем введёное в поле ввода у таблицы

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



