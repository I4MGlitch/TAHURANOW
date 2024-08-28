import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeritaDetailPageComponent } from './berita-detail-page.component';

describe('BeritaDetailPageComponent', () => {
  let component: BeritaDetailPageComponent;
  let fixture: ComponentFixture<BeritaDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeritaDetailPageComponent]
    });
    fixture = TestBed.createComponent(BeritaDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
