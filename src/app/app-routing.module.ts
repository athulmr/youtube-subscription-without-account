import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionsAddComponent } from './components/subscriptions-add/subscriptions-add.component';


const routes: Routes = [
  { path: 'sub', component: SubscriptionsComponent },
  { path: '', component: SubscriptionsAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
