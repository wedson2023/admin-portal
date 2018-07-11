import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  data_dashboard;
  trafego;

  constructor(private route: ActivatedRoute){
    this.data_dashboard = this.route.snapshot.data.data.resposta;
    this.trafego = this.data_dashboard.trafego;
  }

  // mainChart

  public mainChartData1: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Visitas'
    }
  ];

  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return 'Dia ' + value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(100 / 5),
          max: 100
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };

  public mainChartColours: Array<any> = [
    { 
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    }
  ];

  public mainChartLegend = false;
  public mainChartType = 'line';

  public mainChartLabels: Array<Number>;

  public convertToString(collection){
    let array = [];
    for(let x in collection){ array.push(collection[x].toString()); }
    return array;
  }

  ngOnInit(): void {
    this.mainChartLabels = this.convertToString(this.trafego.dias);
    for (let x in this.trafego.visitas) {
      this.mainChartData1.push(this.trafego.visitas[x]);
    }
  }

  radioModel: string = 'Month';
}
