import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { GeographicService } from '../../providers/geographic.service';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;

  @ViewChild('slides', { static: true }) slides: IonSlides;
  showStart: boolean = false;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
  ) {
  }

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/analytics', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
    event.target.isBeginning().then(isBeginning => {
      this.showStart = !isBeginning;
    })
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/analytics', { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  slideNext() {
    console.log('sliding next', this.slides);

    this.slides.slideNext();
  }

  slidePrevious() {
    console.log('sliding prev', this.slides);
    this.slides.slidePrev();
  }
}
