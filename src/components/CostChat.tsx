
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MapPin, Route as RouteIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Route } from '@/lib/types';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  route?: Route;
}

// Mock routes data - in a real app, this would come from an API
const popularRoutes: Route[] = [
  { origin: "Mumbai", destination: "Delhi", distanceKm: 1421, estimatedTime: "21h 30m" },
  { origin: "Chennai", destination: "Bangalore", distanceKm: 346, estimatedTime: "6h 15m" },
  { origin: "Kolkata", destination: "Hyderabad", distanceKm: 1507, estimatedTime: "27h 45m" },
  { origin: "Ahmedabad", destination: "Pune", distanceKm: 664, estimatedTime: "12h" },
  { origin: "Jaipur", destination: "Lucknow", distanceKm: 574, estimatedTime: "10h 30m" },
  { origin: "Delhi", destination: "Chandigarh", distanceKm: 243, estimatedTime: "4h" },
  { origin: "Mumbai", destination: "Goa", distanceKm: 588, estimatedTime: "10h 15m" },
  { origin: "Kerala", destination: "Tamil Nadu", distanceKm: 350, estimatedTime: "6h 30m" },
  { origin: "Uttar Pradesh", destination: "Madhya Pradesh", distanceKm: 496, estimatedTime: "9h" },
  { origin: "Gujarat", destination: "Rajasthan", distanceKm: 528, estimatedTime: "9h 45m" }
];

const CostChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m Trakeye, your transportation cost analyzer assistant. Ask me about routes, fuel costs, or any transportation expenses.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const identifyRoute = (message: string): Route | undefined => {
    // Check for common route patterns in the message
    const fromToPattern = /(?:from|between)\s+([a-zA-Z\s]+)(?:\s+to|\s+and)\s+([a-zA-Z\s]+)/i;
    const match = message.match(fromToPattern);
    
    if (match) {
      const origin = match[1].trim();
      const destination = match[2].trim();
      
      // Check if we have this route in our database
      const exactRoute = popularRoutes.find(
        route => 
          (route.origin.toLowerCase() === origin.toLowerCase() && 
           route.destination.toLowerCase() === destination.toLowerCase())
      );
      
      if (exactRoute) {
        return exactRoute;
      }
      
      // If no exact route found, we'll return a route with default estimated values
      return {
        origin,
        destination,
        distanceKm: Math.floor(Math.random() * 1000) + 200, // Random distance between 200-1200 km
        estimatedTime: `${Math.floor(Math.random() * 20) + 3}h ${Math.floor(Math.random() * 59)}m` // Random time
      };
    }
    
    return undefined;
  };

  const generateResponse = (userMessage: string, route?: Route): string => {
    if (route) {
      const fuelCost = (route.distanceKm * 0.07).toFixed(2); // Simplified calculation
      return `For the route from ${route.origin} to ${route.destination}:\n` +
        `• Distance: ${route.distanceKm} km\n` +
        `• Estimated travel time: ${route.estimatedTime}\n` +
        `• Approximate fuel cost: ₹${fuelCost} per liter of fuel\n` +
        `• Total cost may vary based on vehicle type and current fuel prices.`;
    }

    const botResponses = [
      "Based on current rates, your transport cost is approximately ₹2,500 for this route using diesel fuel.",
      "The most fuel-efficient option for your journey would be a hybrid vehicle, saving about 30% on fuel costs.",
      "Current diesel prices suggest a cost of ₹8.50 per kilometer for a standard truck on highway routes.",
      "Comparing your selected vehicles, the Toyota model offers better fuel economy for city driving by 15%.",
      "For bulk transportation, rail would be 22% more cost-effective than trucks over distances greater than 500km."
    ];

    return botResponses[Math.floor(Math.random() * botResponses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Process the message to identify routes
    const route = identifyRoute(input);

    // Simulate bot response with a delay
    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input, route),
        sender: 'bot',
        timestamp: new Date(),
        route: route
      };

      setMessages((prev) => [...prev, botReply]);
      setIsLoading(false);
      
      if (route) {
        toast({
          title: "Route Information",
          description: `Found route: ${route.origin} to ${route.destination}`,
        });
      }
    }, 1000);
  };

  const renderRouteInfo = (route: Route) => {
    return (
      <div className="mt-2 p-3 bg-accent rounded-md flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <RouteIcon className="h-4 w-4 text-primary" />
          <span className="font-semibold">Route Details</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Origin:
          </div>
          <div>{route.origin}</div>
          
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Destination:
          </div>
          <div>{route.destination}</div>
          
          <div>Distance:</div>
          <div>{route.distanceKm} km</div>
          
          <div>Est. Time:</div>
          <div>{route.estimatedTime}</div>
        </div>
      </div>
    );
  };

  return (
    <Card className="flex flex-col h-[700px] lg:h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RouteIcon className="h-5 w-5" />
          Trakeye - Cost Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto pb-0">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
                {message.route && message.sender === 'bot' && renderRouteInfo(message.route)}
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Trakeye about routes, costs, or fuel prices..."
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default CostChat;
