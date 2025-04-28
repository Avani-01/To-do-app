import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo {
  _id?: string;
  title: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:9000/api/todo';

  constructor(private http: HttpClient) {}


  // getTodos(): Observable<Todo[]> {
  //   return this.http.get<Todo[]>(`${this.apiUrl}/get`);
  // }
  getTodos(): Observable<Todo[]> {
    const token = localStorage.getItem('token'); // get token from localStorage
  
    return this.http.get<Todo[]>(`${this.apiUrl}/get`, {
      headers: {
        Authorization: token || ''
      }
    });
  }

  // addTodo(todo: Todo): Observable<Todo> {
  //   return this.http.post<Todo>(`${this.apiUrl}/add`, todo);
  // }
  addTodo(todo: Todo): Observable<Todo> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token || ''
    };
  
    return this.http.post<Todo>(`${this.apiUrl}/add`, todo, { headers });
  }

  // updateTodo(todo: Todo): Observable<Todo> {
  //   return this.http.put<Todo>(`${this.apiUrl}/${todo._id}`, todo);
  // }
  updateTodo(todo: Todo): Observable<Todo> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    return this.http.put<Todo>(`${this.apiUrl}/${todo._id}`, todo, { headers });
  }

  // deleteTodo(id: string): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
  deleteTodo(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
