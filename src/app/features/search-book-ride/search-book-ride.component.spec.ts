import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookRideComponent } from './search-book-ride.component';

describe('SearchBookRideComponent', () => {
  let component: SearchBookRideComponent;
  let fixture: ComponentFixture<SearchBookRideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBookRideComponent]
    });
    fixture = TestBed.createComponent(SearchBookRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
