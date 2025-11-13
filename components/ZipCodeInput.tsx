
import React from 'react';

interface ZipCodeInputProps {
  zipCode: string;
  setZipCode: (zip: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  error: string | null;
}

const ZipCodeInput: React.FC<ZipCodeInputProps> = ({ zipCode, setZipCode, onSearch, isLoading, error }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="Enter 5-digit US Zip Code"
          maxLength={5}
          pattern="[0-9]{5}"
          required
          className="w-full sm:flex-grow bg-slate-800 text-slate-200 border border-slate-600 rounded-md py-3 px-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200 placeholder-slate-500"
          aria-label="Zip Code Input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-emerald-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-emerald-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition duration-200"
        >
          {isLoading ? 'Searching...' : 'Find Courts'}
        </button>
      </form>
      {error && <p className="text-red-400 mt-2 text-center sm:text-left">{error}</p>}
    </div>
  );
};

export default ZipCodeInput;
