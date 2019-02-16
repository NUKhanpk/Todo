import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { ListPage } from '../list/list';
/**
 * Generated class for the AdditemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-additems',
  templateUrl: 'additems.html',
})
export class AdditemsPage {
  expenses: any = [];
  AddItemForm:FormGroup
  constructor(public navCtrl: NavController,private sqlite: SQLite,private fb:FormBuilder, private toast:Toast) {
    this.AddItemForm=this.fb.group({
      Category:['',Validators.required],
      description:['',Validators.required],
      
     });
    // If we navigated to this page, we will have an item available as a nav param
  }

  ionViewDidLoad() {
    this.getData();
  }
  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM category ORDER BY rowid DESC', [])
      .then(res => {
        this.expenses = [];
        for(var i=0; i<res.rows.length; i++) {
          this.expenses.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name})
        }
      })
  })

}
saveData() {
  this.sqlite.create({
    name: 'ionicdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    let type=this.AddItemForm.value
    let data={
      type:type.Category,
      description:type.description
    }

    db.executeSql('INSERT INTO items VALUES(NULL,?,?)',[data.type,data.description])
      .then(res => {
        console.log(res);
        this.toast.show('Data saved', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.push(ListPage);
          }
        );
      })
      .catch(e => {
        console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
  }).catch(e => {
    console.log(e);
    this.toast.show(e, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  });
}

}
