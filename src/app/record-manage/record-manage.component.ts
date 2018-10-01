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

export interface UserData {
  rating: string;
  name: string;
  score: string;
  date: string;
}
/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];


/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-record-manage',
  templateUrl: './record-manage.component.html',
  styleUrls: ['./record-manage.component.css']
})
export class RecordManageComponent implements OnInit {
  constructor(
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService, // уведомления
    private _hubService: HubService // связь с другими пользователями
  ) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  public games: IAllGames[]; // массив игр  типа интерфейса IAllGames[]
  public Records: IRating[];
  displayedColumns: string[] = ['rating', 'name', 'score', 'date', 'delete'];
  dataSource: MatTableDataSource<IRating>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // Подгрузка данных
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): IRating {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    score: Math.round(Math.random() * 100).toString(),
    date: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}



