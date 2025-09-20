export interface PriceData {
  date: string;
  price: number;
}

export interface Commodity {
  id: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  priceHistory: PriceData[];
  location: string;
  supply: string;
  demand: string;
}

export interface WeatherData {
  date: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  soilMoisture: number;
}

export interface YieldData {
  cropName: string;
  season: string;
  year: number;
  estimatedYield: number;
  actualYield?: number;
  confidence: number;
}

export interface AnomalyAlert {
  id: string;
  type: 'weather' | 'price' | 'yield';
  severity: 'low' | 'medium' | 'high';
  message: string;
  date: string;
  location: string;
}

export interface WeatherStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lastUpdate: string;
}