
import React from 'react';
import { Court } from '../types';
import CourtCard from './CourtCard';

interface CourtListProps {
  courts: Court[];
  searchedZip: string;
}

const CourtList: React.FC<CourtListProps> = ({ courts, searchedZip }) => {
  if (courts.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <h2 className="text-2xl font-semibold text-slate-300 mb-2">No Courts Found</h2>
        <p className="text-slate-400">
          We couldn't find any pickleball courts for zip code{' '}
          <span className="font-bold text-slate-200">{searchedZip}</span>. Please try another zip code.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-slate-300 mb-4 px-4 sm:px-0">
        Results for <span className="text-emerald-400">{searchedZip}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courts.map((court, index) => (
          <CourtCard key={`${court.name}-${index}`} court={court} />
        ))}
      </div>
    </div>
  );
};

export default CourtList;
