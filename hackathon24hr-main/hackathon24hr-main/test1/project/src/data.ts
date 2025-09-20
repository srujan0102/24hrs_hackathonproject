import { Commodity, WeatherData, YieldData, AnomalyAlert, WeatherStation } from './types';

export const commodities: Commodity[] = [
  {
    id: '1',
    name: 'Tomatoes',
    currentPrice: 45.50,
    predictedPrice: 48.75,
    location: 'Maharashtra',
    supply: 'High',
    demand: 'Medium',
    priceHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 1, i + 1).toISOString().split('T')[0],
      price: 40 + Math.random() * 10
    }))
  },
  {
    id: '2',
    name: 'Lentils',
    currentPrice: 120.25,
    predictedPrice: 118.50,
    location: 'Madhya Pradesh',
    supply: 'Medium',
    demand: 'High',
    priceHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 1, i + 1).toISOString().split('T')[0],
      price: 115 + Math.random() * 10
    }))
  }
];

export const weatherStations: WeatherStation[] = [
  {
    id: 'ws1',
    name: 'Mumbai IMD Station',
    latitude: 19.0760,
    longitude: 72.8777,
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'ws2',
    name: 'Delhi IMD Station',
    latitude: 28.6139,
    longitude: 77.2090,
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'ws3',
    name: 'Bangalore IMD Station',
    latitude: 12.9716,
    longitude: 77.5946,
    lastUpdate: new Date().toISOString()
  }
];

export const weatherData: WeatherData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2024, 1, i + 1).toISOString().split('T')[0],
  temperature: 25 + Math.random() * 10,
  rainfall: Math.random() * 50,
  humidity: 40 + Math.random() * 40,
  soilMoisture: 30 + Math.random() * 40
}));

export const yieldData: YieldData[] = [
  {
    cropName: 'Wheat',
    season: 'Rabi',
    year: 2024,
    estimatedYield: 3.5,
    confidence: 0.85
  },
  {
    cropName: 'Rice',
    season: 'Kharif',
    year: 2024,
    estimatedYield: 4.2,
    confidence: 0.82
  }
];

export const anomalies: AnomalyAlert[] = [
  {
    id: 'a1',
    type: 'weather',
    severity: 'high',
    message: 'Unusual temperature spike detected in Maharashtra region',
    date: new Date().toISOString().split('T')[0],
    location: 'Maharashtra'
  },
  {
    id: 'a2',
    type: 'yield',
    severity: 'medium',
    message: 'Below average soil moisture levels for wheat cultivation',
    date: new Date().toISOString().split('T')[0],
    location: 'Punjab'
  },
  {
    id: 'a3',
    type: 'price',
    severity: 'low',
    message: 'Slight price volatility detected for tomatoes',
    date: new Date().toISOString().split('T')[0],
    location: 'Karnataka'
  }
];