import { Venue } from "@/types/venue";
import VenueCard from "./VenueCard";

interface VenueGridProps {
  venues: Venue[];
  loading: boolean;
}

export default function VenueGrid({ venues, loading }: VenueGridProps) {
  if (loading) {
    return (
      <div className="text-center py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
          Loading venues...
        </div>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-2 sm:mb-3 md:mb-4 leading-tight">
          No venues found
        </div>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500">
          Try adjusting your search criteria or filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
          {venues.length} venue{venues.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Venue Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </>
  );
}
