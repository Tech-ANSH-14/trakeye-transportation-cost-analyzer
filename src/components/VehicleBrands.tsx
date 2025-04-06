
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { VehicleBrand } from "@/lib/types";

interface VehicleBrandsProps {
  brands: VehicleBrand[];
  transportType: string;
  onSelectBrand: (brand: VehicleBrand, isSelected: boolean) => void;
}

const VehicleBrands = ({ brands, transportType, onSelectBrand }: VehicleBrandsProps) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleToggleBrand = (brand: VehicleBrand) => {
    let updatedSelection;
    if (selectedBrands.includes(brand.id)) {
      updatedSelection = selectedBrands.filter(id => id !== brand.id);
      onSelectBrand(brand, false);
    } else {
      updatedSelection = [...selectedBrands, brand.id];
      onSelectBrand(brand, true);
    }
    setSelectedBrands(updatedSelection);
  };

  const filteredBrands = brands.filter(brand => 
    brand.transportTypes.includes(transportType.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Brands {transportType && `(${transportType})`}</CardTitle>
      </CardHeader>
      <CardContent>
        {transportType ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-3 border rounded-md p-3">
                <Checkbox 
                  id={brand.id} 
                  checked={selectedBrands.includes(brand.id)} 
                  onCheckedChange={() => handleToggleBrand(brand)}
                />
                <div className="flex flex-col">
                  <Label htmlFor={brand.id} className="font-medium">{brand.name}</Label>
                  <span className="text-xs text-muted-foreground">Mileage: {brand.averageMileage} {brand.mileageUnit}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-6">
            Please select a transportation mode first
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleBrands;
