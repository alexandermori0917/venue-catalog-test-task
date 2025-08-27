'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Venue {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  capacity_min: number;
  capacity_max: number;
  price_min: number;
  price_max: number;
  photos: Array<{
    id: string;
    url: string;
    alt_text: string;
    position: number;
  }>;
  amenities: Array<{
    id: string;
    name: string;
    group: string;
    description: string;
  }>;
}

interface VenuesResponse {
  venues: Venue[];
  total: number;
}

export default function CatalogPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [minGuests, setMinGuests] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  const amenityOptions = ['Wi-Fi', 'Yoga Hall', 'Gym', 'Private Pool'];

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (minGuests) params.append('minGuests', minGuests);
      if (maxGuests) params.append('maxGuests', maxGuests);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (selectedAmenities.length > 0) params.append('amenities', selectedAmenities.join(','));
      if (sortBy) params.append('sortBy', sortBy);

      const response = await fetch(`/api/venues?${params.toString()}`);
      const data: VenuesResponse = await response.json();
      setVenues(data.venues);
    } catch (error) {
      console.error('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [search, minGuests, maxGuests, minPrice, maxPrice, selectedAmenities, sortBy]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Venue Catalog</h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search by name or city
            </label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter venue name or city..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Guest Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={minGuests}
                  onChange={(e) => setMinGuests(e.target.value)}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min $"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max $"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="space-y-2">
                {amenityOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="mr-2"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="capacity">Capacity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">Loading venues...</div>
          </div>
        ) : venues.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600 mb-4">No venues found</div>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">{venues.length} venue{venues.length !== 1 ? 's' : ''} found</p>
            </div>
            
            {/* Venue Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <div key={venue.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Venue Image */}
                  <div className="relative h-48">
                    <Image
                      src={venue.photos[0]?.url || '/placeholder-venue.jpg'}
                      alt={venue.photos[0]?.alt_text || venue.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Venue Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{venue.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{venue.city}, {venue.country}</p>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{venue.description}</p>
                    
                    {/* Capacity and Price */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600">
                        {venue.capacity_min}-{venue.capacity_max} guests
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        ${venue.price_min}-${venue.price_max}/night
                      </span>
                    </div>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity.id}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {amenity.name}
                        </span>
                      ))}
                      {venue.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{venue.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

