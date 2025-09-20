import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PriceData } from '../types';

interface PriceChartProps {
  data: PriceData[];
  commodity: string;
  modelType: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, commodity, modelType }) => {
  // Generate predicted values based on model type
  const chartData = data.map((point, index) => {
    let prediction;
    const basePrice = point.price;
    
    switch (modelType) {
      case 'arima':
        // ARIMA-style prediction with smaller variations
        prediction = basePrice * (1 + (Math.sin(index * 0.5) * 0.08));
        break;
      case 'lstm':
        // LSTM-style prediction with more complex patterns
        prediction = basePrice * (1 + (Math.sin(index * 0.3) * 0.12 + Math.cos(index * 0.2) * 0.08));
        break;
      case 'prophet':
        // Prophet-style prediction with seasonal patterns
        prediction = basePrice * (1 + (Math.sin(index * 0.4) * 0.1));
        break;
      default:
        prediction = basePrice;
    }

    return {
      ...point,
      predicted: prediction
    };
  });

  const getLineColor = () => {
    switch (modelType) {
      case 'arima':
        return '#2563eb'; // Blue
      case 'lstm':
        return '#7c3aed'; // Purple
      case 'prophet':
        return '#059669'; // Green
      default:
        return '#2563eb';
    }
  };

  return (
    <div className="w-full h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            interval={5}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Price (₹/kg)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#64748b"
            name="Actual Price"
            strokeWidth={2}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke={getLineColor()}
            name={`${modelType.toUpperCase()} Prediction`}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};