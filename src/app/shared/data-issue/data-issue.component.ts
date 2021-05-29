import { Component, Input, OnChanges } from "@angular/core";
import { DataIssue } from "../../enums/data-issue.enum";

@Component({
  selector: 'data-issue',
  templateUrl: './data-issue.component.html',
  styleUrls: ['./data-issue.component.scss']
})
export class DataIssueComponent implements OnChanges {
  @Input()
  dataIssueType: DataIssue;

  issueData: { name: string, url: string } = { name: '', url: '' };
  constructor() {
    console.log('dataIssueType', this.dataIssueType);

  }

  loadDataIssueImage() {

    switch (this.dataIssueType) {
      case DataIssue.NOT_AVAILABLE:
        this.issueData.url = 'assets/img/shared/no_data.svg';
        this.issueData.name = "Data Not Available!";
        break;
      case DataIssue.UNDER_PROCESS:
        this.issueData.url = 'assets/img/shared/under_process.svg';
        this.issueData.name = "Data Under Process!";
        break;
      case DataIssue.PARTIAL_DATA:
        this.issueData.url = 'assets/img/shared/pending.svg';
        this.issueData.name = "Partial Data Available!";
        break;
    }
    console.log('this.issueData', this.issueData);

  }

  ngOnChanges() {
    if (this.dataIssueType !== undefined)
      this.loadDataIssueImage();
  }
}
