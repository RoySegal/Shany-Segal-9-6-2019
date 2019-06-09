import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { FavoriteCity } from '../../types/FavoriteCity';


export interface FavoriteState extends EntityState<FavoriteCity> {
}


@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'favorite',
  idKey: 'id'
})
export class FavoriteStore extends EntityStore<FavoriteState, FavoriteCity> {
  constructor() {
    super();
  }
}
