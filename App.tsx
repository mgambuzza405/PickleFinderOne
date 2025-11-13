
import React, { useState, useCallback } from 'react';
import { Court } from './types';
import { findPickleballCourts } from './services/geminiService';
import Header from './components/Header';
import ZipCodeInput from './components/ZipCodeInput';
import CourtList from './components/CourtList';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [courts, setCourts] = useState<Court[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedZip, setSearchedZip] = useState<string>('');

  const parseGeminiResponse = useCallback((text: string, groundingChunks: any[]): Court[] => {
      if (!text) return [];

      const foundCourts: Court[] = [];
      const entries = text.split(/\n\s*\n/); 

      entries.forEach(entry => {
          const nameMatch = entry.match(/\*\*(.*?)\*\*/);
          const addressMatch = entry.match(/Address:\s*(.*)/i);
          const descriptionMatch = entry.match(/Description:\s*(.*)/i);

          if (nameMatch && nameMatch[1] && addressMatch && addressMatch[1]) {
              const name = nameMatch[1].trim();
              const address = addressMatch[1].trim();
              const description = descriptionMatch ? descriptionMatch[1].trim() : "No description available.";

              const grounder = groundingChunks.find(g => g.maps && g.maps.title && g.maps.title.toLowerCase().includes(name.toLowerCase()));

              foundCourts.push({
                  name,
                  address,
                  description,
                  uri: grounder?.maps?.uri,
                  title: grounder?.maps?.title
              });
          }
      });
      return foundCourts;
  }, []);


  const handleSearch = useCallback(async () => {
    if (!/^\d{5}$/.test(zipCode)) {
      setError('Please enter a valid 5-digit US zip code.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setCourts(null);
    setSearchedZip(zipCode);

    try {
      const { textResponse, groundingChunks } = await findPickleballCourts(zipCode);
      const parsedCourts = parseGeminiResponse(textResponse, groundingChunks);
      setCourts(parsedCourts);
    } catch (err) {
      console.error('Error finding courts:', err);
      setError('Sorry, something went wrong while searching. Please try again.');
      setCourts([]);
    } finally {
      setIsLoading(false);
    }
  }, [zipCode, parseGeminiResponse]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <div className="mt-8">
          <ZipCodeInput
            zipCode={zipCode}
            setZipCode={setZipCode}
            onSearch={handleSearch}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <div className="mt-8">
          {isLoading && <Loader />}
          {courts && !isLoading && <CourtList courts={courts} searchedZip={searchedZip} />}
          {!courts && !isLoading && (
             <div className="text-center py-10 px-4">
                <h2 className="text-2xl font-semibold text-slate-300 mb-2">Welcome!</h2>
                <p className="text-slate-400">Enter a zip code above to find pickleball courts near you.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
