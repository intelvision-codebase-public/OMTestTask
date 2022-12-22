import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'; 
import { TodoItem } from '../interfaces/todo-item.interface';

@Injectable({providedIn: 'root'})
export class TodoService {
    constructor(public httpClient: HttpClient) { }

    private apiServer = "http://localhost:3004";

    getAllTodos(): Observable<Array<TodoItem>> {
        return this.httpClient.get<Array<TodoItem>>(this.apiServer + '/tasks')
        .pipe(
          catchError(this.errorHandler)
        )
    }

    createTodo(todo: TodoItem): Observable<TodoItem> {
        return this.httpClient.post<TodoItem>(this.apiServer + '/tasks', todo)
        .pipe(
          catchError(this.errorHandler)
        )
      }

      getTodoById(id: number): Observable<TodoItem> {
        return this.httpClient.get<TodoItem>(this.apiServer + '/tasks/' + id)
        .pipe(
          catchError(this.errorHandler)
        )
      }
    
      updateTodo(id: number, todo: TodoItem): Observable<TodoItem> {
        return this.httpClient.put<TodoItem>(this.apiServer + '/tasks/' + id, todo)
        .pipe(
          catchError(this.errorHandler)
        )
      }
    
      deleteTodo(id): Observable<{}>{
        return this.httpClient.delete<TodoItem>(this.apiServer + '/tasks/' + id)
        .pipe(
          catchError(this.errorHandler)
        )
      }

    errorHandler(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
     }
}