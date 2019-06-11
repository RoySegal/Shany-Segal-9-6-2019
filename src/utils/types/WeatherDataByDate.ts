import { WeatherInnerData } from '../../types/WeatherInnerData';

export interface WeatherDataByDate {
  date: Date;
  day: string;
  dayWeather: WeatherInnerData;
  nightWeather?: WeatherInnerData;
}
