import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SearchAndAddComponent } from './components/search-and-add/search-and-add.component';


const routes: Routes = [
  { path: 'sub', component: SubscriptionsComponent },
  { path: '', component: SearchAndAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
