import { FilterState } from "@/types/venue";

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const amenityOptions = ["Wi-Fi", "Yoga Hall", "Gym", "Private Pool"];

export default function SearchFilters({
  filters,
  onFiltersChange,
}: SearchFiltersProps) {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Search */}
      <div className="mb-6">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search by name or city
        </label>
        <input
          type="text"
          id="search"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Enter venue name or city..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Guest Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={filters.minGuests}
              onChange={(e) => updateFilter("minGuests", e.target.value)}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={filters.maxGuests}
              onChange={(e) => updateFilter("maxGuests", e.target.value)}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              placeholder="Min $"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              placeholder="Max $"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="space-y-2">
            {amenityOptions.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.selectedAmenities.includes(amenity)}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
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
  );
}
