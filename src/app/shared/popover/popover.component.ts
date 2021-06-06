import { Component, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ModalController } from "@ionic/angular";
import { Logs, NewsService } from "../../providers/news.service";

@Component({
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverListComponent {
  logs = [];
  constructor(private newsSrv: NewsService, private sanitize: DomSanitizer, private modalController: ModalController) {
    this.newsSrv.getLogs().subscribe(logs => {
      this.prepareLogs(logs)
    })
  }

  prepareLogs(logs) {
    let date = '';
    let temp: { date: string, data: any } = { date: '', data: [] };
    let templogs = [];
    logs.forEach(log => {
      if (new Date(log.timestamp * 1000).toISOString().split('T')[0] !== date) {
        if (date !== '') {
          date = '';
          temp = { date: '', data: [] };
          templogs.push(temp);
        }
        date = new Date(log.timestamp * 1000).toISOString().split('T')[0];
        temp.date = new Date(log.timestamp * 1000).toISOString();
        if (log.update !== '')
          temp.data.push(log.update);
      } else {
        temp.data.push(log.update)
      }
    });
    this.logs = [...templogs.reverse()];
    console.log('this.logs', this.logs);

  }

  sanitizeHTML(html) {
    return this.sanitize.sanitize(SecurityContext.HTML, html.replaceAll('\n', '.</br>'))
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
