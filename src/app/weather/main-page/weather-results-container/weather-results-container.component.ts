import { Component, Input, OnInit } from '@angular/core';
import { WeatherDataByDate } from '../../../../utils/types/WeatherDataByDate';
import { listAnimation } from '../../../../animations/animations';

@Component({
  selector: 'weather-results-container',
  templateUrl: './weather-results-container.component.html',
  styleUrls: ['./weather-results-container.component.scss'],
  animations: [ listAnimation],
})
export class WeatherResultsContainerComponent implements OnInit {

  @Input() daysWeatherList: WeatherDataByDate[];

  constructor() { }

  ngOnInit() {
  }

}
