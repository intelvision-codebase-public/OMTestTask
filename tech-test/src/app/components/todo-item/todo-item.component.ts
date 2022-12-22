import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from 'src/app/interfaces/todo-item.interface';

@Component({
    selector: 'app-todo-item',
    templateUrl: 'todo-item.component.html',
    styleUrls: ['./todo-item.component.scss']
})

export class TodoItemComponent implements OnInit {
    @Input() todo: TodoItem;

    @Output() editEvent = new EventEmitter<TodoItem>();
    @Output() deleteEvent = new EventEmitter<TodoItem>();
    @Output() updateCompleteStatusEvent = new EventEmitter<TodoItem>();
    constructor() { }

    ngOnInit() { }

    editTodo(todo: TodoItem): void {
        this.editEvent.emit(this.todo)
    }

    deleteTodo(todo: TodoItem): void {
        this.deleteEvent.emit(this.todo)
    }

    updateCompleteStatus(todo: TodoItem): void {
        this.updateCompleteStatusEvent.emit(todo);
    }
}