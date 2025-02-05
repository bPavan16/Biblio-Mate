'use client';

import { useState } from 'react';
import { analyzeBook } from './utils/gemini';

interface BookDetails {
  format: string;
  ISBN: string;
  pages: string;
  language: string;
}

interface BookData {
  Title: string;
  Author: string;
  Publisher: string;
  'Publication Year': string;
  Details: BookDetails;
  Genre: string;
  Summary: string;
  Reviews: string;
  Rating: string;
  'Target Audience': string;
  'Similar Books': Array<{ Title: string; Author: string }>;
}

export default function Home() {
  const [bookName, setBookName] = useState('');
  const [result, setResult] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!bookName.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await analyzeBook(bookName);
      setResult(data[0]);
      console.log(data[0])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 tracking-tight">
          📚 Bibilo-Mate
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Enter book name..."
            className="flex-1 p-4 rounded-lg border border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition duration-200 text-lg"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600
                     text-white rounded-lg font-semibold shadow-lg
                     hover:from-blue-600 hover:to-indigo-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition duration-200 text-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : 'Search'}
          </button>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div className="bg-white   backdrop-blur-lg bg-opacity-90 p-6 md:p-8 rounded-xl shadow-xl space-y-8">
            <div className="text-center md:text-left border-b pb-6">
              <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-2">{result.Title}</h2>
              <p className="text-xl md:text-2xl text-center text-blue-600">by {result.Author}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                <InfoItem label="Publisher" value={result.Publisher} />
                <InfoItem label="Year" value={result['Publication Year']} />
                <InfoItem label="Genre" value={result.Genre} />
                <InfoItem label="Rating" value={result.Rating} />
              </div>

              <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
                <InfoItem label="Format" value={result.Details.format} />
                <InfoItem label="ISBN" value={result.Details.ISBN} />
                <InfoItem label="Pages" value={result.Details.pages} />
                <InfoItem label="Language" value={result.Details.language} />
              </div>
            </div>

            <Section title="Summary" content={result.Summary} />
            <Section title="Reviews" content={result.Reviews} />
            <Section title="Target Audience" content={result['Target Audience']} />

            <div>
              <h3 className="text-2xl font-bold mb-4">Similar Books</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {result['Similar Books'].map((book, index) => (
                  <div key={index}
                    className="p-4 border rounded-lg hover:shadow-lg transition duration-200
                                bg-gradient-to-br from-white to-gray-50">
                    <p className="font-bold text-lg text-gray-900 mb-2">{book.Title}</p>
                    <p className="text-blue-600">by {book.Author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="font-bold  text-gray-900">{label}:</span>{' '}
    <span className="text-gray-900">{value}</span>
  </div>
);

const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="space-y-2">
    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
    <p className="text-gray-900 leading-relaxed">{content}</p>
  </div>
);