import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { HomePage } from '../home/home';
/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {
  data = { name:"", CategoryMin:"",CategoryMax:""};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {}

  
  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let details = {
        name:this.data.name,
        CategoryMin:this.data.CategoryMin,
        CategoryMax:this.data.CategoryMax
      }
      db.executeSql('INSERT INTO category VALUES(NULL,?,?,?)',[details.name,details.CategoryMin,details.CategoryMax])
        .then(res => {
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.push(HomePage);
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(JSON.stringify(e), '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(JSON.stringify(e), '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}

