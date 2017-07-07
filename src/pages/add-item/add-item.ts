import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  title: string;
  description: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public todoService: TodoServiceProvider
  ) {
  }

  ionViewDidLoad() {
  }

  saveItem() {
    let newItem = {
      id: null,
      title: this.title,
      description: this.description
    };
    this.todoService.create(newItem);
    this.view.dismiss(newItem);
  }

  close() {
    this.view.dismiss();
  }

}
