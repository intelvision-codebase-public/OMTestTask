import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalComponent } from './components/modal/modal.component';
import { Filter } from './enums/filter.enum';
import { TodoItem } from './interfaces/todo-item.interface';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'tech-test';
  public allTodos: Array<TodoItem> = []
  public filteredTodos: Array<TodoItem> = []
  public currentTodo: TodoItem;
  public isModalShow = false;
  public isShowFilters = false;
  public filterEnum = Filter;
  public currentFilter = Filter.All;

  @ViewChild('modal', {static: false}) modal: ModalComponent

  myForm: FormGroup;


  constructor(private readonly todoService: TodoService){}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      id: new FormControl(''),
      label: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      category: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      done: new FormControl(false),
      completeDate: new FormControl()
    });
    this.getAllTodos();
  }



  getAllTodos(): void {
    this.todoService.getAllTodos().subscribe((allTodos: Array<TodoItem>) => {
      this.allTodos = allTodos;
      this.filterTodos(this.currentFilter);
    })
  }

  openModal(value, todo?: TodoItem) {
    value.active = true

    if(todo) {
      this.myForm.patchValue({
        "id": todo.id,
        "label": todo.label,
        "description": todo.description,
        "category": todo.category,
        "done": todo.done,
        "completeDate": todo.completeDate
    });
    }
  }

  closeModal(value) {
    value.active = false
    this.myForm.reset();
  }

  submitModal(value) {
    if (this.myForm.valid) {
      if(this.myForm.controls.id.value) {
        this.todoService.updateTodo(this.myForm.controls.id.value, this.myForm.getRawValue()).subscribe((data) => {
          value.active = false
          this.myForm.reset();
          this.getAllTodos();
        })
      } else {
        this.todoService.createTodo({...this.myForm.getRawValue(), done: false}).subscribe(() => {
          value.active = false
          this.myForm.reset();
          this.getAllTodos();
        })
      }
    } else {
      this.myForm.markAllAsTouched();
    }

  }

  deleteTodo(todo: TodoItem): void {
    this.todoService.deleteTodo(todo.id).subscribe((data) => {      
      this.getAllTodos();
    })
  }

  updateCompleteStatus(todo: TodoItem): void {
    this.todoService.updateTodo(todo.id, {...todo, done: !todo.done, completeDate: !todo.done ? new Date().toDateString() : null}).subscribe((data) => {
      this.myForm.reset();
      this.getAllTodos();
    })
  }

  filterToggle(): void {
    this.isShowFilters = !this.isShowFilters;
  }

  filterTodos(filterType: Filter): void {
    debugger
    this.currentFilter = filterType;
    if(this.currentFilter === Filter.All) {
      this.filteredTodos = this.allTodos;
    }

    if(this.currentFilter === Filter.Complete) {
      this.filteredTodos = this.allTodos.filter((todo: TodoItem) => todo.done);
    }

    if(this.currentFilter === Filter.Uncomplete) {
      this.filteredTodos = this.filteredTodos = this.allTodos.filter((todo: TodoItem) => !todo.done);
    }
  }
}
