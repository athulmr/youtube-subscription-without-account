import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SearchAndAddComponent } from './components/search-and-add/search-and-add.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionsComponent,
    SearchAndAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
