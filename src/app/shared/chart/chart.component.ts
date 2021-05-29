import { Component, Input, OnChanges } from "@angular/core";
import { Label, MultiDataSet, Color, Colors, ThemeService } from 'ng2-charts';
import { ChartLegendOptions, ChartOptions, ChartType } from 'chart.js';

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  selector: 'app-chart'
})
export class ChartComponent implements OnChanges {
  @Input()
  doughnutChartLabels: Label[];
  @Input()
  doughnutChartData: MultiDataSet;
  @Input()
  doughnutChartColors: Color[];
  @Input()
  dimension: { width: number, height: number };
  doughnutChartType: ChartType = 'doughnut';
  dataAvailable: boolean = false;
  width = screen.width;
  height = screen.height;

  chartOptions: ChartOptions = {
    responsive: true,
    legend: { position: "right", labels: { boxWidth: 11 } },

  };

  op: ChartOptions;
  constructor() {
  }

  ngOnChanges() {
    if (this.doughnutChartData !== undefined && this.doughnutChartLabels !== undefined && this.doughnutChartColors !== undefined && this.dimension !== undefined)
      this.dataAvailable = true;
    console.log("doughnutChartLabels", this.doughnutChartLabels, "doughnutChartData", this.doughnutChartData, "doughnutChartColors", this.doughnutChartColors, "dimension", this.dimension);

  }
}
