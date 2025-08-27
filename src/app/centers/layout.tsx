import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venue Catalog - Browse All Venues",
  description:
    "Browse our complete collection of venues. Filter by location, capacity, price, and amenities to find the perfect venue for your event.",
};

export default function CentersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
