import Card from "../ui/Card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="text-center">
      <Card className="h-full">
        {icon && <div className="mb-3 sm:mb-4 flex justify-center">{icon}</div>}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      </Card>
    </div>
  );
}
