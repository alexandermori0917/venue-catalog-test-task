import Image from "next/image";
import { Venue } from "@/types/venue";
import {
  MapPinIcon,
  UsersIcon,
  CurrencyDollarIcon,
  WifiIcon,
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface VenueCardProps {
  venue: Venue;
}

// Icon mapping for amenities
const getAmenityIcon = (amenityName: string) => {
  const iconMap: { [key: string]: any } = {
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
      <div className="relative h-40 sm:h-48 lg:h-52">
        <Image
          src={venue.photos[0]?.url || "/placeholder-venue.jpg"}
          alt={venue.photos[0]?.alt_text || venue.title}
          fill
          className="object-cover"
        />
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-semibold">
          ${venue.price_min}-${venue.price_max}
        </div>
      </div>

      {/* Venue Info */}
      <div className="p-3 sm:p-4 lg:p-5">
        {/* Title */}
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
          {venue.title}
        </h3>

        {/* Location */}
        <div className="flex items-center mb-2 sm:mb-3">
          <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1" />
          <p className="text-xs sm:text-sm text-gray-600">
            {venue.city}, {venue.country}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-700 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {venue.description}
        </p>

        {/* Capacity */}
        <div className="flex items-center mb-3 sm:mb-4">
          <UsersIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mr-1" />
          <span className="text-xs sm:text-sm text-gray-600">
            {venue.capacity_min} - {venue.capacity_max}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {venue.amenities.slice(0, 3).map((amenity) => {
            const IconComponent = getAmenityIcon(amenity.name);
            return (
              <span
                key={amenity.id}
                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {amenity.name}
              </span>
            );
          })}
          {venue.amenities.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              <SparklesIcon className="w-3 h-3 mr-1" />+
              {venue.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
