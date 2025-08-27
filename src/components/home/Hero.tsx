import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Welcome to Venue Catalog
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover amazing venues for your next retreat, event, or gathering.
        Search through our curated collection of hotels, villas, and event
        spaces.
      </p>
      <Button href="/centers" size="lg">
        Browse Venues
      </Button>
    </section>
  );
}
