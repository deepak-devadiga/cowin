import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { State } from '../../models/State.model';
import { District } from '../../models/District.model';
import { GeographicService } from '../../providers/geographic.service';
import { SearchBy } from '../../enums/SearchBy.enum';
import { VaccineService } from '../../providers/vaccine.service';
import { VaccineCenter } from '../../models/VaccineCenter.model';
import { UtilityProvider } from '../../providers/utility.provider';
import { SlotData } from '../../models/SlotData.model';
import { Calendar } from '../../interfaces/calendar';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-vaccination',
  templateUrl: 'vaccination.html',
  styleUrls: ['./vaccination.scss'],
})
export class VaccinationPage {
  speakers: any[] = [];
  states: State[];
  districts: District[] = null;
  totalStates: number = null;
  selectedState: State;
  selectedDistrict: District;
  searchBy = SearchBy;
  today = new Date();
  calendarData: Calendar;

  customAlertOptionsState: any = {
    header: 'Vaccination State',
    subHeader: 'Select your state',
    message: '',
    translucent: true
  };
  customAlertOptionsDistrict: any = {
    header: 'Vaccination District',
    subHeader: 'Select your district',
    message: '',
    translucent: true
  };
  selectedSearchOption: SearchBy = SearchBy.DISTRICT;
  pincode: string = '';
  availableCenters: any = [];
  showAll: boolean = false;
  showSlots: boolean = false;
  slotsData: SlotData[] = [];
  calendarFormat: Calendar;
  resultsReady: boolean = false;

  resultPoint: any = null;
  constructor(private geoGraphSrv: GeographicService, private vaccineSrv: VaccineService, private utilitySrv: UtilityProvider) { }

  ngOnInit() {
    this.getStates();
    this.geoGraphSrv.getDistrictsByStateId(1).subscribe();
    const weekDate = new Date(new Date().setDate(this.today.getDate() + 7))
    this.calendarData = {
      format: 'DD/MM/YYYY',
      label: 'Select a date',
      minDate: this.today.getFullYear() + "-" + ('0' + (this.today.getMonth() + 1)).toString().slice(-2) + "-" + ('0' + this.today.getDate()).toString().slice(-2),
      maxDate: weekDate.getFullYear() + "-" + ('0' + (weekDate.getMonth() + 1)).toString().slice(-2) + "-" + ('0' + weekDate.getDate()).toString().slice(-2)
    }
  }


  getStates() {
    this.states = this.geoGraphSrv.getSavedStates().states;
    if (this.states)
      this.totalStates = this.geoGraphSrv.getSavedStates().states.length - 1;
    else
      this.geoGraphSrv.getStates().subscribe((response: any) => {
        this.states = response.states;
        this.totalStates = this.states.length - 1;
      })
  }

  getDistrictsByStateId(stateId: number) {
    this.geoGraphSrv.getDistrictsByStateId(stateId).subscribe(districts => {
      this.districts = districts;
    })
  }

  selectStateHandler() {
    this.getDistrictsByStateId(this.selectedState.state_id);
  }

  selectDistrictHandler() {

  }

  searchVaccineHandler() {
    this.resultsReady = false;
    this.slotsData = [];
    this.vaccineSrv.findAvailableVaccineCenter(this.selectedSearchOption, this.selectedSearchOption == SearchBy.DISTRICT ? this.selectedDistrict.district_id : null, this.selectedSearchOption == SearchBy.PINCODE ? this.pincode : null).subscribe((results: VaccineCenter[]) => {
      this.resultsReady = true;
      this.availableCenters = results;
      console.log('this.availableCenters', this.availableCenters);

      if (this.availableCenters.length > 0)
        this.showSlots = true;
      else
        this.showSlots = false;
      let slots = [];
      this.availableCenters.forEach((slot: VaccineCenter) => {
        let temp: any = {
          date: '',
          vaccine: '',
          state: '',
          district: '',
          address: '',
          name: '',
          ageLimit: null,
          fee_type: '',
          fee: '',
          capacity: null,
          dose1Capacity: null,
          dose2Capacity: null
        };
        temp['date'] = this.utilitySrv.convertDatetoString(slot.date);
        temp['vaccine'] = slot.vaccine;
        temp['state'] = slot.state_name;
        temp['district'] = slot.district_name;
        temp['address'] = slot.address;
        temp['name'] = slot.name;
        temp['ageLimit'] = slot.min_age_limit;
        temp['fee'] = slot.fee;
        temp['fee_type'] = slot.fee_type;
        temp['capacity'] = slot.available_capacity;
        temp['dose1Capacity'] = slot.available_capacity_dose1;
        temp['dose2Capacity'] = slot.available_capacity_dose2;
        slots.push(temp);
      });
      console.log('all slots ', slots);
      if (slots.length > 0) {
        const temp = {
          date: slots[0].date,
          data: slots
        }
        this.slotsData.push(temp)
      } else {
        this.slotsData = []
      }
      setTimeout(() => {
        document.getElementById('results').scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 500)

    })
  }

  searchBySelectionHandler(e) {
    this.selectedSearchOption = e.detail.value;
    this.resultsReady = false;
    // this.slotsData = [];
  }
}
