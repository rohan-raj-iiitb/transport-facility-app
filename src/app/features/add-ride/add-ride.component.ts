import { Component } from '@angular/core';
import { RideService } from '../../core/services/ride.service';
import { VehicleType } from '../../core/models/ride.model';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent {
  vehicleTypes: VehicleType[] = ['Bike', 'Car'];

  form = {
    employeeId: '',
    vehicleType: 'Car' as VehicleType,
    vehicleNo: '',
    vacantSeats: 1,
    time: '',
    pickupPoint: '',
    destination: ''
  };

  message = '';

  constructor(private rideService: RideService) {}

  onSubmit(): void {
    if (!this.isValid()) {
      this.message = 'Please fill all mandatory fields.';
      return;
    }

    this.rideService.addRide({
      ownerEmployeeId: this.form.employeeId,
      vehicleType: this.form.vehicleType,
      vehicleNo: this.form.vehicleNo,
      vacantSeats: this.form.vacantSeats,
      time: this.form.time,
      pickupPoint: this.form.pickupPoint,
      destination: this.form.destination
    });

    this.message = 'Ride added successfully for today.';
    this.resetForm();
  }

  private isValid(): boolean {
    return !!(
      this.form.employeeId &&
      this.form.vehicleNo &&
      this.form.vacantSeats &&
      this.form.time &&
      this.form.pickupPoint &&
      this.form.destination
    );
  }

  private resetForm(): void {
    this.form.vehicleType = 'Car';
    this.form.vacantSeats = 1;
    this.form.time = '';
    this.form.vehicleNo = '';
    this.form.pickupPoint = '';
    this.form.destination = '';
  }
}
