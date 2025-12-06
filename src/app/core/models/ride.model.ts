export type VehicleType = 'Bike' | 'Car';

export interface Ride {
  id: number;
  ownerEmployeeId: string;
  vehicleType: VehicleType;
  vehicleNo: string;
  vacantSeats: number;
  time: string; // HH:mm
  date: string; // YYYY-MM-DD
  pickupPoint: string;
  destination: string;
  bookedEmployeeIds: string[];
}
