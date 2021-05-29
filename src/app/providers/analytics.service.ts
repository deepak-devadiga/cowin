import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiHandler } from "./api-handler.service";
import { API_CONSTANTS } from "./api-url.contants";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private apiSrv: ApiHandler) {

  }

  getCovidCount(): Observable<any> {
    return this.apiSrv.get(API_CONSTANTS.ANALYTICS.URL.COUNT, API_CONSTANTS.ANALYTICS.TYPE).pipe(map(response => {
      console.log('response count', response);
      return response
    }))
  }

  setAllStatesAnalyticsData() { }
  getAllStatesAnalyticsData() { }
}
