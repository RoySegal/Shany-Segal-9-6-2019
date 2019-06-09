import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatBadgeModule, MatButtonModule,
  MatCardModule,
  MatChipsModule, MatDialogModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatListModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ErrorModalComponent } from './error-modal/error-modal.component';

const materialModules = [
  MatBadgeModule,
  MatChipsModule,
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule
];


@NgModule({
  entryComponents: [
    ErrorModalComponent
  ],
  declarations: [
    AppComponent,
    ErrorModalComponent,
  ],
  imports: [
    ...materialModules,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
