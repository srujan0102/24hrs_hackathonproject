import React from 'react';
import { LineChart, BarChart, TrendingUp } from 'lucide-react';

const models = [
  { id: 'arima', name: 'ARIMA', icon: LineChart },
  { id: 'lstm', name: 'LSTM', icon: BarChart },
  { id: 'prophet', name: 'Prophet', icon: TrendingUp }
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelSelect }) => {
  return (
    <div className="flex gap-4 mb-6">
      {models.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onModelSelect(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${selectedModel === id 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          <Icon size={20} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
};