import { Component } from '@angular/core';



@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  styleUrls: ['./news.scss']
})
export class NewsPage {
  headerData = {
    title: "Covid News",
    isMenuRequired: true,
    isBellRequired: true
  }

  constructor() { }


}

