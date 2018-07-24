import { Component, OnInit } from '@angular/core';

//прототип получаемых данных
import { IData ,TestPickedGamesIData} from '../DataInterface';
////

// сервис для операций с данными
import {UserService} from '../user.service';
////

//уведомления
import { ToastrService } from 'ngx-toastr';
////

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  constructor(
    private _userServise: UserService, // переменная для обращения к сервису
    private toastr: ToastrService,
  ) { }

  pickedGames:TestPickedGamesIData[];


  private loadPickedGames(){//подгружаем все игры
    this._userServise.getAllPicked().subscribe((data:TestPickedGamesIData [])=> {//забираем данные из переменной в наш массив
       this.pickedGames=data;//присваиваем данные массиву игр
       console.log(this.pickedGames);//проверяем массив пришедших данных
    });
  }

  ngOnInit() {
    this.loadPickedGames();//подгружаем все выбранные игры
  }

}
