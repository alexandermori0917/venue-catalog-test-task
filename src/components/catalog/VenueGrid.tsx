import { Venue } from "@/types/venue";
import VenueCard from "./VenueCard";

interface VenueGridProps {
  venues: Venue[];
  loading: boolean;
}

export default function VenueGrid({ venues, loading }: VenueGridProps) {
  if (loading) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="text-base sm:text-lg lg:text-xl text-gray-600">
          Loading venues...
        </div>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 lg:py-16">
        <div className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-3 sm:mb-4">
          No venues found
        </div>
        <p className="text-sm sm:text-base text-gray-500">
          Try adjusting your search criteria or filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 sm:mb-6">
        <p className="text-sm sm:text-base text-gray-600">
          {venues.length} venue{venues.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Venue Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </>
  );
}
