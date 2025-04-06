
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Bus, Truck, Tractor } from 'lucide-react';
import { TransportMode } from "@/lib/types";

interface TransportModeSelectorProps {
  modes: TransportMode[];
  selectedMode: TransportMode | null;
  onSelectMode: (mode: TransportMode) => void;
}

const TransportModeSelector = ({ 
  modes, 
  selectedMode, 
  onSelectMode 
}: TransportModeSelectorProps) => {
  
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'car': return <Car className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'truck': return <Truck className="h-5 w-5" />;
      case 'tractor': return <Tractor className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transportation Mode</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {modes.map((mode) => (
            <div 
              key={mode.id}
              className={`transport-mode ${selectedMode?.id === mode.id ? 'selected' : ''}`}
              onClick={() => onSelectMode(mode)}
            >
              {getIcon(mode.type)}
              <span>{mode.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportModeSelector;
