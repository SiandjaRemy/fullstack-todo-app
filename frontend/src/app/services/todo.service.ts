import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // getting all the todos
  getTodos(): Observable<Todo[]> {
    return this.http
      .get<{ status: number; message: string; data: Todo[] }>(this.apiUrl)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // getting a single todo
  getTodo(id: number): Observable<Todo> {
    return this.http
      .get<{ status: number; message: string; data: Todo }>(
        `${this.apiUrl}/${id}`
      )
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // create a new todo
  addTodo(todo: { title: string; description?: string }): Observable<Todo> {
    const data = {
      title: todo.title,
      description: todo.description,
      completed: false,
    };

    return this.http
      .post<{ status: number; message: string; data: Todo }>(this.apiUrl, data)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // update a todo
  updateTodo(id: number, todo: Partial<Todo>): Observable<Todo> {
    const data = {
      title: todo.title,
      description: todo.description,
    };
    return this.http
      .put<{ status: number; message: string; data: Todo }>(
        `${this.apiUrl}/${id}`,
        data
      )
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // update todo completed status
  patchTodo(id: number, partialTodo: Partial<Todo>): Observable<Todo> {
    const data = {
      completed: !partialTodo.completed,
    };

    return this.http
      .patch<{ status: number; message: string; data: Todo }>(
        `${this.apiUrl}/${id}`,
        data
      )
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // delete a todo
  deleteTodo(id: number): Observable<string> {
    return this.http
      .delete<{ status: number; message: string; data: null }>(
        `${this.apiUrl}/${id}`
      )
      .pipe(
        map((response) => response.message),
        catchError(this.handleError)
      );
  }

  // error handler
  private handleError(error: HttpErrorResponse) {
    console.log('error', error);
    if (error.status === 0) {
      return throwError(
        () =>
          new Error(
            'Unable to connect to the server. Please check your network connection.'
          )
      );
    }

    if (error.error?.message) {
      return throwError(
        () => new Error(`${error.error.message}: ${error.error.details[0]}`)
      );
    }
    if (error.statusText) {
      return throwError(
        () => new Error(`${error.statusText}: ${error.error.error}`)
      );
    }

    return throwError(
      () => new Error(`Server error: ${error.status} - ${error.message}`)
    );
  }
}
