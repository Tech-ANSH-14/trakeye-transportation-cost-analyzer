
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {fuels.map((fuel) => (
            <div key={fuel.type} className="animate-fade-in">
              <FuelPriceCard fuel={fuel} />
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-6 mb-8">
          {/* Left side - AI Chat Bot (Takes more space) */}
          <div className="lg:w-3/5 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CostChat />
          </div>
          
          {/* Right side - Control panels stacked vertically */}
          <div className="lg:w-2/5 space-y-6">
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
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CostCalculator 
                fuels={fuels} 
                selectedMode={selectedMode}
                selectedBrands={selectedBrands}
              />
            </div>
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
