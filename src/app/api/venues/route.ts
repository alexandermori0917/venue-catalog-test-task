import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

export async function GET(request: NextRequest) {
  try {
    // Read mock data
    const dataPath = path.join(process.cwd(), "data", "venues.json");
    const jsonData = fs.readFileSync(dataPath, "utf8");
    let venues: Venue[] = JSON.parse(jsonData);

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const minGuests = parseInt(searchParams.get("minGuests") || "0");
    const maxGuests = parseInt(searchParams.get("maxGuests") || "999");
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "999999");
    const amenities =
      searchParams.get("amenities")?.split(",").filter(Boolean) || [];
    const sortBy = searchParams.get("sortBy") || "relevance";

    // Filter by search (title and city)
    if (search) {
      venues = venues.filter(
        (venue) =>
          venue.title.toLowerCase().includes(search.toLowerCase()) ||
          venue.city.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by guest capacity
    venues = venues.filter(
      (venue) =>
        venue.capacity_max >= minGuests && venue.capacity_min <= maxGuests
    );

    // Filter by price range
    venues = venues.filter(
      (venue) => venue.price_max >= minPrice && venue.price_min <= maxPrice
    );

    // Filter by amenities
    if (amenities.length > 0) {
      venues = venues.filter((venue) =>
        amenities.some((amenity) =>
          venue.amenities.some((venueAmenity) =>
            venueAmenity.name.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    // Sort venues
    switch (sortBy) {
      case "price_low":
        venues.sort((a, b) => a.price_min - b.price_min);
        break;
      case "price_high":
        venues.sort((a, b) => b.price_min - a.price_min);
        break;
      case "capacity":
        venues.sort((a, b) => b.capacity_max - a.capacity_max);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return NextResponse.json({
      venues,
      total: venues.length,
    });
  } catch (error) {
    console.error("Error fetching venues:", error);
    return NextResponse.json(
      { error: "Failed to fetch venues" },
      { status: 500 }
    );
  }
}
