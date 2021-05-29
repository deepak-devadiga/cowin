import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { States } from "../enums/states.enum";
import { District } from "../models/District.model";
import { State } from "../models/State.model";
import { ApiHandler } from "./api-handler.service";
import { API_CONSTANTS } from "./api-url.contants";

export class StatesResponse {
  states: State[];
}

export class DistrictsResponse {
  districts: District[];
}


@Injectable({
  providedIn: "root"
})
export class GeographicService {
  allStatesResponse: StatesResponse = { states: null };
  allDistrictsByStateResponse: any = []
  constructor(private apiHandler: ApiHandler) { }

  getStates(): Observable<StatesResponse> {
    return this.apiHandler.get(API_CONSTANTS.GEO.URL.STATES, API_CONSTANTS.GEO.TYPE).pipe(map((response: any) => {

      let apiResponse = new StatesResponse;
      apiResponse = { states: response.states }
      apiResponse.states.map(state => {
        state.state_acronym = States[state.state_name];
      })
      this.saveStates(apiResponse);
      return apiResponse;
    }));
  }

  getDistrictsByStateId(stateId: number) {
    return this.apiHandler.get(API_CONSTANTS.GEO.URL.DISTRICT + stateId, API_CONSTANTS.GEO.TYPE).pipe(map((response: any) => {
      let apiResponse = new DistrictsResponse;
      apiResponse = { districts: response.districts };
      if (this.allDistrictsByStateResponse.findIndex(district => district.key == stateId) === -1)
        this.allDistrictsByStateResponse.push({ key: stateId, districts: apiResponse.districts });

      return apiResponse.districts;
    }));
  }

  saveStates(statesData: StatesResponse): void {
    this.allStatesResponse = statesData;
  }

  getSavedStates(): StatesResponse {
    return this.allStatesResponse;
  }
}
