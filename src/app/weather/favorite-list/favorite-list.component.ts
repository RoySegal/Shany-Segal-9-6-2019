import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteCity } from '../../../types/FavoriteCity';
import { FavoritesQuery } from '../../state/favorites/favorites.query';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../main-page/weather-service';
import { map } from 'rxjs/operators';
import { slideFromBottom } from '../../../animations/animations';

@Component({
  selector: 'favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  animations: [ slideFromBottom ]
})
export class FavoriteListComponent implements OnInit {

  allFavorite$: Observable<FavoriteCity[]>;
  allFavoritesWeather = [];

  constructor(private favoriteQuery: FavoritesQuery,
              private router: Router,
              private route: ActivatedRoute,
              private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.allFavorite$ = this.favoriteQuery.selectItems$;
    this.favoriteQuery.selectItems$.pipe(map((all) => {
       return all.forEach((city) =>
        this.weatherService.getCurrentWeather(city.cityName).subscribe(((weather) => {
          this.allFavoritesWeather.push({cityName: city.cityName, data: weather})
        })));
    })).subscribe();
  }

  navigateToCityWeather(cityName) {
    this.router.navigateByUrl('/weather/home', { state: { cityName } });
  }

}
