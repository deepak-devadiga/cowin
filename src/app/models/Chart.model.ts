import { ChartOptions, ChartType } from "chart.js";
import { Color, Label, MultiDataSet, SingleDataSet } from "ng2-charts";

export class Chart {
  chartType: ChartType;
  legend: boolean;
  data: MultiDataSet;
  datasets: SingleDataSet;
  labels: Label[];
  options: ChartOptions;
  colors: Color[];
}
