
import React, { useState } from 'react';
import Header from '@/components/Header';
import FuelPriceCard from '@/components/FuelPriceCard';
import TransportModeSelector from '@/components/TransportModeSelector';
import VehicleBrands from '@/components/VehicleBrands';
import CostCalculator from '@/components/CostCalculator';
import CostChat from '@/components/CostChat';
import { fuels, transportModes, vehicleBrands } from '@/lib/mock-data';
import { TransportMode, VehicleBrand } from '@/lib/types';

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<TransportMode | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<VehicleBrand[]>([]);

  const handleSelectMode = (mode: TransportMode) => {
    setSelectedMode(mode);
    setSelectedBrands([]);
  };

  const handleSelectBrand = (brand: VehicleBrand, isSelected: boolean) => {
    if (isSelected) {
      setSelectedBrands(prev => [...prev, brand]);
    } else {
      setSelectedBrands(prev => prev.filter(b => b.id !== brand.id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {fuels.map((fuel) => (
            <div key={fuel.type} className="animate-fade-in">
              <FuelPriceCard fuel={fuel} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <TransportModeSelector 
              modes={transportModes} 
              selectedMode={selectedMode} 
              onSelectMode={handleSelectMode} 
            />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <VehicleBrands 
              brands={vehicleBrands}
              transportType={selectedMode?.type || ''}
              onSelectBrand={handleSelectBrand}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CostCalculator 
              fuels={fuels} 
              selectedMode={selectedMode}
              selectedBrands={selectedBrands}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CostChat />
          </div>
        </div>
      </main>
      <footer className="bg-muted py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© 2025 Transport Cost Analyzer | Real-time data analysis for optimal transportation decisions</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
