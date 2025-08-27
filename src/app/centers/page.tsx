"use client";

import { useState, useEffect } from "react";
import { Venue, VenuesResponse, FilterState } from "@/types/venue";
import { SearchFilters, VenueGrid } from "@/components/catalog";

export default function CatalogPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    minGuests: "",
    maxGuests: "",
    minPrice: "",
    maxPrice: "",
    selectedAmenities: [],
    sortBy: "relevance",
  });

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.minGuests) params.append("minGuests", filters.minGuests);
      if (filters.maxGuests) params.append("maxGuests", filters.maxGuests);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.selectedAmenities.length > 0)
        params.append("amenities", filters.selectedAmenities.join(","));
      if (filters.sortBy) params.append("sortBy", filters.sortBy);

      const response = await fetch(`/api/venues?${params.toString()}`);
      const data: VenuesResponse = await response.json();
      setVenues(data.venues);
    } catch (error) {
      console.error("Error fetching venues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Venue Catalog</h1>

        <SearchFilters filters={filters} onFiltersChange={setFilters} />

        <VenueGrid venues={venues} loading={loading} />
      </div>
    </div>
  );
}
