import { TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController
  } from '@angular/common/http/testing'
import { TodoService } from "./todo.service";
import { HttpClientModule } from "@angular/common/http";

describe( 'ToDoService', () => {
    let service: TodoService; 
    let httpTestingController: HttpTestingController;
    /**
    * Using sample data to check implementation of CRUD methods 
    */
    const mockData = [{
        "id": 1,
        "label": "Kitchen Cleanup sdfdsfsdf",
        "description": "Clean my dirty kitchen",
        "category": "house",
        "done": false,
        "completeDate": null
      },
      {
        "id": 2,
        "label": "Taxes",
        "description": "Start doing my taxes and contact my accountant jhon for advice",
        "category": "bureaucracy",
        "done": true,
        "completeDate": "Thu Dec 22 2022"
      }];
     beforeEach(() => {
      TestBed.configureTestingModule({ 
        imports: [HttpClientModule, HttpClientTestingModule],
        providers: [ 
            TodoService,
          { provide: 'url', 
            useValue: 'apiurl'
          }],
       });
       service = TestBed.inject(TodoService);
       httpTestingController = TestBed.get(HttpTestingController);
    }); 
    afterEach(() => { 
     httpTestingController.verify(); 
    }); 
   it('getAll should make a GET HTTP request and return all data items', () => {
    service.getAllTodos().subscribe(res => {
      expect(res).toEqual(mockData); 
      expect(res.length).toBe(2); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3004/tasks');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
   });
   it('getById should make a GET HTTP request with id appended to end of url', () => {
    service.getTodoById(1).subscribe(res => {
      expect(res).toEqual(mockData[0]); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3004/tasks/1');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData[0]);
    httpTestingController.verify();
   });
   it('delete should make a DELETE HTTP request with id appended to end of url', () => {
    service.deleteTodo(1).subscribe(res => {
      expect(res).toEqual(1); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3004/tasks/1', 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpTestingController.verify();
   });
   it('update should make a PUT HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = {         
    "id": 1,
    "label": "Test",
    "description": "Clean my dirty kitchen",
    "category": "house",
    "done": false,
    "completeDate": null };
    service.updateTodo(1,updateObj).subscribe(res => {
      expect(res.label).toBe('Test'); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3004/tasks/1', 'put to api');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpTestingController.verify();
   });
   it('create should make a POST HTTP request with resource as body', () => {
    const createObj = {
        "label": "Kitchen Cleanup 333",
        "description": "Clean my dirty kitchen 123",
        "category": "house 123",
        "done": false,
        "completeDate": null
      };
    service.createTodo(createObj).subscribe(res => {
      expect(res.label).toBe('Kitchen Cleanup 333'); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3004/tasks', 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
    httpTestingController.verify();
    });
   });