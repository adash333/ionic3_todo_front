import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import 'rxjs/Rx';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private todos: any;
  //private Todo = { id: null, title: '', description: ''};

  constructor(
    public navCtrl: NavController,
    public TodoService: TodoServiceProvider,
    public modalCtrl: ModalController,
  ) {
  }

  ionViewDidLoad(){
    this.TodoService.getTodos().subscribe(
      result => {
        this.todos=result;
        console.log("Success : "+this.todos);
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        console.log('getData completed');
      }
    );
  }

  addTodo(){
    let addModal = this.modalCtrl.create(AddItemPage);
    // call back when modal dismissed
    addModal.onDidDismiss((item) => {
      if(item){
        this.saveTodo(item);
      }
    });
    addModal.present();
  }

  saveTodo(item){
    this.todos.push(item);
  }

  viewItem(todo) {
    this.navCtrl.push(ItemDetailPage, {
      todo: todo
    });
  }

/*
  removeTodo(item) {
    var index = this.todos.indexOf(item);
    this.todos.splice(index, 1);
    this.Data.remove(this.todos.id)
    this.Data.saveTodo(this.todos);
  }
*/
/*
  delete(id: number): void {
    if (this.todo.id) {
      this.TodoService.delete(this.todo.id)
        .then(() => this.navCtrl.push(HomePage));
    } else {
      this.navCtrl.push(HomePage);
    }
  }
*/

  delete(todo): void {
		this.TodoService
			.delete(todo.id)
			.then(() => {
				this.todos = this.todos.filter((_todo) => _todo !== todo);
        //this.navCtrl.push(HomePage);
			});
	}


}
