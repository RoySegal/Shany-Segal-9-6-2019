import { Component, Input, OnInit } from '@angular/core';
import { WeatherDataByDate } from '../../../../utils/types/WeatherDataByDate';
import { WeatherService } from '../weather-service';

@Component({
  selector: 'weather-item-day',
  templateUrl: './weather-item-day.component.html',
  styleUrls: ['./weather-item-day.component.scss']
})
export class WeatherItemDayComponent implements OnInit {

  @Input() dayWeather: WeatherDataByDate;
  iconMapping;
  mainData;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.iconMapping = this.weatherService.iconsMapping;
    this.mainData = this.dayWeather ? this.dayWeather.dayWeather.main : null;
  }

}
