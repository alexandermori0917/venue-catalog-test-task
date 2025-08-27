import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Search & Filter",
    description:
      "Find venues by location, capacity, price range, and amenities",
  },
  {
    title: "Detailed Information",
    description: "View photos, amenities, pricing, and capacity for each venue",
  },
  {
    title: "Easy Sorting",
    description:
      "Sort by price, capacity, or relevance to find the perfect match",
  },
];

export default function FeaturesSection() {
  return (
    <section className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
