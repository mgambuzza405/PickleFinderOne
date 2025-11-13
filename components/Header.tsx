
import React from 'react';

const PickleballIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.22 8.22a.75.75 0 011.06 0L12 10.94l2.72-2.72a.75.75 0 111.06 1.06L13.06 12l2.72 2.72a.75.75 0 11-1.06 1.06L12 13.06l-2.72 2.72a.75.75 0 01-1.06-1.06L10.94 12 8.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="text-center p-4 sm:p-6">
      <div className="flex items-center justify-center gap-3 mb-2">
        <PickleballIcon className="w-8 h-8 text-emerald-400" />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          Pickleball Court Finder
        </h1>
      </div>
      <p className="text-slate-400 text-sm sm:text-base">Your next game is just a zip code away.</p>
    </header>
  );
};

export default Header;
