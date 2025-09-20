import React from 'react';
import { Sun, Droplets, Thermometer, Plane as Plant } from 'lucide-react';
import type { WeatherData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeatherDashboardProps {
  data: WeatherData[];
  location: string;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ data, location }) => {
  const latest = data[data.length - 1];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-sky-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Thermometer className="text-sky-600" />
            <h3 className="text-sky-900">Temperature</h3>
          </div>
          <p className="text-2xl font-bold text-sky-700 mt-2">{latest.temperature}°C</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Droplets className="text-blue-600" />
            <h3 className="text-blue-900">Rainfall</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-2">{latest.rainfall} mm</p>
        </div>

        <div className="bg-teal-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Sun className="text-teal-600" />
            <h3 className="text-teal-900">Humidity</h3>
          </div>
          <p className="text-2xl font-bold text-teal-700 mt-2">{latest.humidity}%</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Plant className="text-green-600" />
            <h3 className="text-green-900">Soil Moisture</h3>
          </div>
          <p className="text-2xl font-bold text-green-700 mt-2">{latest.soilMoisture}%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Weather Trends - {location}</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                stroke="#0284c7"
                name="Temperature (°C)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rainfall"
                stroke="#0891b2"
                name="Rainfall (mm)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="humidity"
                stroke="#0d9488"
                name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};