import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { interval } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Logs, NewsService } from "../../providers/news.service";
import { PopoverListComponent } from "../popover/popover.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  headerData: { title: string, isBellRequired: boolean, isMenuRequired: boolean };
  logs: Logs[];
  bellOpened: boolean = false;

  constructor(private modalController: ModalController, private newsSrv: NewsService) {
    this.newsSrv.getCovidLogs().subscribe();
    interval(2 * 60 * 1000)
      .pipe(
        mergeMap(() => this.newsSrv.getCovidLogs())
      )
      .subscribe()
  }

  async openNotifications() {
    this.bellOpened = true;
    const popover = await this.modalController.create({
      component: PopoverListComponent,
      cssClass: 'notification-custom-class',
      animated: true,
      backdropDismiss: true,
      keyboardClose: true,
      mode: 'ios',
    });
    await popover.present();

    await popover.onDidDismiss().then(() => {
      this.bellOpened = false;
    });
  }
}
