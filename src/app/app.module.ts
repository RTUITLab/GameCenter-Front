import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component'; // основной компонент со слайдером
import { GameManageComponent} from './game-manage/game-manage.component'; // окно управления играми
import { AddGameComponent } from './game-manage/addGame/addGame.component'; // всплывающее окно для добавления игры в список доступных игр
import { DelGameComponent } from './game-manage/del-game/del-game.component';
import { QueueComponent } from './queue/queue.component'; // вкладка очередь желающих
import { TopComponent } from './top/top.component'; // вкладка топ игроков



// Game-manage //from https://material.angular.io/components/autocomplete/examples
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from '@angular/material'; // автозаполнение
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

// slider from https://material.angular.io/components/sidenav/examples
import {MatSidenavModule, MatIconModule} from '@angular/material'; // слайдер
////

// routes
import { RouterModule} from '@angular/router'; // переходы между страницами
////

// dialog in game-manage
import {MatDialogModule} from '@angular/material/dialog'; // всплывающее окно
////

// сервис для работы ;
import { UserService } from './user.service';
import { HubService } from './hub.service';
////

// разделитель по горизонтали
import {MatDividerModule} from '@angular/material/divider';
////

// уведомления
import { ToastrModule } from 'ngx-toastr';
////

// карточки с header and content
import {MatCardModule} from '@angular/material/card';
////


@NgModule({
  declarations: [
    AppComponent,
    GameManageComponent,
    AddGameComponent,
    DelGameComponent,
    QueueComponent,
    TopComponent,

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,

    // Game-manage //from https://material.angular.io/components/autocomplete/examples
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,

    // slider from https://material.angular.io/components/sidenav/examples
    MatSidenavModule,
    MatIconModule,
    ////

    // routes
    RouterModule.forRoot([
      {
         path: '',
         component: GameManageComponent
      },
      {
        path: 'game-manage',
        component: GameManageComponent
       },
      {
        path: 'queue',
        component: QueueComponent
       },
      {
        path: 'top',
        component: TopComponent
       },
    ]),
    ////

    // dialog in game-manage
    MatDialogModule,
    ////

    // для переноса данных
    HttpClientModule,
    ////

    // разделитель по горизонтали
    MatDividerModule,
    ////

    // уведомления
    ToastrModule.forRoot(),
    ////

    // карточки с header and content
    MatCardModule
    ////

  ],
  entryComponents: [AddGameComponent, DelGameComponent],
  providers: [UserService, HubService, GameManageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
