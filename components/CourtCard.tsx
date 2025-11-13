
import React from 'react';
import { Court } from '../types';
import LocationMarkerIcon from './LocationMarkerIcon';

interface CourtCardProps {
  court: Court;
}

const CourtCard: React.FC<CourtCardProps> = ({ court }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/20">
      <h3 className="text-xl font-bold text-emerald-400 mb-2">{court.name}</h3>
      <div className="flex items-start text-slate-400 mb-3 text-sm">
        <LocationMarkerIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <span>{court.address}</span>
      </div>
      <p className="text-slate-300 mb-4">{court.description}</p>
      {court.uri && (
        <a
          href={court.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          View on Google Maps &rarr;
        </a>
      )}
    </div>
  );
};

export default CourtCard;
