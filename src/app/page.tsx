import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Venue Catalog - Find Your Perfect Event Space",
  description: "Discover amazing venues for your next retreat, event, or gathering. Search through our curated collection of hotels, villas, and event spaces.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Venue Catalog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing venues for your next retreat, event, or gathering. 
            Search through our curated collection of hotels, villas, and event spaces.
          </p>
          <Link
            href="/centers"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Venues
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Search & Filter</h3>
              <p className="text-gray-600">
                Find venues by location, capacity, price range, and amenities
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Information</h3>
              <p className="text-gray-600">
                View photos, amenities, pricing, and capacity for each venue
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Sorting</h3>
              <p className="text-gray-600">
                Sort by price, capacity, or relevance to find the perfect match
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
