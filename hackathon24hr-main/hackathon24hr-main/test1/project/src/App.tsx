import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ModelSelector } from './components/ModelSelector';
import { PriceChart } from './components/PriceChart';
import { WeatherMap } from './components/WeatherMap';
import { WeatherDashboard } from './components/WeatherDashboard';
import { YieldEstimation } from './components/YieldEstimation';
import { commodities, weatherStations, weatherData, yieldData, anomalies } from './data';
import { Database, LineChart, CloudRain, Plane as Plant } from 'lucide-react';
import { Commodity, WeatherStation } from './types';

function App() {
  const [selectedModel, setSelectedModel] = useState('arima');
  const [selectedCommodity, setSelectedCommodity] = useState(commodities[0]);
  const [uploadedData, setUploadedData] = useState<Commodity[]>([]);
  const [selectedStation, setSelectedStation] = useState<WeatherStation>(weatherStations[0]);
  const [activeTab, setActiveTab] = useState<'price' | 'weather' | 'yield'>('price');

  const handleDataUpload = (data: any[]) => {
    try {
      const processedData: Commodity[] = data.map((row, index) => {
        const priceHistory: { date: string; price: number }[] = [{
          date: row.Date,
          price: parseFloat(row.Price)
        }];

        return {
          id: `uploaded-${index}`,
          name: row.Commodity,
          currentPrice: parseFloat(row.Price),
          predictedPrice: calculatePrediction(parseFloat(row.Price), selectedModel),
          location: row.Location,
          supply: row.Supply || 'Medium',
          demand: row.Demand || 'Medium',
          priceHistory
        };
      });

      const groupedData = processedData.reduce((acc: { [key: string]: Commodity }, curr) => {
        if (!acc[curr.name]) {
          acc[curr.name] = {
            ...curr,
            priceHistory: []
          };
        }
        acc[curr.name].priceHistory.push(...curr.priceHistory);
        return acc;
      }, {});

      const finalData = Object.values(groupedData).map(commodity => ({
        ...commodity,
        priceHistory: commodity.priceHistory.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      }));

      setUploadedData(finalData);
      if (finalData.length > 0) {
        setSelectedCommodity(finalData[0]);
      }
    } catch (error) {
      console.error('Error processing data:', error);
      alert('Error processing the data. Please check the Excel format and try again.');
    }
  };

  const calculatePrediction = (currentPrice: number, model: string): number => {
    switch (model) {
      case 'arima':
        return currentPrice * (1 + (Math.random() * 0.08 - 0.04));
      case 'lstm':
        return currentPrice * (1 + (Math.random() * 0.12 - 0.06));
      case 'prophet':
        return currentPrice * (1 + (Math.random() * 0.10 - 0.05));
      default:
        return currentPrice;
    }
  };

  const updatePredictions = () => {
    const updatedData = uploadedData.length > 0 ? uploadedData : commodities;
    const updated = updatedData.map(commodity => ({
      ...commodity,
      predictedPrice: calculatePrediction(commodity.currentPrice, selectedModel)
    }));
    
    if (uploadedData.length > 0) {
      setUploadedData(updated);
    }
    setSelectedCommodity(updated.find(c => c.id === selectedCommodity.id) || updated[0]);
  };

  React.useEffect(() => {
    updatePredictions();
  }, [selectedModel]);

  const availableCommodities = uploadedData.length > 0 ? uploadedData : commodities;

  const getModelDescription = () => {
    switch (selectedModel) {
      case 'arima':
        return "ARIMA model specializes in time series forecasting with linear relationships and seasonal patterns.";
      case 'lstm':
        return "LSTM neural networks excel at capturing long-term dependencies and complex non-linear patterns.";
      case 'prophet':
        return "Prophet is optimized for business forecasting with strong seasonal patterns and holiday effects.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Database className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Agricultural Price Prediction & Analytics
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Dataset</h2>
          <FileUpload onDataUpload={handleDataUpload} />
          {uploadedData.length > 0 && (
            <p className="mt-4 text-sm text-green-600">
              ✓ Data uploaded successfully! {uploadedData.length} commodities processed.
            </p>
          )}
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('price')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'price' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            <LineChart size={20} />
            <span>Price Analysis</span>
          </button>
          <button
            onClick={() => setActiveTab('weather')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'weather'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            <CloudRain size={20} />
            <span>Weather Data</span>
          </button>
          <button
            onClick={() => setActiveTab('yield')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'yield'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            <Plant size={20} />
            <span>Yield Estimation</span>
          </button>
        </div>

        {activeTab === 'price' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Price Prediction Model</h2>
              <select
                value={selectedCommodity.id}
                onChange={(e) => setSelectedCommodity(availableCommodities.find(c => c.id === e.target.value) || availableCommodities[0])}
                className="rounded-md border-gray-300 shadow-sm px-4 py-2"
              >
                {availableCommodities.map(commodity => (
                  <option key={commodity.id} value={commodity.id}>
                    {commodity.name}
                  </option>
                ))}
              </select>
            </div>

            <ModelSelector
              selectedModel={selectedModel}
              onModelSelect={setSelectedModel}
            />

            <p className="mt-2 mb-6 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              {getModelDescription()}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Current Price</h3>
                <p className="mt-2 text-3xl font-bold text-green-900">
                  ₹{selectedCommodity.currentPrice.toFixed(2)}/kg
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Predicted Price</h3>
                <p className="mt-2 text-3xl font-bold text-blue-900">
                  ₹{selectedCommodity.predictedPrice.toFixed(2)}/kg
                </p>
                <p className="mt-1 text-sm text-blue-600">
                  {((selectedCommodity.predictedPrice / selectedCommodity.currentPrice - 1) * 100).toFixed(1)}% change
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">Market Status</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-purple-900">Supply: {selectedCommodity.supply}</p>
                  <p className="text-sm text-purple-900">Demand: {selectedCommodity.demand}</p>
                  <p className="text-sm text-purple-900">Location: {selectedCommodity.location}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Price Trend Analysis</h3>
              </div>
              <PriceChart 
                data={selectedCommodity.priceHistory}
                commodity={selectedCommodity.name}
                modelType={selectedModel}
              />
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">IMD Weather Stations</h2>
              <WeatherMap
                stations={weatherStations}
                onStationSelect={setSelectedStation}
              />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Weather Analysis</h2>
              <WeatherDashboard
                data={weatherData}
                location={selectedStation.name}
              />
            </div>
          </div>
        )}

        {activeTab === 'yield' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Crop Yield Estimation</h2>
            <YieldEstimation
              yieldData={yieldData}
              anomalies={anomalies}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;