import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { URLTYPE } from "../enums/url.enum";


@Injectable({
  providedIn: 'root'
})
export class ApiHandler {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {

  }

  getBaseURl(type: URLTYPE) {
    switch (type) {
      case URLTYPE.VACCINE:
        return environment.baseUrl;
      case URLTYPE.ANALYTICS:
        return environment.analyticsBaseUrl;
    }
  }

  generateRequestParams(params: any) {
    let reqData = {
      headers: null,
      params: null
    };
    if (params) {
      let reqParams = {};
      Object.keys(params).map(k => {
        reqParams[k] = params[k];
      });
      reqData['params'] = reqParams;
    }
    return reqData;
  }
  get(url: string, type: URLTYPE, params?: any): Observable<any> {
    return this.http.get(this.getBaseURl(type) + "/" + url, this.generateRequestParams(params))
  }
  post(url: string, type: URLTYPE, requestPayload?: any, params?: any) {
    return this.http.post(this.getBaseURl(type) + "/" + url, requestPayload, this.generateRequestParams(params))
  }
  put(url: string, type: URLTYPE, requestPayload?: any, params?: any) {
    return this.http.post(this.getBaseURl(type) + "/" + url, requestPayload, this.generateRequestParams(params))
  }
  delete(url: string, type: URLTYPE, id: any) {
    return this.http.delete(this.getBaseURl(type) + "/" + url + '/' + id)
  }
}
