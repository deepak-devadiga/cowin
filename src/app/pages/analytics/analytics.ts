import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { forkJoin, interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AnalyticsColor } from '../../enums/analytics-color.enum';
import { AnalyticsModel } from '../../models/Analytics.model';
import { State } from '../../models/State.model';
import { AnalyticsService } from '../../providers/analytics.service';

import { ConferenceData } from '../../providers/conference-data';
import { GeographicService } from '../../providers/geographic.service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-analytics',
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss'],
})
export class AnalyticsPage implements OnInit, OnDestroy {
  // Gets a reference to the list element

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  allStates: State[];
  stateWiseCount: any = {};
  analyticsData: AnalyticsModel[] = [];
  intervalInstance: any;
  stateAnalytics = new AnalyticsModel;
  lastUpdatedAt: string = '';
  totalData = [];
  totalLabel = [];
  totalColors = [];
  dimension: { width: number; height: number; };
  overallLastUpdatedAt: string;


  constructor(public config: Config, private analyticsSrv: AnalyticsService, private geoSrv: GeographicService) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
    forkJoin([this.geoSrv.getStates(), this.analyticsSrv.getCovidCount()]).subscribe(([allStates, covidCount]: any) => {
      console.log('getStates ', allStates, 'covidCount', covidCount);
      this.allStates = allStates.states;
      this.stateWiseCount = covidCount;
      this.combineStateWithCount();
      this.getStateWiseCovidCount()
    });
  }

  getStateWiseCovidCount() {
    this.intervalInstance = interval(60 * 1000)
      .pipe(
        mergeMap(() => this.analyticsSrv.getCovidCount())
      )
      .subscribe(data => {
        this.stateWiseCount = data;
        if (this.analyticsData.findIndex(data => data.state_acronym == 'IN') < 0)
          this.combineStateWithCount()
      })
  }

  combineStateWithCount() {
    let allStatesAnalytics: AnalyticsModel[] = [];
    allStatesAnalytics = this.allStates.map(states => {
      return { ...states, data: this.stateWiseCount[states.state_acronym] }
    });
    const allState: AnalyticsModel = {
      state_id: 0,
      state_acronym: 'IN',
      state_name: 'India',
      data: this.stateWiseCount.TT
    }
    allStatesAnalytics.unshift(allState);
    this.analyticsData = [...allStatesAnalytics];
    console.log('analyticsData', this.analyticsData);
    this.selectStateHandler();
  }

  ngOnDestroy() {
    clearInterval(this.intervalInstance)
  }

  selectStateHandler() {
    console.log('selected', this.stateAnalytics);
    if (this.stateAnalytics.data !== undefined) {
      this.calculateOverallCases();
    }
  }


  calculateOverallCases() {
    const temp = new Date(this.stateAnalytics.data.meta.last_updated)
    this.overallLastUpdatedAt = temp.toLocaleString('en-IN', { hour12: true, month: 'long', day: '2-digit', weekday: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    this.totalData = [
      this.stateAnalytics.data.total.confirmed,
      this.stateAnalytics.data.total.deceased,
      this.stateAnalytics.data.total.recovered,
      this.stateAnalytics.data.total.confirmed - (this.stateAnalytics.data.total.deceased + this.stateAnalytics.data.total.recovered),
    ];
    this.totalLabel = [
      'Confirmed', 'Deceased', 'Recovered', 'Active'
    ];
    this.totalColors = [{
      backgroundColor: [AnalyticsColor.CONFIRMED, AnalyticsColor.DECEASED, AnalyticsColor.RECOVERED, AnalyticsColor.ACTIVE]
    }];

    this.dimension = {
      width: (screen.width - 40),
      height: (screen.width - 80)
    }
  }

  calculateLatestCases() {
    const temp = new Date(this.stateAnalytics.data.meta.last_updated)
    this.lastUpdatedAt = temp.toLocaleString('en-IN', { hour12: true, month: 'long', day: '2-digit', weekday: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    this.totalData = [
      this.stateAnalytics.data.total.confirmed,
      this.stateAnalytics.data.total.deceased,
      this.stateAnalytics.data.total.recovered,
      this.stateAnalytics.data.total.confirmed - (this.stateAnalytics.data.total.deceased + this.stateAnalytics.data.total.recovered),
    ];
    this.totalLabel = [
      'Confirmed', 'Deceased', 'Recovered', 'Active'
    ];
    this.totalColors = [{
      backgroundColor: [AnalyticsColor.CONFIRMED, AnalyticsColor.DECEASED, AnalyticsColor.RECOVERED, AnalyticsColor.ACTIVE]
    }];

    this.dimension = {
      width: (screen.width - 40),
      height: (screen.width - 80)
    }
  }

  compareWith(o1: AnalyticsModel, o2: AnalyticsModel) {
    return o1 && o2 ? o1.state_id === o2.state_id : o1 === o2;
  }
}
