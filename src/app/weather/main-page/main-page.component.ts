import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onlyEnglishLetters } from '../../../utils/regex/onlyEnglishLetters';
import { DaysListData, WeatherService } from './weather-service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';
import { ActivatedRoute } from '@angular/router';
import { FavoritesQuery } from '../../state/favorites/favorites.query';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  searchForm: FormGroup;
  daysList: DaysListData[];
  defaultCity = 'Tel Aviv';
  currentWeather: DaysListData;
  isInFavorite = false;
  displayedCityName: string;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              public activatedRoute: ActivatedRoute,
              private favoriteQuery: FavoritesQuery,
              private weatherService: WeatherService) { }

  ngOnInit() {
    this.initForm();
    this.initSearch();
    this.listenToInputChange();
  }

  initSearch() {
  this.activatedRoute.paramMap
    .subscribe(() => {
      if(window.history.state && window.history.state.cityName) {
        const name = window.history.state.cityName;
        this.searchForm.controls.searchPlace.patchValue(name);
        this.getWeatherByCity(name);
        this.getCurrentWeather(name);
      } else {
        this.getWeatherByCity(this.defaultCity);
        this.getCurrentWeather(this.defaultCity);
      }
    });

  }

  initForm() {
    this.searchForm = this.fb.group ({
      searchPlace: ['',  Validators.pattern(onlyEnglishLetters)],
    });
  }

  getCurrentWeather(cityName) {
    this.weatherService.getCurrentWeather(cityName).subscribe((current) => {
      this.displayedCityName = cityName;
      this.currentWeather = current;
    })
  }

  getWeatherByCity(cityName: string) {
    cityName !== '' && this.weatherService.getWeatherItemsByCity(cityName).subscribe((res) => {
      if (res) this.daysList = this.weatherService.parseDataByDate(res.list);
      this.isInFavorite = this.favoriteQuery.isCityInFavorite(cityName);
    }, (error) => {
      this.openDialog();
    });
  }

  listenToInputChange() {
      this.searchForm
        .get('searchPlace')
        .valueChanges
        .pipe(distinctUntilChanged(), debounceTime(1500))
        .subscribe(value => {
          this.daysList = [];
          this.displayedCityName = '';
          if (this.searchForm.valid &&  value !== '') {
            this.getWeatherByCity(value);
            this.getCurrentWeather(value);
          }
        }) ;
  }

  openDialog(): void {
    this.searchForm.controls.searchPlace.patchValue('');
    this.displayedCityName = '';
    const dialogRef = this.dialog.open(ErrorModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.displayedCityName = '';
      this.daysList = [];
    });
  }

  isAddFavoriteDisabled(): boolean {
    return !this.searchForm.valid ||
      this.searchForm.get('searchPlace').value === '' || this.isInFavorite;
  }

  isRemoveFavoriteDisabled(): boolean {
    return !this.searchForm.valid ||
      this.searchForm.get('searchPlace').value === '' || !this.isInFavorite;
  }

  addToFavorite() {
    this.weatherService.addCityToFavorite(this.searchForm.get('searchPlace').value);
    this.isInFavorite = true;
  }

  removeFromFavorite() {
    this.weatherService.removeFromFavorite(this.searchForm.get('searchPlace').value);
    this.isInFavorite = false;
  }

}
