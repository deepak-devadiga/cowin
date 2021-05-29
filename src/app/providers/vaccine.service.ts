import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SearchBy } from "../enums/SearchBy.enum";
import { VaccineCenter } from "../models/VaccineCenter.model";
import { ApiHandler } from "./api-handler.service";
import { API_CONSTANTS } from "./api-url.contants";

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  constructor(private apiHandler: ApiHandler) { }

  findAvailableVaccineCenter(type: SearchBy, districtId?: number, pincode?: string): Observable<VaccineCenter[] | []> {

    const convertToTwoDigit = (number) => {
      return ('0' + number).slice(-2)
    }
    const paramsPin = {
      pincode: pincode,
      date: convertToTwoDigit(new Date().getDate()) + "-" + convertToTwoDigit((new Date().getMonth() + 1)) + "-" + new Date().getFullYear()
    }


    const paramsDistrict = {
      district_id: districtId,
      date: convertToTwoDigit(new Date().getDate()) + "-" + convertToTwoDigit((new Date().getMonth() + 1)) + "-" + new Date().getFullYear()
    }

    const params = type == SearchBy.PINCODE ? paramsPin : paramsDistrict;
    const url = type == SearchBy.DISTRICT ? API_CONSTANTS.VACCINE.URL.FINDBY.DISTRICT : API_CONSTANTS.VACCINE.URL.FINDBY.PIN;

    return this.apiHandler.get(url, API_CONSTANTS.VACCINE.TYPE, params).pipe(map(response => {
      let availableSessions: VaccineCenter[] = response.sessions;
      return availableSessions;
    }))
  }
}
