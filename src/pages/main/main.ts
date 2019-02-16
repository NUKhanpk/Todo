import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { ReportPage } from '../report/report';
import { SearchPage } from '../search/search';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
category(){
  this.navCtrl.push(HomePage)
}
items(){
  this.navCtrl.push(ListPage)
}
search(){
  this.navCtrl.push(SearchPage)
}
report(){
  this.navCtrl.push(ReportPage)
}

}
