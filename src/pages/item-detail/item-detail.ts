import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

  selectedItem: any;
  title: string;
  description: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public todoService: TodoServiceProvider
  ) {
    this.selectedItem = navParams.get('todo')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailPage');
  }

  close() {
    this.view.dismiss();
  }

  saveItem() {
    let editItem = {
      id: this.selectedItem.id,
      title: this.selectedItem.title,
      description: this.selectedItem.description
    };
    this.todoService.update(editItem);
    this.view.dismiss(editItem);
  }

}
