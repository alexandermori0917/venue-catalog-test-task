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
    <section className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
