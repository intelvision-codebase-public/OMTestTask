import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from './components/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoItemModule } from './components/todo-item/todo-item.module';
import { FiltersModule } from './components/filters/filters.module';
import { ModalFormModule } from './components/modal-form/modal-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    TodoItemModule,
    FiltersModule,
    ModalFormModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
