import type { Metadata } from "next";
import { Container } from "@/components/layout";
import { Hero, FeaturesSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Venue Catalog - Find Your Perfect Event Space",
  description:
    "Discover amazing venues for your next retreat, event, or gathering. Search through our curated collection of hotels, villas, and event spaces.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container className="py-16">
        <Hero />
        <FeaturesSection />
      </Container>
    </div>
  );
}
