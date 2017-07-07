import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Todo } from '../../models/todo';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoServiceProvider {

  private headers = new Headers({'Content-Type': 'application/json'});
  private todosUrl = 'http://localhost:3000/todos';

  constructor(public http: Http) {
    console.log('Hello TodoServiceProvider Provider');
  }

  getTodos(){
    return this.http.get(this.todosUrl).map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  update(todo: Todo): Promise<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    console.log(todo.id);
    console.log(todo.title);
    return this.http
               .put(url, JSON.stringify(todo), {headers: this.headers})
               .toPromise()
               .then(res => res.json())
               .catch(this.handleError);
  }

  create(todo: Todo): Promise<Todo> {
    return this.http
               .post(this.todosUrl, JSON.stringify(todo), {headers: this.headers})
               .toPromise()
               .then(res => res.json())
               .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
               .toPromise()
               .then(() => null)
               .catch(this.handleError);
  }

}
