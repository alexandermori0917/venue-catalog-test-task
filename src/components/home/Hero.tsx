import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="text-center py-8 sm:py-12 md:py-16 lg:py-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight">
        Welcome to Venue Catalog
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
        Discover amazing venues for your next retreat, event, or gathering.
        Search through our curated collection of hotels, villas, and event
        spaces.
      </p>
      <Button
        href="/centers"
        size="lg"
        className="text-sm sm:text-base md:text-lg"
      >
        Browse Venues
      </Button>
    </section>
  );
}
