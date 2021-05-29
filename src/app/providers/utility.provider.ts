import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilityProvider {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  today = new Date();

  convertDatetoString(date) {
    let newDate = date.replaceAll('-', '/');
    newDate = new Date(newDate.split('/')[1] + "/" + newDate.split('/')[0] + '/' + newDate.split('/')[2])
    return this.days[newDate.getDay()] + ', ' + this.months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear()
  }

}
