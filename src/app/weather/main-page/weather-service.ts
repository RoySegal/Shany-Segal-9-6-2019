import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { FavoritesQuery } from '../../state/favorites/favorites.query';
import { FavoriteStore } from '../../state/favorites/favorite.store';
import { guid } from '@datorama/akita';

export interface DaysListData {
  date: Date;
  day: string;
  dayWeather: WeatherInnerData;
  nightWeather?: WeatherInnerData;
}

export interface WeatherInnerData {
  main: any;
  weather: any;
  wind?: any;
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient,
              private favoriteQuery: FavoritesQuery,
              private store: FavoriteStore) {
  }

  getWeatherItemsByCity(cityName: string): Observable<any> {
    return this.http.get(
      environment.baseUrl +
      '/forecast' +
      '?q=' + cityName +
      '&units=metric' +
      '&appid=' + environment.appId
    );
  }

  getCurrentWeather(cityName: string): Observable<DaysListData> {
    return this.http.get(
      environment.baseUrl +
      '/find' +
      '?q=' + cityName +
      '&units=metric' +
      '&appid=' + environment.appId
    ).pipe(map((res: any) => {
      return {
        date: new Date(),
        day: days[new Date().getDate()],
        dayWeather: {
          main: res.list[res.list.length - 1] && res.list[res.list.length - 1].main,
          weather: res.list[res.list.length - 1] && res.list[res.list.length - 1].weather
        }
      };
    }));
  }

  parseDataByDate(data: any[]) {
    let daysListData: DaysListData[] = [];
    data.forEach((item) => {
      if (item.dt_txt.includes('12:00:00')) {
        const dayName = days[new Date(item.dt_txt).getDay()];
        const newDayData: DaysListData = {
          date: item.dt_txt,
          day: dayName,
          dayWeather: {
            main: item.main,
            weather: item.weather,
            wind: item.wind,
          }
        };
        daysListData.push(newDayData);
      } else if (item.dt_txt.includes('21:00:00')) {
        daysListData = daysListData.map((dayData: any) => {
          if (new Date(dayData.date).getDate() === new Date(item.dt_txt).getDate()) {
            dayData.nightWeather = {
                main: item.main,
                weather: item.weather,
                wind: item.wind,
              };
          }
          return dayData;
        });
      }
    });

    return daysListData;
  }

  addCityToFavorite(cityName: string) {
    const findItem = this.favoriteQuery.getAll().filter((cityInStore) => cityInStore.cityName === cityName);

    if (findItem.length > 0) {
      return;
    }

    const item = { id: guid(), cityName };
    return this.store.add(item);
  }

  removeFromFavorite(cityName: string) {
    const findItem = this.favoriteQuery.getAll().filter((cityInStore) => cityInStore.cityName === cityName);

    if (findItem.length > 0) {
      this.store.remove(findItem[0].id);
    }
  }

}
