import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaunaPageComponent } from './fauna-page.component';

describe('FaunaPageComponent', () => {
  let component: FaunaPageComponent;
  let fixture: ComponentFixture<FaunaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaunaPageComponent]
    });
    fixture = TestBed.createComponent(FaunaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
