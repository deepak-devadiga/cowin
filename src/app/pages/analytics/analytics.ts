import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Config, IonContent } from '@ionic/angular';
import { forkJoin, interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AnalyticsColor } from '../../enums/analytics-color.enum';
import { DataIssue } from '../../enums/data-issue.enum';
import { AnalyticsModel } from '../../models/Analytics.model';
import { State } from '../../models/State.model';
import { AnalyticsService } from '../../providers/analytics.service';

import { GeographicService } from '../../providers/geographic.service';

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
  dimension: { width: number; height: number; } = {
    width: (screen.width - 40),
    height: (screen.width - 80)
  };
  overallLastUpdatedAt: string;
  totalLatestData: any[] = [];
  totalLatestLabel: string[] = [];
  totalLatestColors: { backgroundColor: AnalyticsColor[]; }[] = [];
  showChart: boolean = false;
  latestDataIssue: { type: DataIssue, status: boolean } = { type: null, status: false };
  dataIssue: { type: DataIssue, status: boolean } = { type: null, status: false };
  colors = AnalyticsColor;
  showFab: boolean = false;
  headerData = {
    title: "Analytics",
    isMenuRequired: true,
    isBellRequired: true
  }

  @ViewChild('pageContent') pageContent: IonContent;

  constructor(public config: Config, private analyticsSrv: AnalyticsService, private geoSrv: GeographicService) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewWillEnter() {
    this.getInitData();
  }
  scrollListener(e) {
    if (e.detail.scrollTop > 500)
      this.showFab = true;
    else
      this.showFab = false;
  }

  getInitData() {
    forkJoin([this.geoSrv.getStates(), this.analyticsSrv.getCovidCount()]).subscribe(([allStates, covidCount]: any) => {
      console.log('getStates ', allStates, 'covidCount', covidCount);
      this.allStates = allStates.states;
      this.stateWiseCount = covidCount;
      this.combineStateWithCount();
      this.getStateWiseCovidCount();
    });

  }
  getStateWiseCovidCount() {

    this.analyticsSrv.getCovidCount().subscribe(data => {
      this.stateWiseCount = data;
      if (this.analyticsData.findIndex(data => data.state_acronym == 'IN') < 0)
        this.combineStateWithCount();
    })

  }

  async doRefresh(event) {
    console.log('Begin async operation');
    await this.getStateWiseCovidCount();
    event.target.complete();
  }


  combineStateWithCount() {
    let allStatesAnalytics: AnalyticsModel[] = [];
    allStatesAnalytics = this.allStates.map(states => {
      return { ...states, data: this.stateWiseCount[states.state_acronym] }
    });
    const allState: AnalyticsModel = {
      state_id: 0,
      state_acronym: 'IN',
      state_name: 'All',
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
    this.showChart = false;
    console.log('selected', this.stateAnalytics);
    if (this.stateAnalytics.data !== undefined) {
      this.showChart = true
      this.calculateOverallCases();
      this.calculateLatestCases();
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

    // this.dimension = {
    //   width: (screen.width - 40),
    //   height: (screen.width - 80)
    // }
  }

  calculateLatestCases() {
    const temp = new Date(this.stateAnalytics.data.meta.last_updated)
    this.lastUpdatedAt = temp.toLocaleString('en-IN', { hour12: true, month: 'long', day: '2-digit', weekday: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    this.totalLatestData = [
      undefined,
      undefined,
      undefined,
      // this.stateAnalytics.data.delta.confirmed - (this.stateAnalytics.data.total.deceased + this.stateAnalytics.data.total.recovered),
    ];
    if (this.stateAnalytics.data.delta == undefined) {
      this.latestDataIssue.status = true;
      this.latestDataIssue.type = DataIssue.UNDER_PROCESS;
    } else if (this.stateAnalytics.data.delta.confirmed == undefined || this.stateAnalytics.data.delta.deceased == undefined || this.stateAnalytics.data.delta.recovered == undefined) {
      this.latestDataIssue.status = true;
      this.latestDataIssue.type = DataIssue.PARTIAL_DATA;
      this.totalLatestData[0] = this.stateAnalytics.data.delta.confirmed || undefined;
      this.totalLatestData[1] = this.stateAnalytics.data.delta.deceased || undefined;
      this.totalLatestData[2] = this.stateAnalytics.data.delta.recovered || undefined;
    } else {
      this.latestDataIssue.status = false;
      this.latestDataIssue.type = null;
      this.totalLatestData = [
        this.stateAnalytics.data.delta.confirmed,
        this.stateAnalytics.data.delta.deceased,
        this.stateAnalytics.data.delta.recovered,
        // this.stateAnalytics.data.delta.confirmed - (this.stateAnalytics.data.total.deceased + this.stateAnalytics.data.total.recovered),
      ];
      this.totalLatestLabel = [
        'Confirmed', 'Deceased', 'Recovered'
      ];
      this.totalLatestColors = [{
        backgroundColor: [AnalyticsColor.CONFIRMED, AnalyticsColor.DECEASED, AnalyticsColor.RECOVERED, AnalyticsColor.ACTIVE]
      }];

      // this.dimension = {
      //   width: (screen.width - 40),
      //   height: (screen.width - 80)
      // }
    }
    console.log('latestDataIssue', this.latestDataIssue);

  }

  compareWith(o1: AnalyticsModel, o2: AnalyticsModel) {
    return o1 && o2 ? o1.state_id === o2.state_id : o1 === o2;
  }

  gotoTop() {
    this.pageContent.scrollToTop(500);
  }

  numberFormatting(number) {

    if (number !== undefined)
      return number.toLocaleString('en-IN')
  }
}
