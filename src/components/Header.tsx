
import React from 'react';
import { Fuel } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-transport-blue to-transport-green p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Fuel className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Transport Cost Analyzer</h1>
          </div>
          <div className="text-sm">
            <p>Real-time cost analysis for smarter transportation</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
