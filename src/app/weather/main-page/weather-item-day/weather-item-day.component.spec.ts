import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherItemDayComponent } from './weather-item-day.component';

describe('WeatherItemDayComponent', () => {
  let component: WeatherItemDayComponent;
  let fixture: ComponentFixture<WeatherItemDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherItemDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherItemDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
