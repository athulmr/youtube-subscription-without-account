import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionsFeedComponent } from './components/subscriptions-feed/subscriptions-feed.component';
import { SubscriptionsAddComponent } from './components/subscriptions-add/subscriptions-add.component';


const routes: Routes = [
  { path: 'sub', component: SubscriptionsFeedComponent },
  { path: '', component: SubscriptionsAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
