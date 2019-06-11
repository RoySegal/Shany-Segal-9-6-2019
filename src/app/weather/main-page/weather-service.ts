import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FavoritesQuery } from '../../state/favorites/favorites.query';
import { FavoriteStore } from '../../state/favorites/favorite.store';
import { guid } from '@datorama/akita';
import { WeatherDataByDate } from '../../../utils/types/WeatherDataByDate';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  iconsMapping;

  constructor(private http: HttpClient,
              private favoriteQuery: FavoritesQuery,
              private store: FavoriteStore) {
   this.getIconsMapping();
  }

  getIconsMapping() {
    this.http.get('./assets/icons-mapping.json').subscribe((res) => {
      this.iconsMapping = res;
    });
  }

  getWeatherItemsByCity(cityName: string): Observable<any> {
    return this.getBaseCall('forecast', cityName);
  }

  getCurrentWeather(cityName: string): Observable<WeatherDataByDate> {
    if (cityName !== '') {
      return this.getBaseCall('find', cityName)
        .pipe(map((res: any) => {
          return {
            date: new Date(),
            day: this.days[new Date().getDate()],
            dayWeather: {
              main: res.list[res.list.length - 1] && res.list[res.list.length - 1].main,
              weather: res.list[res.list.length - 1] && res.list[res.list.length - 1].weather
            }
          };
        }));
    }
    return new Observable();

  }

  getWeatherByLatLong(lat, lon) {
    return this.http.get(
      environment.baseUrl +
      '/forecast' +
      '?lat=' + lat +
      '&lon=' + lon +
      '&units=' + environment.units +
      '&appid=' + environment.appId
    );
  }

  parseDataByDate(data: any[]): WeatherDataByDate[] {
    let daysListData: WeatherDataByDate[] = [];
    data.forEach((item) => {
      if (item.dt_txt.includes('09:00:00')) {
        const newDayData = this.buildDayWeatherObject(item);
        daysListData.push(newDayData);
      } else if (item.dt_txt.includes('15:00:00')) {
        daysListData = this.addNightData(daysListData, item);
      }
    });
    return daysListData;
  }

  addCityToFavorite(cityName: string) {
    const findItem = this.favoriteQuery.getAll().filter((cityInStore) => cityInStore.cityName === cityName.toLowerCase());

    if (findItem.length > 0) {
      return;
    }

    const item = { id: guid(), cityName: cityName.toLowerCase() };
    return this.store.add(item);
  }

  removeFromFavorite(cityName: string) {
    const findItem = this.favoriteQuery.getAll().filter((cityInStore) => cityInStore.cityName === cityName.toLowerCase());

    if (findItem.length > 0) {
      this.store.remove(findItem[0].id);
    }
  }

  private getBaseCall(typeOfCall: 'forecast' | 'find', cityName: string): Observable<any> {
    if (cityName !== '') {
      return this.http.get(
        environment.baseUrl +
        '/' + typeOfCall +
        '?q=' + cityName +
        '&units=' + environment.units +
        '&appid=' + environment.appId
      );
    }
  }

  private buildDayWeatherObject(item) {
    const dayName = this.days[new Date(item.dt_txt).getDay()];
    return {
      date: item.dt_txt,
      day: dayName,
      dayWeather: {
        main: item.main,
        weather: item.weather,
        wind: item.wind,
      }
    };
  }

  private addNightData(daysListData, item) {
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
    return daysListData;
  }

}
