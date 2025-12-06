import { Component } from '@angular/core';
import { RideService } from '../../core/services/ride.service';
import { Ride, VehicleType } from '../../core/models/ride.model';

@Component({
  selector: 'app-search-book-ride',
  templateUrl: './search-book-ride.component.html',
  styleUrls: ['./search-book-ride.component.css']
})
export class SearchBookRideComponent {

  vehicleTypes: (VehicleType | 'All')[] = ['All', 'Bike', 'Car'];

  employeeId = '';
  time = '';
  vehicleType: VehicleType | 'All' = 'All';

  rides: Ride[] = [];
  message = '';

  constructor(private rideService: RideService) {}

  onSearch(): void {
    if (!this.time) {
      this.message = 'Please select a time to search rides.';
      this.rides = [];
      return;
    }

    this.rides = this.rideService.searchRides(this.time, this.vehicleType);
    this.message = this.rides.length ? '' : 'No matching rides found.';
  }

  onBook(ride: Ride): void {
    if (!this.employeeId) {
      this.message = 'Please enter your Employee ID before booking.';
      return;
    }

    const result = this.rideService.bookRide(ride.id, this.employeeId);
    this.message = result.message;

    if (result.success) {
      this.onSearch(); 
    }
  }
}
