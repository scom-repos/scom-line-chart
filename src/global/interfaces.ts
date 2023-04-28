export interface ILineChartOptions {
  title: string,
  description?: string,
  options: {
    xColumn: {
      key: string,
      type: 'time' | 'category'
    },
    yColumns: string[],
    groupBy?: string,
    seriesOptions?: {
      key: string,
      title?: string,
      color?: string
    }[],
    stacking?: boolean,
    xAxis?: {
      title?: string,
      tickFormat?: string,
      reverseValues?: boolean
    },
    yAxis?: {
      title?: string,
      tickFormat?: string,
      labelFormat?: string,
      position?: 'left' | 'right'
    },
    smooth?: boolean,
    legend?: boolean,
    showSymbol?: boolean,
    showDataLabels?: boolean,
    percentage?: boolean
  }
}

export interface ILineChartConfig {
  apiEndpoint: string,
  options: ILineChartOptions
}