import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AddRideComponent } from './features/add-ride/add-ride.component';
import { SearchBookRideComponent } from './features/search-book-ride/search-book-ride.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddRideComponent,
        SearchBookRideComponent
      ],
      imports: [FormsModule]   // IMPORTANT for ngModel
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Transport Facility Management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Transport Facility Management');
  });
});
