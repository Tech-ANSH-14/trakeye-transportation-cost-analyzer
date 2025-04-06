
import { Fuel, TransportMode, VehicleBrand } from './types';

export const fuels: Fuel[] = [
  {
    type: 'Petrol',
    price: 102.66,
    previousPrice: 101.94,
    unit: 'liter',
    lastUpdated: '2025-04-06 09:00 AM',
  },
  {
    type: 'Diesel',
    price: 89.62,
    previousPrice: 90.31,
    unit: 'liter',
    lastUpdated: '2025-04-06 09:00 AM',
  },
  {
    type: 'CNG',
    price: 74.25,
    previousPrice: 74.25,
    unit: 'kg',
    lastUpdated: '2025-04-06 09:00 AM',
  },
  {
    type: 'Electricity',
    price: 12.80,
    previousPrice: 12.50,
    unit: 'kWh',
    lastUpdated: '2025-04-06 09:00 AM',
  }
];

export const transportModes: TransportMode[] = [
  {
    id: 'car',
    type: 'Car',
    averageEfficiency: 15,
    efficiencyUnit: 'km/l',
    compatibleFuels: ['petrol', 'diesel', 'cng', 'electricity'],
  },
  {
    id: 'bus',
    type: 'Bus',
    averageEfficiency: 5,
    efficiencyUnit: 'km/l',
    compatibleFuels: ['diesel', 'cng'],
  },
  {
    id: 'truck',
    type: 'Truck',
    averageEfficiency: 4,
    efficiencyUnit: 'km/l',
    compatibleFuels: ['diesel'],
  },
  {
    id: 'tractor',
    type: 'Tractor',
    averageEfficiency: 6,
    efficiencyUnit: 'km/l',
    compatibleFuels: ['diesel'],
  }
];

export const vehicleBrands: VehicleBrand[] = [
  // Cars
  {
    id: 'maruti',
    name: 'Maruti Suzuki',
    transportTypes: ['car'],
    averageMileage: 18,
    mileageUnit: 'km/l',
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    transportTypes: ['car'],
    averageMileage: 16,
    mileageUnit: 'km/l',
  },
  {
    id: 'tata',
    name: 'Tata Motors',
    transportTypes: ['car', 'truck', 'bus'],
    averageMileage: 15,
    mileageUnit: 'km/l',
  },
  {
    id: 'toyota',
    name: 'Toyota',
    transportTypes: ['car'],
    averageMileage: 14,
    mileageUnit: 'km/l',
  },
  // Trucks
  {
    id: 'ashok',
    name: 'Ashok Leyland',
    transportTypes: ['truck', 'bus'],
    averageMileage: 4,
    mileageUnit: 'km/l',
  },
  {
    id: 'eicher',
    name: 'Eicher Motors',
    transportTypes: ['truck', 'bus'],
    averageMileage: 5,
    mileageUnit: 'km/l',
  },
  // Buses
  {
    id: 'volvo',
    name: 'Volvo',
    transportTypes: ['bus'],
    averageMileage: 4.5,
    mileageUnit: 'km/l',
  },
  // Tractors
  {
    id: 'mahindra',
    name: 'Mahindra',
    transportTypes: ['tractor', 'car'],
    averageMileage: 6.5,
    mileageUnit: 'km/l',
  },
  {
    id: 'john-deere',
    name: 'John Deere',
    transportTypes: ['tractor'],
    averageMileage: 6,
    mileageUnit: 'km/l',
  }
];
