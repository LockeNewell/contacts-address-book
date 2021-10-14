import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { DataService } from './service/data.service';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';


// Notice how both FormsModule and ReactiveFormsModule imported...choices, choices!
@NgModule({
  declarations: [AppComponent, ItemComponent, ListComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [DataService, HttpClient],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
