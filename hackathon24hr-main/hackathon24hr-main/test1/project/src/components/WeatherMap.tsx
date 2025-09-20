import React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { CloudRain } from 'lucide-react';
import type { WeatherStation } from '../types';

interface WeatherMapProps {
  stations: WeatherStation[];
  onStationSelect: (station: WeatherStation) => void;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ stations, onStationSelect }) => {
  const [selectedStation, setSelectedStation] = React.useState<WeatherStation | null>(null);

  return (
    <Map
      initialViewState={{
        longitude: 78.9629,
        latitude: 20.5937,
        zoom: 4
      }}
      style={{ width: '100%', height: '400px' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken="pk.eyJ1Ijoic3RhY2tibGl0eiIsImEiOiJja3NpZ3Nzd3YwNDh4MnBwZ3R4YzJzMWNyIn0.nFfsqkrzJ9HmMTyB-wN-_Q"
    >
      {stations.map((station) => (
        <Marker
          key={station.id}
          longitude={station.longitude}
          latitude={station.latitude}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedStation(station);
            onStationSelect(station);
          }}
        >
          <CloudRain className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-700" />
        </Marker>
      ))}

      {selectedStation && (
        <Popup
          longitude={selectedStation.longitude}
          latitude={selectedStation.latitude}
          anchor="bottom"
          onClose={() => setSelectedStation(null)}
        >
          <div className="p-2">
            <h3 className="font-semibold">{selectedStation.name}</h3>
            <p className="text-sm text-gray-600">Last updated: {selectedStation.lastUpdate}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};