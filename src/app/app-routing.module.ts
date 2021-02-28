import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HistoryComponent} from './history/history.component';
import {ShowHistoryComponent} from './show-history/show-history.component';

const routes: Routes = [
  {path: '', component: HistoryComponent, },
  {path: 'history', component: HistoryComponent},
  {path: 'showHistory/:id', component: ShowHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
