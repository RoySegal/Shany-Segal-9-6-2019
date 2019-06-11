import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { FavoriteState, FavoriteStore } from './favorite.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FavoriteCity } from '../../../types/FavoriteCity';

@Injectable({
  providedIn: 'root'
})
export class FavoritesQuery extends QueryEntity<FavoriteState, FavoriteCity> {

  selectItems$: Observable<FavoriteCity[]>;
  selectTotalAmount$;

  constructor(protected store: FavoriteStore) {
    super(store);
    this.subscribeToChanges();
  }

  isCityInFavorite(cityName: string): boolean {
    const findItem = this.getAll().filter((cityInStore) => cityInStore.cityName === cityName.toLowerCase());
    return findItem.length > 0;
  }

  private subscribeToChanges() {
    this.selectItems$ = this.selectAll();
    this.selectTotalAmount$ = this.selectItems$.pipe(map(items => (items as any).length));
  }





}
