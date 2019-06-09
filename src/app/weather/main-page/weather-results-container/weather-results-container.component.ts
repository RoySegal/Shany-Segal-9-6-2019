import { Component, Input, OnInit } from '@angular/core';
import { DaysListData } from '../weather-service';

@Component({
  selector: 'weather-results-container',
  templateUrl: './weather-results-container.component.html',
  styleUrls: ['./weather-results-container.component.scss']
})
export class WeatherResultsContainerComponent implements OnInit {

  @Input() daysWeatherList: DaysListData[];

  constructor() { }

  ngOnInit() {
  }

}
