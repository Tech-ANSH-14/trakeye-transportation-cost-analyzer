
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Fuel } from "@/lib/types";

interface FuelPriceCardProps {
  fuel: Fuel;
}

const FuelPriceCard = ({ fuel }: FuelPriceCardProps) => {
  const getFuelClass = () => {
    switch (fuel.type.toLowerCase()) {
      case 'petrol': return 'fuel-petrol';
      case 'diesel': return 'fuel-diesel';
      case 'cng': return 'fuel-cng';
      case 'electricity': return 'fuel-ev';
      default: return '';
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  return (
    <Card className={`h-full ${getFuelClass()}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>{fuel.type}</span>
          <span className="text-lg font-bold">{formatPrice(fuel.price)}</span>
        </CardTitle>
        <CardDescription>{fuel.unit}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <div className="flex justify-between mb-1">
            <span>Yesterday</span>
            <span>{formatPrice(fuel.previousPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Change</span>
            <span className={fuel.price > fuel.previousPrice ? 'text-red-500' : 'text-green-500'}>
              {fuel.price > fuel.previousPrice ? '▲' : '▼'} 
              {Math.abs(fuel.price - fuel.previousPrice).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Last updated: {fuel.lastUpdated}
      </CardFooter>
    </Card>
  );
};

export default FuelPriceCard;
