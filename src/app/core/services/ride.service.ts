import { Injectable } from '@angular/core';
import { Ride, VehicleType } from '../models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private rides: Ride[] = [];
  private rideIdCounter = 1;

  constructor() {
    // Optional persistence
    const saved = localStorage.getItem('rides');
    if (saved) {
      this.rides = JSON.parse(saved);
      this.rideIdCounter = this.rides.length
        ? Math.max(...this.rides.map(r => r.id)) + 1
        : 1;
    }
  }

  private persist(): void {
    localStorage.setItem('rides', JSON.stringify(this.rides));
  }

  private getToday(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private toMinutes(time: string): number {
    const [hh, mm] = time.split(':').map(Number);
    return hh * 60 + mm;
  }

  getAllRides(): Ride[] {
    return [...this.rides];
  }

  addRide(payload: {
    ownerEmployeeId: string;
    vehicleType: VehicleType;
    vehicleNo: string;
    vacantSeats: number;
    time: string;
    pickupPoint: string;
    destination: string;
  }): Ride {
    const ride: Ride = {
      id: this.rideIdCounter++,
      ownerEmployeeId: payload.ownerEmployeeId.trim(),
      vehicleType: payload.vehicleType,
      vehicleNo: payload.vehicleNo.trim(),
      vacantSeats: Number(payload.vacantSeats),
      time: payload.time,
      date: this.getToday(),
      pickupPoint: payload.pickupPoint.trim(),
      destination: payload.destination.trim(),
      bookedEmployeeIds: []
    };

    this.rides.push(ride);
    this.persist();
    return ride;
  }

  searchRides(time: string, vehicleType?: VehicleType | 'All'): Ride[] {
    const targetMinutes = this.toMinutes(time);
    const today = this.getToday();

    let result = this.rides.filter(r => {
      if (r.date !== today) return false;
      if (r.vacantSeats <= 0) return false;

      const diff = Math.abs(this.toMinutes(r.time) - targetMinutes);
      return diff <= 60; // +/- 60 minutes
    });

    if (vehicleType && vehicleType !== 'All') {
      result = result.filter(r => r.vehicleType === vehicleType);
    }

    return result;
  }

  bookRide(rideId: number, employeeIdRaw: string): { success: boolean; message: string } {
    const employeeId = employeeIdRaw.trim();
    const ride = this.rides.find(r => r.id === rideId);
    if (!ride) {
      return { success: false, message: 'Ride not found' };
    }

    if (ride.date !== this.getToday()) {
      return { success: false, message: 'Ride is not available for today' };
    }

    if (ride.ownerEmployeeId === employeeId) {
      return { success: false, message: 'You cannot book your own ride' };
    }

    if (ride.bookedEmployeeIds.includes(employeeId)) {
      return { success: false, message: 'You have already booked this ride' };
    }

    if (ride.vacantSeats <= 0) {
      return { success: false, message: 'No seats available' };
    }

    ride.vacantSeats -= 1;
    ride.bookedEmployeeIds.push(employeeId);
    this.persist();

    return { success: true, message: 'Ride booked successfully' };
  }
}
