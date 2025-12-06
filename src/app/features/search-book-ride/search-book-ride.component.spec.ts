import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookRideComponent } from './search-book-ride.component';
import { FormsModule } from '@angular/forms';

describe('SearchBookRideComponent', () => {
  let component: SearchBookRideComponent;
  let fixture: ComponentFixture<SearchBookRideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBookRideComponent],
      imports: [FormsModule]  
    });
    fixture = TestBed.createComponent(SearchBookRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
