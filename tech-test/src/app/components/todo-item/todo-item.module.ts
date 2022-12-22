import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TodoItemComponent } from './todo-item.component';

@NgModule({
    imports: [CommonModule],
    exports: [TodoItemComponent],
    declarations: [TodoItemComponent],
    providers: [],
})
export class TodoItemModule { }
