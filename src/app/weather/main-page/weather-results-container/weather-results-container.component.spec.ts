import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherResultsContainerComponent } from './weather-results-container.component';

describe('WeatherResultsContainerComponent', () => {
  let component: WeatherResultsContainerComponent;
  let fixture: ComponentFixture<WeatherResultsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherResultsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherResultsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
