import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetail } from './tv-detail';

describe('TvDetail', () => {
  let component: TvDetail;
  let fixture: ComponentFixture<TvDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
