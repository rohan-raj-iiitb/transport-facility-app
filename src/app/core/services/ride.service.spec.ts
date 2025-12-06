import { TestBed } from '@angular/core/testing';
import { RideService } from './ride.service';

describe('RideService', () => {
  let service: RideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideService);

    // reset internal state (since we used localStorage)
    (service as any)['rides'] = [];
    (service as any)['rideIdCounter'] = 1;
    localStorage.removeItem('rides');
  });

  it('should add a ride for today', () => {
    const ride = service.addRide({
      ownerEmployeeId: 'E1',
      vehicleType: 'Car',
      vehicleNo: 'KA-01',
      vacantSeats: 2,
      time: '10:00',
      pickupPoint: 'A',
      destination: 'B'
    });

    expect(ride.id).toBe(1);
    expect(ride.ownerEmployeeId).toBe('E1');
  });

  it('should prevent booking own ride', () => {
    const ride = service.addRide({
      ownerEmployeeId: 'E1',
      vehicleType: 'Car',
      vehicleNo: 'KA-01',
      vacantSeats: 2,
      time: '10:00',
      pickupPoint: 'A',
      destination: 'B'
    });

    const result = service.bookRide(ride.id, 'E1');
    expect(result.success).toBeFalse();
    expect(result.message).toContain('own ride');
  });

  it('should prevent double booking', () => {
    const ride = service.addRide({
      ownerEmployeeId: 'E1',
      vehicleType: 'Car',
      vehicleNo: 'KA-01',
      vacantSeats: 2,
      time: '10:00',
      pickupPoint: 'A',
      destination: 'B'
    });

    const first = service.bookRide(ride.id, 'E2');
    const second = service.bookRide(ride.id, 'E2');

    expect(first.success).toBeTrue();
    expect(second.success).toBeFalse();
  });

  it('should filter rides by time within +/- 60 minutes', () => {
    service.addRide({
      ownerEmployeeId: 'E1',
      vehicleType: 'Car',
      vehicleNo: 'KA-01',
      vacantSeats: 2,
      time: '10:00',
      pickupPoint: 'A',
      destination: 'B'
    });

    const res = service.searchRides('09:30', 'Car');
    expect(res.length).toBe(1);
  });
});
