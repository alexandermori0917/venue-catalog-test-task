# Venue Catalog - Test Task Implementation

A Next.js application for browsing and filtering venues (hotels, villas, event spaces) with search, filter, and sort functionality.

## Features

- **Search**: Search venues by name or city
- **Filters**:
  - Guest capacity range (min/max)
  - Price range (min/max)
  - Amenities (Wi-Fi, Yoga Hall, Gym, Private Pool)
- **Sorting**:
  - Relevance (default)
  - Price: Low to High
  - Price: High to Low
  - Capacity
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Empty State**: Shows message when no venues match criteria

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS
- **Data**: Mock JSON data (no database required for test)
- **Images**: Placeholder images from images.unsplash.com

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/alexandermori0917/venue-catalog-test-task.git
cd venue-catalog-test-task
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
venue-catalog-test-task/
├── src/
│   ├── app/
│   │   ├── api/venues/route.ts    # API endpoint for venue data
│   │   ├── centers/page.tsx       # Main catalog page
│   │   ├── page.tsx              # Home page
│   │   └── layout.tsx            # Root layout
├── data/
│   └── venues.json               # Mock venue data
├── public/                       # Static assets
└── README.md
```

## API Endpoints

### GET /api/venues

Fetches venues with optional query parameters:

- `search` - Search by venue name or city
- `minGuests` - Minimum guest capacity
- `maxGuests` - Maximum guest capacity
- `minPrice` - Minimum price per night
- `maxPrice` - Maximum price per night
- `amenities` - Comma-separated list of amenities to filter by
- `sortBy` - Sort order: `relevance`, `price_low`, `price_high`, `capacity`

Example:

```
GET /api/venues?search=Boulder&minGuests=10&maxGuests=50&amenities=Wi-Fi,Yoga Hall&sortBy=price_low
```

## Mock Data Structure

The venue data follows the database schema provided in the task:

```typescript
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
```

## Testing

The application has been manually tested for:

- ✅ Search functionality (by name and city)
- ✅ Guest capacity filtering
- ✅ Price range filtering
- ✅ Amenity filtering (multiple selection)
- ✅ Sorting by price and capacity
- ✅ Empty state when no results found
- ✅ Responsive design on different screen sizes
- ✅ Real-time filtering (updates as you type/select)

## Deployment

The application is ready for deployment on Vercel:

1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

## Implementation Notes

- Uses Next.js App Router for modern React patterns
- Server-side API routes for data fetching
- Client-side state management with React hooks
- Responsive grid layout with Tailwind CSS
- Image optimization with Next.js Image component
- TypeScript for type safety

## Time Spent

Approximately 5 hours total:

- 1 hour: Project setup and understanding requirements
- 2 hours: API implementation and mock data creation
- 1.5 hours: Frontend component development
- 0.5 hours: Testing and documentation

## Future Enhancements

For a production version, consider:

- Database integration (Supabase as specified in main project)
- User authentication and favorites
- Image uploads and storage
- Advanced filtering options
- Pagination for large datasets
- SEO optimization
- Performance monitoring
