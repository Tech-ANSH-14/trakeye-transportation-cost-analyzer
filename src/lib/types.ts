
export interface Fuel {
  type: string;
  price: number;
  previousPrice: number;
  unit: string;
  lastUpdated: string;
}

export interface TransportMode {
  id: string;
  type: string;
  averageEfficiency: number;
  efficiencyUnit: string;
  compatibleFuels: string[];
}

export interface VehicleBrand {
  id: string;
  name: string;
  transportTypes: string[];
  averageMileage: number;
  mileageUnit: string;
}

export interface Route {
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedTime: string;
}
