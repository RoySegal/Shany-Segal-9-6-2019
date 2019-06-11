import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherService } from '../weather-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onlyEnglishLetters } from '../../../../utils/regex/onlyEnglishLetters';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FavoritesQuery } from '../../../state/favorites/favorites.query';

@Component({
  selector: 'city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {

  _isInFavorite = false;
  searchForm: FormGroup;

  @Input() set formValue(city) {
    city && this.searchForm.controls.searchPlace.patchValue(city);
  }

  @Output() onCitySearch = new EventEmitter<string>();


  constructor( private weatherService: WeatherService,
               private favoriteQuery: FavoritesQuery,
               private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.listenToInputChange();
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchPlace: ['', Validators.pattern(onlyEnglishLetters)],
    });
  }

  isAddFavoriteDisabled(): boolean {
    return !this.searchForm.valid ||
      this.searchForm.get('searchPlace').value === '' || this._isInFavorite;
  }

  isRemoveFavoriteDisabled(): boolean {
    return !this.searchForm.valid ||
      this.searchForm.get('searchPlace').value === '' || !this._isInFavorite;
  }

  addToFavorite() {
    this.weatherService.addCityToFavorite(this.searchForm.get('searchPlace').value);
    this._isInFavorite = true;
  }

  removeFromFavorite() {
    this.weatherService.removeFromFavorite(this.searchForm.get('searchPlace').value);
    this._isInFavorite = false;
  }

  listenToInputChange() {
    this.searchForm
      .get('searchPlace')
      .valueChanges
      .pipe(distinctUntilChanged(), debounceTime(1500))
      .subscribe((city) => {
          this.onCitySearch.emit(city);
      });
  }

 isCityInFavorite(cityName) {
   this._isInFavorite = this.favoriteQuery.isCityInFavorite(cityName);
 }

}
