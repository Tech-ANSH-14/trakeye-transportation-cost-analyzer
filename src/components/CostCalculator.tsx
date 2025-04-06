
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Fuel, TransportMode, VehicleBrand } from "@/lib/types";

interface CostCalculatorProps {
  fuels: Fuel[];
  selectedMode: TransportMode | null;
  selectedBrands: VehicleBrand[];
}

const CostCalculator = ({ fuels, selectedMode, selectedBrands }: CostCalculatorProps) => {
  const [distance, setDistance] = useState<string>('100');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    if (!distance || !selectedFuelType || !selectedMode) {
      toast({
        title: "Missing information",
        description: "Please provide distance, fuel type and transportation mode",
        variant: "destructive",
      });
      return;
    }

    const distanceValue = parseFloat(distance);
    if (isNaN(distanceValue) || distanceValue <= 0) {
      toast({
        title: "Invalid distance",
        description: "Please enter a valid distance",
        variant: "destructive",
      });
      return;
    }

    // Get the selected fuel price
    const fuel = fuels.find(f => f.type.toLowerCase() === selectedFuelType.toLowerCase());
    if (!fuel) return;

    // Calculate the cost based on transportation mode and fuel efficiency
    let efficiency = 0;
    if (selectedBrand && selectedBrands.length > 0) {
      const brand = selectedBrands.find(b => b.id === selectedBrand);
      efficiency = brand ? brand.averageMileage : selectedMode.averageEfficiency;
    } else {
      efficiency = selectedMode.averageEfficiency;
    }

    // Calculate cost: distance / efficiency * fuel price
    const cost = (distanceValue / efficiency) * fuel.price;
    setResult(cost);
  };

  const compatibleFuels = fuels.filter(fuel => 
    selectedMode?.compatibleFuels.includes(fuel.type.toLowerCase())
  );

  const compatibleBrands = selectedBrands.filter(brand => 
    brand.transportTypes.includes(selectedMode?.type.toLowerCase() || '')
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Enter distance in km"
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fuel-type">Fuel Type</Label>
              <Select 
                value={selectedFuelType} 
                onValueChange={setSelectedFuelType}
                disabled={!selectedMode}
              >
                <SelectTrigger id="fuel-type">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {compatibleFuels.map((fuel) => (
                    <SelectItem key={fuel.type} value={fuel.type.toLowerCase()}>
                      {fuel.type} (₹{fuel.price}/{fuel.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicle-brand">Vehicle Brand</Label>
              <Select 
                value={selectedBrand} 
                onValueChange={setSelectedBrand}
                disabled={!selectedMode || compatibleBrands.length === 0}
              >
                <SelectTrigger id="vehicle-brand">
                  <SelectValue placeholder="Select vehicle brand" />
                </SelectTrigger>
                <SelectContent>
                  {compatibleBrands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name} ({brand.averageMileage} {brand.mileageUnit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button 
              onClick={handleCalculate}
              disabled={!selectedMode || !selectedFuelType || !distance}
            >
              Calculate Cost
            </Button>
            
            {result !== null && (
              <div className="text-right">
                <div className="text-lg font-bold">Estimated Cost</div>
                <div className="text-2xl font-bold text-primary">₹{result.toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostCalculator;
