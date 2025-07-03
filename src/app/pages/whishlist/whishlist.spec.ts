import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whishlist } from './whishlist';

describe('Whishlist', () => {
  let component: Whishlist;
  let fixture: ComponentFixture<Whishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Whishlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Whishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
