import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component'; // основной компонент со слайдером
import { GameManageComponent} from './game-manage/game-manage.component'; // окно управления играми
import { AddGameComponent } from './game-manage/addGame/addGame.component'; // всплывающее окно для добавления игры в список доступных игр
import { DelGameComponent } from './game-manage/del-game/del-game.component';
import { QueueComponent } from './queue/queue.component'; // вкладка очередь желающих
import { DelUserComponent } from './queue/del-user/del-user.component';
import { RecordManageComponent } from './record-manage/record-manage.component'; // вкладка Выборки рекордов
import { TopOldComponent } from './top/top.component_old'; // вкладка топ игроков
import { TopComponent } from './top/top.component_new'; // вкладка топ игроков



// Game-manage //from https://material.angular.io/components/autocomplete/examples
import {MatAutocompleteModule} from '@angular/material/autocomplete'; // автозаполнение
import { MatInputModule} from '@angular/material/input'; // автозаполнение
import { MatFormFieldModule} from '@angular/material/form-field'; // автозаполнение
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

// slider from https://material.angular.io/components/sidenav/examples
import {MatSidenavModule} from '@angular/material/sidenav'; // слайдер
import {MatIconModule} from '@angular/material/icon'; // слайдер
////

// table from https://material.angular.io/components/table/api
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
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
import { AddUserComponent } from './add-user/add-user.component';
////


@NgModule({
  declarations: [
    AppComponent,
    GameManageComponent,
    AddGameComponent,
    DelGameComponent,
    QueueComponent,
    RecordManageComponent,
    TopOldComponent,
    TopComponent,
    DelUserComponent,
    AddUserComponent,

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,

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

   // table from https://material.angular.io/components/table/api
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
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
        path: 'add-user',
        component: AddUserComponent
       },
      {
        path: 'queue',
        component: QueueComponent
       },
      {
        path: 'record-manage',
        component: RecordManageComponent
       },
      {
        path: 'top',
        component: TopOldComponent
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
  entryComponents: [AddGameComponent, DelGameComponent, DelUserComponent],
  providers: [UserService, HubService, GameManageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
