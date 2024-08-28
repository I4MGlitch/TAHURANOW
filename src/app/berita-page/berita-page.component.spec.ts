import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeritaPageComponent } from './berita-page.component';

describe('BeritaPageComponent', () => {
  let component: BeritaPageComponent;
  let fixture: ComponentFixture<BeritaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeritaPageComponent]
    });
    fixture = TestBed.createComponent(BeritaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
