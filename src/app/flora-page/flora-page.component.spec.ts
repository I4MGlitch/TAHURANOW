import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloraPageComponent } from './flora-page.component';

describe('FloraPageComponent', () => {
  let component: FloraPageComponent;
  let fixture: ComponentFixture<FloraPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloraPageComponent]
    });
    fixture = TestBed.createComponent(FloraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
