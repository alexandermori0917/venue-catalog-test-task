import Image from "next/image";
import { Venue } from "@/types/venue";
import {
  MapPinIcon,
  UsersIcon,
  WifiIcon,
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ComponentType } from "react";

interface VenueCardProps {
  venue: Venue;
}

// Icon mapping for amenities
const getAmenityIcon = (amenityName: string) => {
  const iconMap: { [key: string]: ComponentType<{ className?: string }> } = {
    "Wi-Fi": WifiIcon,
    "Yoga Hall": SparklesIcon,
    Gym: HomeIcon,
    "Private Pool": SparklesIcon,
    "Conference Rooms": HomeIcon,
    "Catering Service": HomeIcon,
    Parking: HomeIcon,
    Spa: SparklesIcon,
    "Yoga Studio": SparklesIcon,
    "Outdoor Pool": SparklesIcon,
    "Outdoor Space": HomeIcon,
    "Catering Kitchen": HomeIcon,
    "Exhibition Space": HomeIcon,
    "AV Equipment": HomeIcon,
    "Bar Service": HomeIcon,
    "Ocean View": HomeIcon,
    Catering: HomeIcon,
    "Wine Tasting": SparklesIcon,
    "Vineyard Tours": HomeIcon,
    "Event Lawn": HomeIcon,
    Ballroom: HomeIcon,
    "Wedding Coordinator": HomeIcon,
    Garden: HomeIcon,
    "Meeting Rooms": HomeIcon,
    "Coffee Bar": HomeIcon,
    "Event Space": HomeIcon,
    "Meditation Garden": SparklesIcon,
    "Organic Kitchen": HomeIcon,
    "Private Beach": SparklesIcon,
    "Chef Kitchen": HomeIcon,
  };

  return iconMap[amenityName] || HomeIcon;
};

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Venue Image */}
      <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48">
        <Image
          src={venue.photos[0]?.url || "/placeholder-venue.jpg"}
          alt={venue.photos[0]?.alt_text || venue.title}
          fill
          className="object-cover"
        />
        {/* Price Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-blue-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm md:text-base font-semibold">
          ${venue.price_min}-${venue.price_max}
        </div>
      </div>

      {/* Venue Info */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-5">
        {/* Title */}
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
          {venue.title}
        </h3>

        {/* Location */}
        <div className="flex items-center mb-1.5 sm:mb-2 md:mb-3">
          <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-500 mr-1" />
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            {venue.city}, {venue.country}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mb-2 sm:mb-3 md:mb-4 line-clamp-2 leading-relaxed">
          {venue.description}
        </p>

        {/* Capacity */}
        <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
          <UsersIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-500 mr-1" />
          <span className="text-xs sm:text-sm md:text-base text-gray-600">
            {venue.capacity_min} - {venue.capacity_max}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
          {venue.amenities.slice(0, 3).map((amenity) => {
            const IconComponent = getAmenityIcon(amenity.name);
            return (
              <span
                key={amenity.id}
                className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                <IconComponent className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                {amenity.name}
              </span>
            );
          })}
          {venue.amenities.length > 3 && (
            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
              <SparklesIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
              +{venue.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
