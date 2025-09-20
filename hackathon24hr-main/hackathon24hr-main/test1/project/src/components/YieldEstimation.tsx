import React from 'react';
import { Plane as Plant, TrendingUp, AlertTriangle } from 'lucide-react';
import type { YieldData, AnomalyAlert } from '../types';

interface YieldEstimationProps {
  yieldData: YieldData[];
  anomalies: AnomalyAlert[];
}

export const YieldEstimation: React.FC<YieldEstimationProps> = ({ yieldData, anomalies }) => {
  const latestYield = yieldData[yieldData.length - 1];
  const criticalAnomalies = anomalies.filter(a => a.severity === 'high');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Plant className="text-emerald-600" />
            <h3 className="text-emerald-900 font-semibold">Current Yield Estimate</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-700">
            {latestYield.estimatedYield.toFixed(2)} tons/ha
          </p>
          <p className="text-sm text-emerald-600 mt-2">
            Confidence: {(latestYield.confidence * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-amber-600" />
            <h3 className="text-amber-900 font-semibold">Yield Trend</h3>
          </div>
          <p className="text-3xl font-bold text-amber-700">
            {((latestYield.estimatedYield / yieldData[0].estimatedYield - 1) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-amber-600 mt-2">
            Change from previous season
          </p>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-red-600" />
            <h3 className="text-red-900 font-semibold">Critical Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-red-700">
            {criticalAnomalies.length}
          </p>
          <p className="text-sm text-red-600 mt-2">
            Active high-severity alerts
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Anomalies</h3>
        <div className="space-y-4">
          {anomalies.map(anomaly => (
            <div
              key={anomaly.id}
              className={`p-4 rounded-lg ${
                anomaly.severity === 'high'
                  ? 'bg-red-50 border-l-4 border-red-500'
                  : anomaly.severity === 'medium'
                  ? 'bg-yellow-50 border-l-4 border-yellow-500'
                  : 'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{anomaly.type.toUpperCase()} Alert</h4>
                  <p className="text-sm text-gray-600 mt-1">{anomaly.message}</p>
                </div>
                <span className="text-sm text-gray-500">{anomaly.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};