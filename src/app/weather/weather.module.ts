import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatAutocompleteModule,
  MatBadgeModule, MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule, MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatProgressSpinnerModule, MatSelectModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherResultsContainerComponent } from './main-page/weather-results-container/weather-results-container.component';
import { WeatherItemDayComponent } from './main-page/weather-item-day/weather-item-day.component';

const routes: Routes = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: MainPageComponent,  },
  { path: 'favorite-list', component:  FavoriteListComponent},
];



@NgModule({
  entryComponents: [
  ],
  declarations: [FavoriteListComponent, MainPageComponent, WeatherResultsContainerComponent, WeatherItemDayComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSelectModule,

  ]
})
export class WeatherModule { }
