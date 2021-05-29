import { Component, Input, OnChanges } from "@angular/core";
import { Calendar } from "../../interfaces/calendar";

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {
  @Input()
  calendarData: Calendar;
  customPickerOptions: any;
  now = new Date().toISOString();
  constructor() {
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Dismiss',
        handler: () => {
          console.log('Clicked dismiss');
          return true
        }
      }]
    }

  }

  ngOnChanges() {
    console.log('calendarData', this.calendarData);
  }
}
