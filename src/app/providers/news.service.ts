import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiHandler } from "./api-handler.service";
import { API_CONSTANTS } from "./api-url.contants";

export class Logs {
  timestamp: number;
  update: string
}
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  logs = new BehaviorSubject<Logs[]>([]);
  constructor(private apiSrv: ApiHandler) { }

  getCovidLogs(): Observable<Logs[]> {
    return this.apiSrv.get(API_CONSTANTS.ANALYTICS.URL.LOGS, API_CONSTANTS.ANALYTICS.TYPE).pipe(map((response: Logs[]) => {
      this.setLogs(response)
      return response;
    }))
  }

  setLogs(logs: Logs[]) {
    this.logs.next(logs)
  }
  getLogs() {
    return this.logs.asObservable();
  }
}
