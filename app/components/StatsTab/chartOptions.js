import formatValues from 'utils/helpers';
import Highcharts from 'highcharts';

export const singleSeriesBytesChartOptions = {
  chart: {
    backgroundColor: '#fafafa',
    /* renderTo: "globalLogsPerDayContainer", */ zoomType: 'x'
  },
  title: { text: 'Log Size per Day' }, // if changing this, make sure you also change in renderGlobalStats
  xAxis: { type: 'datetime', minRange: 8 * 24 * 60 * 15 },
  yAxis: {
    title: { text: 'Size' },
    min: 0,
    labels: {
      formatter() {
        return formatValues('Bytes', this.value);
      }
    }
  },
  tooltip: {
    formatter() {
      let s = `<span style="font-size: 10px">${Highcharts.dateFormat(
        '%A, %b %e',
        this.x
      )}</span><br/>`;

      for (let i = 0; i < this.points.length; i++) {
        const myPoint = this.points[i];
        s += `<br/><span style="color:${myPoint.series.color}">\u25CF</span>${
          myPoint.series.name
        }: <b>`;

        /* Need to check whether or not we are dealing with an
         * area range plot and display a range if we are
         */
        if (myPoint.point.low && myPoint.point.high) {
          s += `${formatValues('Bytes', myPoint.point.low)} - ${formatValues(
            'Bytes',
            myPoint.point.high
          )}</b>`;
        } else {
          s += `${formatValues('Bytes', myPoint.y)}</b>`;
        }
      }

      return s;
    },
    shared: true
  },
  // legend: { enabled: true },
  // plotOptions: { column: { stacking: 'normal' }, area: { marker: { radius: 2 }, lineWidth: 1, states: { hover: { lineWidth: 1 } }, threshold: null } },
  series: [],
  legend: { enabled: false },
  plotOptions: {
    area: {
      marker: {
        radius: 2
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1
        }
      },
      threshold: null
    },
    series: {
      pointPadding: 0.1,
      groupPadding: 0.1,
      borderWidth: 0,
      shadow: false
    }
  },
  // series: [{ type: 'column', name: 'Log Size', data: [1, 10, 1, 10, 1, 10, 1, 10] }],
  credits: false
};

export const multiSeriesBytesChartOptions = {
  chart: {
    backgroundColor: '#fafafa',
    /* renderTo: "globalLogsPerDayContainer", */ zoomType: 'x'
  },
  title: { text: 'Log Size per Day' }, // if changing this, make sure you also change in renderGlobalStats
  xAxis: { type: 'datetime', minRange: 8 * 24 * 60 * 15 },
  yAxis: {
    title: { text: 'Size' },
    min: 0,
    labels: {
      formatter() {
        return formatValues('Bytes', this.value);
      }
    }
  },
  tooltip: {
    formatter() {
      let s = `<span style="font-size: 10px">${Highcharts.dateFormat(
        '%A, %b %e',
        this.x
      )}</span><br/>`;

      for (let i = 0; i < this.points.length; i++) {
        const myPoint = this.points[i];
        s += `<br/><span style="color:${myPoint.series.color}">\u25CF</span>${
          myPoint.series.name
        }: <b>`;

        /* Need to check whether or not we are dealing with an
         * area range plot and display a range if we are
         */
        if (myPoint.point.low && myPoint.point.high) {
          s += `${formatValues('Bytes', myPoint.point.low)} - ${formatValues(
            'Bytes',
            myPoint.point.high
          )}</b> (${Math.round(myPoint.point.percentage)}%)`;
        } else {
          s += `${formatValues('Bytes', myPoint.y)}</b> (${Math.round(
            myPoint.point.percentage
          )}%)`;
        }
      }

      return s;
    },
    shared: true
  },
  legend: { enabled: true },
  plotOptions: {
    column: {
      stacking: 'normal'
    },
    area: {
      marker: {
        radius: 2
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1
        }
      },
      threshold: null
    },
    series: {
      pointPadding: 0.1,
      groupPadding: 0.1,
      borderWidth: 0,
      shadow: false
    }
  },
  series: [],
  credits: false
};

export const singleSeriesNumericChartOptions = {
  chart: {
    backgroundColor: '#fafafa',
    /* renderTo: "globalLogsPerDayContainer", */ zoomType: 'x'
  },
  title: { text: 'Messages per Day' },
  xAxis: { type: 'datetime', minRange: 8 * 24 * 60 * 15 },
  yAxis: {
    title: { text: 'Messages' },
    min: 0,
    labels: {
      formatter() {
        return formatValues('Numeric', this.value);
      }
    }
  },
  tooltip: {
    formatter() {
      let s = `<span style="font-size: 10px">${Highcharts.dateFormat(
        '%A, %b %e',
        this.x
      )}</span><br/>`;

      for (let i = 0; i < this.points.length; i++) {
        const myPoint = this.points[i];
        s += `<br/><span style="color:${myPoint.series.color}">\u25CF</span>${
          myPoint.series.name
        }: <b>`;

        /* Need to check whether or not we are dealing with an
         * area range plot and display a range if we are
         */
        if (myPoint.point.low && myPoint.point.high) {
          s += `${formatValues('Numeric', myPoint.point.low)} - ${formatValues(
            'Numeric',
            myPoint.point.high
          )}</b>`;
        } else {
          s += `${formatValues('Numeric', myPoint.y)}</b>`;
        }
      }

      return s;
    },
    shared: true
  },
  // legend: { enabled: true },
  // plotOptions: { column: { stacking: 'normal' }, area: { marker: { radius: 2 }, lineWidth: 1, states: { hover: { lineWidth: 1 } }, threshold: null } },
  series: [],
  legend: { enabled: false },
  plotOptions: {
    area: {
      marker: {
        radius: 2
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1
        }
      },
      threshold: null
    },
    series: {
      pointPadding: 0.1,
      groupPadding: 0.1,
      borderWidth: 0,
      shadow: false
    }
  },
  // series: [{ type: 'column', name: 'Messages/day', data: [1, 10, 1, 10, 1, 10, 1, 10] }],
  credits: false
};

export const multiSeriesNumericChartOptions = {
  chart: {
    backgroundColor: '#fafafa',
    /* renderTo: "globalLogsPerDayContainer", */ zoomType: 'x'
  },
  title: { text: 'Messages per Day' },
  xAxis: { type: 'datetime', minRange: 8 * 24 * 60 * 15 },
  yAxis: {
    title: { text: 'Messages' },
    min: 0,
    labels: {
      formatter() {
        return formatValues('Numeric', this.value);
      }
    }
  },
  tooltip: {
    formatter() {
      let s = `<span style="font-size: 10px">${Highcharts.dateFormat(
        '%A, %b %e',
        this.x
      )}</span><br/>`;

      for (let i = 0; i < this.points.length; i++) {
        const myPoint = this.points[i];
        s += `<br/><span style="color:${myPoint.series.color}">\u25CF</span>${
          myPoint.series.name
        }: <b>`;

        /* Need to check whether or not we are dealing with an
         * area range plot and display a range if we are
         */
        if (myPoint.point.low && myPoint.point.high) {
          s += `${formatValues('Numeric', myPoint.point.low)} - ${formatValues(
            'Numeric',
            myPoint.point.high
          )}</b> (${Math.round(myPoint.point.percentage)}%)`;
        } else {
          s += `${formatValues('Numeric', myPoint.y)}</b> (${Math.round(
            myPoint.point.percentage
          )}%)`;
        }
      }

      return s;
    },
    shared: true
  },
  legend: { enabled: true },
  plotOptions: {
    column: {
      stacking: 'normal'
    },
    area: {
      marker: {
        radius: 2
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1
        }
      },
      threshold: null
    },
    series: {
      pointPadding: 0.1,
      groupPadding: 0.1,
      borderWidth: 0,
      shadow: false
    }
  },
  series: [],
  credits: false
};

export const colors = [
  '#76B026',
  '#1E8D44',
  '#B0BD29',
  '#638436',
  '#2B6A40',
  '#878E3A',
  '#47720C',
  '#0A5B26',
  '#727B0D',
  '#A2D859',
  '#52C679',
  '#D3DE5B',
  '#B0D87B',
  '#71C68D',
  '#D6DE7E'
];

// if (sourceId) {
//   const logfilesSeries = {
//     name: 'Log File Size',
//     data: []
//   };

//   const archiveSeries = {
//     name: 'Archived Log Size',
//     data: []
//   };

//   const messageSeries = {
//     name: 'Number of Messages',
//     data: []
//   };

//   if (source.dates !== null && source.dates.length > 0) {
//     source.dates.forEach((stat) => {
//       if (chart === 'size') {
//         logfilesSeries.data.push([stat.date, stat.size]);
//         archiveSeries.data.push([stat.date, stat.archiveSize]);
//       } else {
//         messageSeries.data.push([stat.date, stat.messages]);
//       }
//     });
//     if (chart === 'size') {
//       seriesArray.push(logfilesSeries, archiveSeries);
//     } else {
//       seriesArray.push(messageSeries);
//     }
//   }
// }
