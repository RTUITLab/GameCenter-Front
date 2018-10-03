import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

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
  styleUrls: ['./record-manage.component.css']
})
export class RecordManageComponent implements OnInit {
  public games: IAllGames[]; // массив игр  типа интерфейса IAllGames[]
  Records: IRating[]; // лист рекордов
  displayedColumns: string[] = ['rating', 'name', 'score', 'date', 'delete']; // отображаемые колонки таблицы
  dataSource: MatTableDataSource<IRating>; // переменная для отображения листа Records
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService, // уведомления
    private _hubService: HubService // связь с другими пользователями
  ) {
  }
  private delScore(name: string) {
    console.log(name);
  }
  public loadAllGames() { // подгружаем все игры
    this._userServise.getAll().subscribe((data: IAllGames[]) => { // забираем данные из переменной в наш массив
      this.games = data; // присваиваем данные массиву игр
    });
  }
  public loadRecords(gameId) { // подгружаем все рекорды
    console.log('loadRECOrdINRECORDMANAGe');
    this._userServise.getRecords(gameId).subscribe((data: IRating[]) => {
      this.Records = data;
      this.dataSource = new MatTableDataSource(this.Records); // Данные для таблицы с рекордами
      this.dataSource.sort = this.sort; // Сортировка в таблице
      this.dataSource.paginator = this.paginator; // для того чтобы менять страницы
    });
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
    ////
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // фильтруем введёное в поле ввода у таблицы

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



