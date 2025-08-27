export interface Venue {
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

export interface VenuesResponse {
  venues: Venue[];
  total: number;
}

export interface FilterState {
  search: string;
  minGuests: string;
  maxGuests: string;
  minPrice: string;
  maxPrice: string;
  selectedAmenities: string[];
  sortBy: string;
}
