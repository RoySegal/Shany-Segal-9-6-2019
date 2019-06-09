import { Component, Input, OnInit } from '@angular/core';
import { DaysListData } from '../weather-service';

@Component({
  selector: 'weather-item-day',
  templateUrl: './weather-item-day.component.html',
  styleUrls: ['./weather-item-day.component.scss']
})
export class WeatherItemDayComponent implements OnInit {

  @Input() dayWeather: DaysListData;

  constructor() { }

  ngOnInit() {
  }

}
