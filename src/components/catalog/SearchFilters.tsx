import { FilterState, Venue } from "@/types/venue";
import { useEffect, useState } from "react";

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function SearchFilters({
  filters,
  onFiltersChange,
}: SearchFiltersProps) {
  const [amenityOptions, setAmenityOptions] = useState<string[]>([]);

  // Fetch and extract unique amenities from venues data
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await fetch("/api/venues");
        const data = await response.json();

        // Extract all unique amenity names from venues
        const allAmenities = data.venues.flatMap((venue: Venue) =>
          venue.amenities.map((amenity) => amenity.name)
        );

        // Remove duplicates and sort alphabetically
        const uniqueAmenities = [...new Set(allAmenities)].sort() as string[];
        setAmenityOptions(uniqueAmenities);
      } catch (error) {
        console.error("Failed to fetch amenities:", error);
        // Fallback to basic amenities if API fails
        setAmenityOptions(["Wi-Fi", "Yoga Hall", "Gym", "Private Pool"]);
      }
    };

    fetchAmenities();
  }, []);

  const handleAmenityChange = (amenity: string) => {
    const newSelectedAmenities = filters.selectedAmenities.includes(amenity)
      ? filters.selectedAmenities.filter((a) => a !== amenity)
      : [...filters.selectedAmenities, amenity];

    onFiltersChange({
      ...filters,
      selectedAmenities: newSelectedAmenities,
    });
  };

  const updateFilter = (key: keyof FilterState, value: string | string[]) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      minGuests: "",
      maxGuests: "",
      minPrice: "",
      maxPrice: "",
      selectedAmenities: [],
      sortBy: "relevance",
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.minGuests ||
      filters.maxGuests ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.selectedAmenities.length > 0 ||
      filters.sortBy !== "relevance"
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 lg:p-8 mb-6 sm:mb-8">
      {/* Header with Clear All Button */}
      <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6">
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 leading-tight">
          Search & Filters
        </h3>
        {hasActiveFilters() && (
          <button
            onClick={clearAllFilters}
            className="text-xs sm:text-sm md:text-base text-blue-600 hover:text-blue-800 underline"
          >
            Clear all filters
          </button>
        )}
      </div>
      {/* Search */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <label
          htmlFor="search"
          className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2"
        >
          Search by name or city
        </label>
        <input
          type="text"
          id="search"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Enter venue name or city..."
          className="w-full px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-700 text-sm sm:text-base"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6">
        {/* Guest Range */}
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">
            Guests
          </label>
          <div className="flex space-x-1 sm:space-x-2">
            <input
              type="number"
              value={filters.minGuests}
              onChange={(e) => updateFilter("minGuests", e.target.value)}
              placeholder="Min"
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-700 text-sm sm:text-base"
            />
            <input
              type="number"
              value={filters.maxGuests}
              onChange={(e) => updateFilter("maxGuests", e.target.value)}
              placeholder="Max"
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-700 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">
            Price Range
          </label>
          <div className="flex space-x-1 sm:space-x-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              placeholder="Min $"
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-700 text-sm sm:text-base"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              placeholder="Max $"
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-700 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">
            Sort by
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
          >
            <option value="relevance">Relevance</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="capacity">Capacity</option>
          </select>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="border-t pt-4 sm:pt-5 md:pt-6">
        <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 sm:mb-3">
          Amenities ({filters.selectedAmenities.length} selected)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-h-40 sm:max-h-48 md:max-h-56 overflow-y-auto">
          {amenityOptions.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-1 sm:space-x-2 cursor-pointer hover:bg-gray-50 p-1.5 sm:p-2 rounded"
            >
              <input
                type="checkbox"
                checked={filters.selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3 sm:w-4 sm:h-4"
              />
              <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-tight">
                {amenity}
              </span>
            </label>
          ))}
        </div>
        {filters.selectedAmenities.length > 0 && (
          <button
            onClick={() => updateFilter("selectedAmenities", [])}
            className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-blue-600 hover:text-blue-800 underline"
          >
            Clear all amenities
          </button>
        )}
      </div>
    </div>
  );
}
