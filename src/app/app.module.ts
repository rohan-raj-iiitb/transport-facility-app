import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddRideComponent } from './features/add-ride/add-ride.component';
import { SearchBookRideComponent } from './features/search-book-ride/search-book-ride.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRideComponent,
    SearchBookRideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
