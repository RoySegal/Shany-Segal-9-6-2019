import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './weather-service';
import { MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';
import { ActivatedRoute } from '@angular/router';
import { FavoritesQuery } from '../../state/favorites/favorites.query';
import { WeatherDataByDate } from '../../../utils/types/WeatherDataByDate';
import { CityFormComponent } from './city-form/city-form.component';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  daysList: WeatherDataByDate[];
  defaultCity = 'Tel Aviv';
  defaultLong;
  defaultLat;
  currentWeather: WeatherDataByDate;
  displayedCityName: string;
  cityInForm: string;

  @ViewChild(CityFormComponent) cityForm: CityFormComponent;

  constructor(public dialog: MatDialog,
              public activatedRoute: ActivatedRoute,
              private weatherService: WeatherService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setDefaultCity();
  }

  setDefaultCity() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.defaultLat = position.coords.latitude;
        this.defaultLong = position.coords.longitude;
        this.weatherService.getWeatherByLatLong(this.defaultLat, this.defaultLong).subscribe((res: any) => {
          this.defaultCity = res.city.name;
          this.initSearch();
        });
      }, (err) => {
        this.initSearch();
      }, { timeout: 100000 });
    } else {
      this.initSearch();
    }
  }

  initSearch() {
    this.activatedRoute.paramMap
      .subscribe(() => {
        if (this.routeFromFavorites()) {
          this.cityInForm = window.history.state.cityName;
          this.getWeatherByCity(name);
          this.getCurrentWeather(name);
        } else {
          this.getWeatherDataByDefualt();
        }
      });
  }

  getWeatherDataByDefualt() {
    this.getWeatherByCity(this.defaultCity);
    this.getCurrentWeather(this.defaultCity);
  }

  routeFromFavorites() {
    return window.history.state && window.history.state.cityName;
  }

  getCurrentWeather(cityName) {
    this.weatherService.getCurrentWeather(cityName).subscribe((current) => {
      this.displayedCityName = cityName;
      this.currentWeather = current;
    });
  }

  getWeatherByCity(cityName: string) {
    cityName !== '' && this.weatherService.getWeatherItemsByCity(cityName).subscribe((res) => {
      if (res) {
        this.daysList = this.weatherService.parseDataByDate(res.list);
      }
     this.cityForm.isCityInFavorite(cityName);
    }, (error) => {
      this.openDialog();
    });
  }

  onInputChange(value) {
    if(this.cityForm.searchForm.valid && value !== '') {
      this.daysList = [];
      this.displayedCityName = '';
      this.getWeatherByCity(value);
      this.getCurrentWeather(value);
    }
  }

  openDialog(): void {
    this.cityInForm = '';
    this.displayedCityName = '';
    const dialogRef = this.dialog.open(ErrorModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.displayedCityName = '';
      this.daysList = [];
    });
  }

}
